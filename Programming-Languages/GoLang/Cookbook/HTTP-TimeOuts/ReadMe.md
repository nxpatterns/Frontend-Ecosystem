# Handling HTTP 499 and Timeouts

In Go, the best way to handle timeouts when making HTTP requests is to use the `http.Client` struct and set a timeout value on it and there are additionally several other ways described below.

The `http.Client` struct has a `Timeout` field that you can set to a `time.Duration` value. Once set, any request made using that client will timeout after that duration if the server doesn't respond.

You can set the timeout value when creating a new `http.Client` struct:

```go
client := &http.Client{
    Timeout: time.Second * 10,
}
```

Then use the `Do()` method of the client to make the request, and check the `Error` value of the `http.Response` struct returned by the `Do()` method.

```go
req, err := http.NewRequest("GET", "https://example.com", nil)
if err != nil {
    log.Fatal(err)
}


resp, err := client.Do(req)
if err != nil {
    log.Fatal(err)
}
```

If the `Error` value is `context.DeadlineExceeded`, it means the request has timed out.

You can also use a context to limit the time of execution of the request

```go
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
req, err := http.NewRequestWithContext(ctx, "GET", "https://example.com", nil)
```

It's important to note that you should use an appropriate timeout value, it should be short enough that it can quickly fail when there is a problem, but long enough that it doesn't fail prematurely. A good rule of thumb is to set the timeout to twice the expected response time of the server.

Also, you may want to handle the HTTP 499 errors, which are client closed request, by using the `http.CloseNotifier` interface.

## Example

Here is an example of Go code that makes multiple nested API calls and handles the `http.CloseNotifier` interface to detect when the client has closed the connection:

```go
package main

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

func main() {
	// Create a new http.Server
	srv := &http.Server{Addr: ":8080"}

	// Create a new http.Client with a timeout
	client := &http.Client{Timeout: time.Second * 10}

	// Create a new http.HandlerFunc to handle requests
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Create a new context with a timeout
		ctx, cancel := context.WithTimeout(r.Context(), time.Second*5)
		defer cancel()

		// Create a new request with the context
		req, err := http.NewRequestWithContext(ctx, "GET", "https://example.com", nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Detect if the client closes the connection
		notify := w.(http.CloseNotifier).CloseNotify()

		// Make the first API call
		resp, err := client.Do(req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Make another API call with the first API call's response
		req, err = http.NewRequestWithContext(ctx, "GET", resp.Header.Get("Location"), nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resp, err = client.Do(req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// Process the response
		//...
		// check if the connection is closed
		select {
		case <-notify:
			fmt.Println("Client closed the connection")
			return
		case <-ctx.Done():
			fmt.Println("Request timed out")
			return
		}

		w.Write([]byte("Hello World!"))
	})

	srv.ListenAndServe()
}

```

The code creates a new `http.Server` and starts listening on port 8080. When a request comes in, the server creates a new `http.Client` with a timeout of 10 seconds and makes a GET request to "[https://example.com](https://example.com/)". It also makes another request using the location returned in the first response's headers.

The `http.CloseNotifier` interface is used to detect when the client closes the connection, by using the `w.(http.CloseNotifier).CloseNotify()` and check if the the context's Done channel is closed to determine if the request has timed out.

In this example, if the client closes the connection or the request times out, the server will print a message and return without processing the response. Otherwise, it will write "Hello World!" to the response.

It's important to note that this example is simplified and that you may need to add more error handling and logging in a production environment.

Here is another Example:

```go
package main

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

func main() {
	// Create a new http.Server
	srv := &http.Server{Addr: ":8080"}

	// Create a new http.HandlerFunc to handle requests
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Create a new context with a cancel function
		ctx, cancel := context.WithCancel(r.Context())

		// Detect if the client closes the connection
		notify := w.(http.CloseNotifier).CloseNotify()

		// Make the first API call in a goroutine
		go func() {
			req, err := http.NewRequestWithContext(ctx, "GET", "https://example.com", nil)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			client := &http.Client{}
			resp, err := client.Do(req)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			// Make another API call with the first API call's response
			req, err = http.NewRequestWithContext(ctx, "GET", resp.Header.Get("Location"), nil)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			resp, err = client.Do(req)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			// Process the response
			//...
		}()

		select {
		case <-notify:
			fmt.Println("Client closed the connection")
			cancel()
			return
		case <-ctx.Done():
			fmt.Println("Request timed out or was cancelled")
			return
		}

		w.Write([]byte("Hello World!"))
	})

	srv.ListenAndServe()
}

```

