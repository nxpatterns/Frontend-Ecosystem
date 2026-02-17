# Http

> under construction
> See Axios or NestJS Folders for more information

## Header

### Referrer Policy

The "Referrer Policy" is an HTTP header that specifies how much referrer information should be included when making requests from one page to another. The possible values for the Referrer Policy header are:

1. no-referrer: This option specifies that no referrer information should be sent along with requests.

2. no-referrer-when-downgrade: This option is the default behavior if no Referrer Policy header is specified. It specifies that the referring URL should be included in requests made to the same origin, but not to a different origin.

3. same-origin: This option specifies that the referring URL should be included in requests made to the same origin, but not to a different origin.

4. strict-origin: This option specifies that the referring URL should only be included in requests made to a secure (HTTPS) endpoint on the same origin.

5. strict-origin-when-cross-origin: This option specifies that the referring URL should only be included in requests made to a secure (HTTPS) endpoint on a different origin.

6. unsafe-url: This option specifies that the full URL of the referring page should be included in all requests, regardless of the endpoint's security or origin.
