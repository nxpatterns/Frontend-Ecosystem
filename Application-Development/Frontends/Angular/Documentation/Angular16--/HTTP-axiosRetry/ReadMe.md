# HTTP Retry with `axiosRetry`

```ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable, throwError, TimeoutError } from "rxjs";
import { catchError, retry, timeout } from "rxjs/operators";
import axiosRetry from "axios-retry";
import axios from 'axios';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Configure axiosRetry to retry failed requests up to 3 times
    const instance = axios.create();
    axiosRetry(instance, { retries: 3 });
    // Use the retry operator to retry failed requests
    return next.handle(req).pipe(
      retry(3), // retry up to 3 times
      timeout(30000), // set a timeout of 30 seconds
      catchError((error) => {
        if (error instanceof TimeoutError) {
          // Handle a timeout error here
          return throwError("The request timed out");
        }
        // Handle any other errors that occurred during the retries
        return throwError(error);
      })
    );
  }
}
```