A browser can detect an HTTP 499 status code, but it may not be able to explicitly inform the backend that the request has been cancelled.

Generally, a browser will automatically cancel a request if the user navigates away from the page, closes the tab, or closes the browser. In these cases, the browser will stop sending or receiving data for the request, and the backend will eventually time out and return an HTTP 499 status code.

There are some techniques that can help to detect the cancellation from the client side and inform the server about it. Such as "AbortController" in javascript, This can be used to send an "abort" signal to the browser, which will stop the request, but it's not supported in all browsers.

So, it's not a standard way for a browser to inform the backend about a cancellation explicitly. The best way to handle this case is to use context package in GoLang like the example I've provided earlier.

The AbortController API is relatively new and is not yet supported by all browsers. According to caniuse.com, support for AbortController is currently available in the following browsers:

- Chrome: version 63 and later
- Firefox: version 67 and later
- Safari: version 12.1 and later
- Edge: version 18 and later
- Opera: version 50 and later

However, it's not available in Internet Explorer, older versions of Edge and Safari and some mobile browsers.

It's important to note that, if you are going to use the AbortController API in your application, you should consider providing a fallback solution for browsers that don't support it. This can be done using feature detection in JavaScript to check if the AbortController API is available before using it.

Here's an example of how you could use the AbortController API to handle HTTP 499 errors in a JavaScript application:

```go
let controller = new AbortController();
let signal = controller.signal;

let fetchData = async (url) => {
  try {
    let response = await fetch(url, { signal });
    let data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      // handle the case when the request is cancelled
      console.log('Request cancelled');
    } else {
      // handle other errors
      console.log(error);
    }
  }
}

let fetchButton = document.getElementById('fetch-button');
fetchButton.addEventListener('click', () => {
  let dataPromise = fetchData('https://example.com/data');
  // do something with the dataPromise
});

let cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', () => {
  controller.abort();
});

```

In this example, we create an AbortController and a signal object, which we pass as an option to the fetch() method. We also have two buttons in the HTML file, one to fetch the data and one to cancel the request. When the user clicks the "cancel" button, the controller's abort() method is called, which sends an "abort" signal to the browser, canceling the request.

If the user clicks the "cancel" button before the data is fetched, the catch block in the fetchData function will be executed with an "AbortError" error and it will handle it accordingly.

It's worth noting that this is a simplified example and you may need to adapt it to your specific use case.

If the user closes the tab or navigates away from the page, the browser will stop sending or receiving data for the request, and the backend will eventually time out and return an HTTP 499 status code.

In this case, the AbortController API will not work because the JavaScript code is not running anymore. Therefore, you will not be able to explicitly cancel the request and handle the error on the client side.

One way to handle this case is to use server-side request timeout, which will cancel the request after a certain amount of time if no response is received. This way, even if the client closes the tab or navigates away, the server will cancel the request and return an HTTP 499 status code.

Another way, is to use websockets to keep the connection alive, this way you can detect if the client disconnected or closed the tab and cancel the request.

You can also use a combination of both, a timeout in the server and a heartbeat mechanism using websockets, this way you can have a quick response if the client disconnected and a fallback if the server didn't receive the heartbeat message.

Here's an example of how you could use websockets to detect when a client closes a tab or navigates away from a page:

```js
// create a new WebSocket connection
let socket = new WebSocket('ws://example.com/ws');

// define a variable to store the request ID
let requestId;

// define a variable to store the timeout ID
let timeoutId;

// define a function to send a heartbeat message to the server
let sendHeartbeat = () => {
  socket.send(JSON.stringify({ type: 'heartbeat', requestId }));
  timeoutId = setTimeout(sendHeartbeat, 5000);
};

// when the socket is opened
socket.addEventListener('open', () => {
  // send a message to the server to initiate a request
  requestId = Date.now();
  socket.send(JSON.stringify({ type: 'request', requestId }));

  // start sending heartbeat messages to the server
  sendHeartbeat();
});

// when the socket receives a message from the server
socket.addEventListener('message', (event) => {
  let data = JSON.parse(event.data);

  if (data.type === 'response' && data.requestId === requestId) {
    // handle the response from the server
    console.log(data.data);

    // clear the timeout
    clearTimeout(timeoutId);
  }
});

// when the socket is closed
socket.addEventListener('close', () => {
  // clear the timeout
  clearTimeout(timeoutId);
});
```

In this example, a new websocket connection is created when the user navigates to the page. When the connection is open, a message is sent to the server to initiate a request.

Also, a heartbeat message is sent to the server every 5 seconds. This way, the server can detect if the client disconnected or closed the tab by checking if the heartbeat message is received in time.

