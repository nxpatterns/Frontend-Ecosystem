# Handling Double PUT Requests

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Common Ways](#-common-ways)
- [Using Redis](#-using-redis)
  - [golang-lru-lock](#-golang-lru-lock)
  - [go-distributed-lock](#-go-distributed-lock)
- [RabbitMQ](#-rabbitmq)
  - [JavaScript client](#-javascript-client)
  - [Go Backend](#-go-backend)
  - [With Angular](#-with-angular)

<!-- /code_chunk_output -->

## Common Ways

There are a few ways to handle double PUT requests from a client in Go, here are a couple of options:

1. Using a request ID: You can include a unique request ID in the PUT request, and on the server side, you can check if the same request ID has been processed before. If the same request ID has been seen, you can simply ignore the request.
2. Using a cache: You can cache the previous PUT request's data and method, and check if the new request has the same data and method as the previous one. If they are the same, you can ignore the request.
3. Using a mutex: You can use a mutex to lock the shared data and make sure that only one request is processed at a time. This will prevent double PUT requests from being processed simultaneously, but it may cause delays for other requests.

Here is an example of how you could implement this using a request ID:

```go
package main

import (
    "fmt"
    "net/http"
    "sync"
)

var requestIDs = make(map[string]bool)
var requestIDMutex = &sync.Mutex{}

func putHandler(w http.ResponseWriter, r *http.Request) {
    requestID := r.Header.Get("X-Request-ID")

    requestIDMutex.Lock()
    if requestIDs[requestID] {
        requestIDMutex.Unlock()
        fmt.Println("Ignoring duplicate request with ID", requestID)
        return
    }
    requestIDs[requestID] = true
    requestIDMutex.Unlock()

    // Process the request here
    fmt.Println("Processing request with ID", requestID)

    // Remove the request ID after processing
    requestIDMutex.Lock()
    delete(requestIDs, requestID)
    requestIDMutex.Unlock()
}

func main() {
    http.HandleFunc("/put", putHandler)
    http.ListenAndServe(":8080", nil)
}

```

This example uses a map to store the request IDs that have been seen, and a mutex to protect the map from concurrent access. It checks if the request ID has been seen before and if it has, the request is ignored. Once the request is processed, the request ID is removed from the map.

You can use a cache instead of a map, it's also a good idea to add a timeout for the cache so that the request ID will be removed from the cache if the request hasn't been seen for a certain amount of time.

It's also a good idea to have a expiration time for the request ID so that it will be removed from the cache if the request hasn't been seen for a certain amount of time.

It's important to note that the above code is just an example and it might not cover all edge cases and it's not guaranteed to work under all conditions, but it should give you an idea of how you can handle duplicate PUT requests in your application.

Here is an example that combines all the suggestions I mentioned above to handle double PUT requests in Go:

```go
package main

import (
    "fmt"
    "net/http"
    "sync"
    "time"
)

var requestIDs = make(map[string]time.Time)
var requestIDMutex = &sync.Mutex{}
var dataCache = make(map[string]string)
var dataCacheMutex = &sync.Mutex{}

const requestExpiration = time.Minute * 5

func putHandler(w http.ResponseWriter, r *http.Request) {
    requestID := r.Header.Get("X-Request-ID")
    requestData := r.FormValue("data")

    requestIDMutex.Lock()
    if t, ok := requestIDs[requestID]; ok && time.Since(t) < requestExpiration {
        requestIDMutex.Unlock()
        fmt.Println("Ignoring duplicate request with ID", requestID)
        return
    }
    requestIDs[requestID] = time.Now()
    requestIDMutex.Unlock()

    dataCacheMutex.Lock()
    if data, ok := dataCache[requestData]; ok && data == requestData {
        dataCacheMutex.Unlock()
        fmt.Println("Ignoring duplicate request with data", requestData)
        return
    }
    dataCache[requestData] = requestData
    dataCacheMutex.Unlock()

    // Process the request here
    fmt.Println("Processing request with ID", requestID)
    fmt.Println("Processing request with data", requestData)

    // Remove the request ID and data from cache after processing
    requestIDMutex.Lock()
    delete(requestIDs, requestID)
    requestIDMutex.Unlock()
    dataCacheMutex.Lock()
    delete(dataCache, requestData)
    dataCacheMutex.Unlock()
}

func main() {
    http.HandleFunc("/put", putHandler)
    http.ListenAndServe(":8080", nil)
}

```

This example uses two maps to store request IDs and data that have been seen, two mutexes to protect the maps from concurrent access, and a requestExpiration time to remove a requestID from the map if it hasn't been seen for a certain amount of time. it first checks if the request ID and data have been seen before, if the request ID and data have been seen before and the request has not expired yet, the request is ignored. Once the request is processed, the request ID and data are removed from the maps.

It's important to note that this example is also a simplified version and it might not cover all edge cases and it's not guaranteed to work under all conditions. But it should give you an idea of how you can handle duplicate PUT requests in your application using different methods.

If the same PUT request comes with a delay of 2 days, you can use a cache system to store the requests and their corresponding data. You can then check the cache for the same request before processing it. If the request is found in the cache within a certain time frame, for example 2 days, you can skip the request and return a response indicating that the request has already been processed. This approach can help prevent duplicate processing of the same request and also save resources on the backend.

Here's an example of how you might implement this in Go:

```go
package main

import (
    "time"
    "sync"
    "fmt"
)

// RequestCache is a struct that stores PUT requests and their corresponding data in a cache
type RequestCache struct {
    cache map[string]time.Time
    sync.RWMutex
}

// AddRequest adds a request and its data to the cache
func (c *RequestCache) AddRequest(request string, data []byte) {
    c.Lock()
    defer c.Unlock()
    c.cache[request] = time.Now()
}

// CheckRequest checks if a request is already in the cache
func (c *RequestCache) CheckRequest(request string) bool {
    c.RLock()
    defer c.RUnlock()
    if t, ok := c.cache[request]; ok {
        if time.Since(t) <= 2*24*time.Hour {
            return true
        }
    }
    return false
}

func main() {
    cache := RequestCache{cache: make(map[string]time.Time)}

    // PUT request with same data and method
    request := "example request"
    data := []byte("example data")

    if cache.CheckRequest(request) {
        fmt.Println("Request already processed")
    } else {
        cache.AddRequest(request, data)
        fmt.Println("Processing request")
        // Process the request here
    }
}

```

This example uses a struct called `RequestCache` that has two methods: `AddRequest` and `CheckRequest`. The `AddRequest` method adds a request and its corresponding data to the cache, along with the current time. The `CheckRequest` method checks if a request is already in the cache, and if it is, it checks if the time since the request was added to the cache is less than or equal to 2 days. If the request is found in the cache and the time since it was added is less than 2 days, the request is skipped and a message is printed indicating that the request has already been processed. If the request is not found in the cache or the time since it was added is greater than 2 days, the request is processed and added to the cache.

## Using Redis

You can use Redis in combination with GoLang to prevent double PUT requests with the same data but with a time difference by implementing a caching mechanism that uses a key-value store provided by Redis. The key would be a hash of the data that you are trying to PUT and the value would be the timestamp of the last PUT request.

In your GoLang code, before making the PUT request, you would first check if the key (hash of the data) already exists in Redis. If it does, you would then check the timestamp associated with that key. If the timestamp is less than 24 hours old, you can reject the request as a duplicate. If the timestamp is more than 24 hours old, you can update the timestamp and proceed with the PUT request.

Here is an example GoLang code snippet that demonstrates this approach:

```go
package main

import (
    "crypto/sha1"
    "encoding/hex"
    "time"

    "github.com/go-redis/redis"
)

var client *redis.Client

func init() {
    // Initialize the Redis client
    client = redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "", // no password set
        DB:       0,  // use default DB
    })
}

func putData(data []byte) error {
    // Hash the data
    hasher := sha1.New()
    hasher.Write(data)
    key := hex.EncodeToString(hasher.Sum(nil))

    // Check if the key already exists in Redis
    val, err := client.Get(key).Result()
    if err == redis.Nil {
        // Key does not exist, proceed with PUT request
        _, err = client.Set(key, time.Now().Unix(), 0).Result()
        if err != nil {
            return err
        }
    } else if err != nil {
        return err
    } else {
        // Key exists, check the timestamp
        timestamp, err := strconv.ParseInt(val, 10, 64)
        if err != nil {
            return err
        }

        if time.Now().Unix()-timestamp < 24*60*60 {
            // Timestamp is less than 24 hours old, reject request as a duplicate
            return fmt.Errorf("Duplicate request")
        } else {
            // Timestamp is more than 24 hours old, update timestamp and proceed with PUT request
            _, err = client.Set(key, time.Now().Unix(), 0).Result()
            if err != nil {
                return err
            }
        }
    }
    // make PUT request
    // ...
}

```

It's worth noting that this approach is not suitable for high-traffic systems or for data that needs to be protected from deletion.

Also, you can use Redis's time-to-live (TTL) feature to automatically delete keys that have not been accessed for a certain period of time, which would also achieve the goal of preventing double PUT requests with a time difference.

For high-traffic systems, you may want to consider using a distributed locking mechanism to prevent double PUT requests. A distributed lock is a synchronization mechanism that allows multiple processes to coordinate access to a shared resource in a distributed system.

One popular distributed lock library for Go is go-redis-lock which provides a simple API for acquiring and releasing locks using Redis. The library uses the SET command with the NX and PX options to acquire a lock, and the DEL command to release it. The NX option ensures that the SET command only sets the key if it does not already exist, while the PX option sets a time-to-live (TTL) for the key in milliseconds, after which the lock will be automatically released.

Here is an example GoLang code snippet that demonstrates this approach:

```go
package main

import (
    "time"

    "github.com/bsm/redis-lock"
)

var client *redis.Client

func init() {
    // Initialize the Redis client
    client = redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "", // no password set
        DB:       0,  // use default DB
    })
}

func putData(data []byte) error {
    // Hash the data
    hasher := sha1.New()
    hasher.Write(data)
    key := hex.EncodeToString(hasher.Sum(nil))

    // Try to acquire the lock
    lock, err := lock.Obtain(client, key, &lock.Options{
        LockTimeout: time.Second * 5,
        RetryCount:  5,
        RetryDelay:  time.Millisecond * 500,
    })
    if err != nil {
        return err
    }
    if lock == nil {
        return fmt.Errorf("Unable to acquire lock")
    }
    defer lock.Release()

    // make PUT request
    // ...
}

```

You can also use other libraries that provide distributed lock, such as `golang-lru-lock` which uses a Least Recently Used (LRU) eviction policy to release locks that have been held for too long.

In addition, you can use a database-agnostic distributed lock library such as `go-distributed-lock` which allows you to use different backends (Redis, Zookeeper, etc) to implement the lock mechanism.

It's worth noting that using a distributed lock can add some complexity to your application and may also introduce a performance overhead, so you'll need to weigh the trade-offs before implementing it.

`golang-lru-lock` uses an in-memory LRU (Least Recently Used) cache to store the locks, which is suitable for use cases where the number of locks is limited and the data can fit in memory. It's a good choice if you want a simple and lightweight solution.

On the other hand, `go-distributed-lock` uses a distributed lock manager, such as Redis, to store the locks, which is suitable for use cases where the number of locks is large and the data cannot fit in memory. It's a good choice if you want a more robust and scalable solution that can handle high-traffic systems.

In high-traffic systems where scalability and fault-tolerance is important, using a distributed lock manager like Redis with go-distributed-lock library is the better choice.

### golang-lru-lock

Here's an example of using the golang-lru-lock library to prevent double PUT requests with the same data but with a time difference of one day:

```go
package main

import (
    "time"
    "github.com/hashicorp/golang-lru"
)

var lockCache *lru.Cache

func init() {
    // Initialize the LRU cache with a maximum capacity of 1000
    lockCache, _ = lru.New(1000)
}

func putData(data []byte) error {
    // Hash the data
    hasher := sha1.New()
    hasher.Write(data)
    key := hex.EncodeToString(hasher.Sum(nil))

    // Try to acquire the lock
    lock, loaded := lockCache.GetOrCreate(key, func() (interface{}, error) {
        return &sync.Mutex{}, nil
    })

    lock.(*sync.Mutex).Lock()
    defer lock.(*sync.Mutex).Unlock()

    if loaded {
        // lock already exists, check if it was acquired more than one day ago
        lockTimestamp, ok := lockCache.TTL(key)
        if !ok {
            return fmt.Errorf("Unable to get lock timestamp")
        }
        if time.Since(lockTimestamp) > 24*time.Hour {
            // lock is older than one day, release it and acquire it again
            lockCache.Remove(key)
        } else {
            // lock is still valid, return an error
            return fmt.Errorf("Data already submitted within the last 24 hours")
        }
    }

    // make PUT request
    // ...
}

```

### go-distributed-lock

Here's an example of using go-distributed-lock library to prevent double PUT requests with the same data but with a time difference of one day:

```go
package main

import (
    "time"
    "github.com/bsmr/go-distributed-lock"
)

var lockClient *lock.Client

func init() {
    // Initialize the lock client
    lockClient, _ = lock.NewClient(&lock.Options{
        Backend: lock.BackendRedis,
        Redis: &lock.RedisOptions{
            Addr:     "localhost:6379",
            Password: "", // no password set
            DB:       0,  // use default DB
        },
    })
}

func putData(data []byte) error {
    // Hash the data
    hasher := sha1.New()
    hasher.Write(data)
    key := hex.EncodeToString(hasher.Sum(nil))

    // Try to acquire the lock
    lock, err := lockClient.Acquire(key, &lock.AcquireOptions{
        Ttl: 24 * time.Hour,
    })
    if err != nil {
        return err
    }
    if lock == nil {
        return fmt.Errorf("Data already submitted within the last 24 hours")
    }
    defer lock.Release()

    // make PUT request
    // ...
}
```

## RabbitMQ

Here's an example of using RabbitMQ as a message queue between a JavaScript client and a Go backend, and additionally using Redis as a distributed lock manager:

### JavaScript client

```js
const amqp = require('amqplib');
const redis = require('redis');

// Connect to Redis
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
});

// Connect to the RabbitMQ server
amqp
  .connect('amqp://rabbitmq:5672')
  .then((conn) => {
    return conn.createChannel();
  })
  .then((ch) => {
    // Acquire a lock from Redis
    redisClient.set('lock', '1', 'EX', 10, 'NX', (err, res) => {
      if (res === 'OK') {
        // Send a message to the backend
        ch.assertQueue('backend');
        ch.sendToQueue('backend', new Buffer('Hello, backend!'));
        // Release the lock after 10 seconds
        setTimeout(() => {
          redisClient.del('lock', (err, res) => {});
        }, 10000);
      } else {
        console.log('Could not acquire lock');
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });
```

### Go Backend

```go

package main

import (
    "log"

    "github.com/go-redis/redis"
    "github.com/streadway/amqp"
)

func main() {
    // Connect to Redis
    redisClient := redis.NewClient(&redis.Options{
        Addr: "redis:6379",
    })
    defer redisClient.Close()
    // Connect to the RabbitMQ server
    conn, err := amqp.Dial("amqp://rabbitmq:5672")
    if err != nil {
        log.Fatal(err)
    }
    defer conn.Close()

    ch, err := conn.Channel()
    if err != nil {
        log.Fatal(err)
    }
    defer ch.Close()

    // Consume messages from the backend queue
    msgs, err := ch.Consume(
        "backend", // queue
        "",        // consumer
        true,      // auto-ack
        false,     // exclusive
        false,     // no-local
        false,     // no-wait
        nil,       // args
    )
    if err != nil {
        log.Fatal(err)
    }

    for msg := range msgs {
        // Acquire a lock from Redis
        err := redisClient.Set("lock", "1", 10*time.Second).Err()
        if err == nil {
            // Do something with the message
            log.Printf("Received message: %s", msg.Body)
            // Release the lock
            redisClient.Del("lock")
        } else {
            log.Println("Could not acquire lock")
        }
    }
}


```

### With Angular

If your client is an Angular application, you can still use the same libraries (`amqplib` for RabbitMQ and `redis` for Redis) in your Angular application by installing them via npm and importing them in your TypeScript code.

Here's an example of how you would use these libraries in an Angular service to send a message to the backend via RabbitMQ while using Redis as a distributed lock manager:

```ts
import { Injectable } from '@angular/core';
import * as amqp from 'amqplib';
import * as redis from 'redis';

@Injectable({
  providedIn: 'root',
})
export class RabbitmqService {
  private redisClient = redis.createClient({
    host: 'redis',
    port: 6379,
  });

  sendMessage() {
    amqp
      .connect('amqp://rabbitmq:5672')
      .then((conn) => {
        return conn.createChannel();
      })
      .then((ch) => {
        // Acquire a lock from Redis
        this.redisClient.set(
          'lock',
          '1',
          'EX',
          10,
          'NX',
          (err, res) => {
            if (res === 'OK') {
              // Send a message to the backend
              ch.assertQueue('backend');
              ch.sendToQueue(
                'backend',
                new Buffer('Hello, backend!'),
              );
              // Release the lock after 10 seconds
              setTimeout(() => {
                this.redisClient.del('lock', (err, res) => {});
              }, 10000);
            } else {
              console.log('Could not acquire lock');
            }
          },
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
```

The backend will remain the same as previous example, you should have your RabbitMQ and Redis instances running and connected to your Angular application to work properly.
