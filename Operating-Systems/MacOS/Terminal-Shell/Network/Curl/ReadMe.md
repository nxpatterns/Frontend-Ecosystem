# Curl

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Self signed certificate issue](#self-signed-certificate-issue)
- [Examples](#examples)
  - [GET](#get)
  - [POST](#post)
  - [PUT](#put)
  - [PATCH](#patch)
  - [DELETE](#delete)
  - [CORS](#cors)

<!-- /code_chunk_output -->

## Self signed certificate issue

Use the `-k` or `--insecure` option to ignore the self signed certificate issue.

```bash
curl -k https://localhost:8443
curl --insecure https://localhost:8443
```

## Examples

### GET

**GET Requests:** To send a simple GET request, use:

```shell
curl http://example.com
```

### POST

**POST Requests:** To send a POST request with data, use:

```shell
curl -X POST \
  -d "param1=value1&param2=value2" \
  http://example.com/resource
```

For JSON data, add a header for content-type and Body with JSON string:

  ```shell
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"key1":"value1", "key2":"value2"}' \
  http://example.com/resource
```

### PUT

**PUT Requests:** To update a resource with PUT, use:

```shell
curl -X PUT -d "param1=newvalue1" http://example.com/resource/1
```

Similarly, for a PUT request with a body, use:

```shell
curl -X PUT \
  -d '{"key1":"newvalue1"}' \
  -H "Content-Type: application/json" \
  http://example.com/resource/1
```

### PATCH

**PATCH Requests:** For a PATCH request, which partially updates a resource:

```shell
curl -X PATCH -d "param1=newvalue1" http://example.com/resource/1
```

### DELETE

**DELETE Requests:** To delete a resource:

```shell
curl -X DELETE http://example.com/resource/1
```

### CORS

**CORS (Cross-Origin Resource Sharing):** CORS is a browser mechanism that allows web applications to make requests to a domain different from the one which served the initial application, subject to certain conditions.

When using `curl`, CORS is not a factor because `curl` does not enforce the same-origin policy. However, when testing server responses for CORS with `curl`, you can include an `Origin` header to simulate a request from a different domain:

`curl -H "Origin: http://example.com" --verbose http://target.com/resource`

This will show you the CORS headers in the response, such as `Access-Control-Allow-Origin`.