When the server receives a response, it sends the response back to the client through the websocket, and when the client receives the response, it clears the timeout and stops sending heartbeat messages.

When the client closes the tab or navigates away, the websocket connection will close and the timeout will be cleared.

This example is a simplified version, you should adapt it to your specific use case, and handle the error messages and security issues.

You should also keep in mind that not all the browsers support websockets, so you will need to provide a fallback solution for browsers that don't support it.

Here's an example of how you could handle websockets on the backend using the `net/http` package in Go:

```go
package main

import (
    "net/http"
    "github.com/gorilla/websocket"
    "time"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func handleWebsocket(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        // handle the error
        return
    }
    defer conn.Close()

    // map to store the requestID and the corresponding context
    requests := make(map[string]context.Context)

    for {
        // read message from client
        messageType, message, err := conn.ReadMessage()
        if err != nil {
            // handle the error
            break
        }
        var requestData map[string]interface{}
        json.Unmarshal(message, &requestData)

        // check the message type
        switch requestData["type"] {
        case "request":
            // generate a new requestID
            requestID := strconv.FormatInt(time.Now().UnixNano(), 10)
            // create a new context with timeout
            ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
            requests[requestID] = ctx
            go func() {
                defer cancel()
                // do the request
                data := makeRequest(ctx, requestData["data"])
                // send the response to the client
                conn.WriteJSON(map[string]interface{}{
                    "type": "response",
                    "requestId": requestID,
                    "data": data,
                })
                // delete the request from the map
                delete(requests, requestID)
            }()
        case "heartbeat":
            // check if the request exists and if the context is done
            if ctx, ok := requests[requestData["requestId"]]; ok {
                select {
                case <-ctx.Done():
                    // cancel the request
                    conn.WriteJSON(map[string]interface{}{
                        "type": "error",
                        "requestId": requestData["requestId"],
                        "message": "request canceled",
                    })
                    delete(requests, requestData["requestId"])
                default:
                    // do nothing
                }
            }
        }
    }
}

func makeRequest(ctx context.Context, data interface{}) interface{} {
    // do the request
    // you can use the ctx to cancel the request if the context is done
    // return the data
}

func main() {
    http.HandleFunc("/ws", handleWebsocket)
    http.ListenAndServe(":8080", nil)
}

```

In this example, the backend creates a new websocket connection when a client navigates to the `/ws` endpoint. It uses the `Upgrader` from the `gorilla/websocket` package to handle the websocket connection.

When the connection is established, the server starts listening for messages from the client. The example code I provided uses a map to store the request ID and the corresponding context for each request that is made over the websocket connection.

When the client sends a message with a "request" type, the server generates a new request ID, creates a new context with a timeout, and starts a goroutine to make the request. The request ID and context are added to the map.

When the client sends a message with a "heartbeat" type, the server checks if the request with the specified request ID exists in the map. If it does, it checks if the context is done (i.e. if the timeout has been reached or if the context was canceled). If the context is done, the request is canceled, and a "error" message is sent to the client.

It should be noted that this is a basic example and there may be other better ways or libraries to handle timeouts and cancellations in Go, but this is a general idea of how it can be done.

Also this code using the context package in Go and it's a way to cancel a request, but it's not the only way. Websockets package has some other ways to handle this like CloseMessage, CloseHandler, CloseHandlerFunc and CloseError.

Here are examples of how to use some of the other ways to handle client disconnections provided by the websocket package in Go:

**1) CloseMessage:**

It allows you to send a CloseMessage to the client before closing the connection.

```go
func (c *Conn) CloseMessage(code int, text string) error
```

This function sends a close message to the client with the specified code and text.

**2) CloseHandler:**

It allows you to set a function that will be called when the connection is closed.

```go
func (c *Conn) SetCloseHandler(h func(code int, text string) error)
```

This function sets a function that will be called when the connection is closed. The function takes two arguments, the close code and the close text.

**3) CloseHandlerFunc:**

It allows you to set a function that will be called when the connection is closed.

```go
func (c *Conn) SetCloseHandlerFunc(fn func(code int, text string))
```

This function sets a function that will be called when the connection is closed. The function takes two arguments, the close code and the close text.

**4) CloseError:**

It allows you to check if the connection has been closed and retrieve the close code and text.

```go
func (c *Conn) CloseError() error
```

This function returns an error that is nil if the connection is open or a CloseError if the connection is closed.

You can use these functions to handle the connection closed events and also to send message to the client and close the connection based on the requirement of your application.
