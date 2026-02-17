# SubscriptionInterceptor

If you want to implement a central solution for managing subscriptions in Angular using a subscription interceptor, you can create a custom service that acts as an interceptor and wraps around each subscription created in the application. This service can keep track of all subscriptions and provide a convenient way to unsubscribe from all subscriptions at once.

Here's an example:

```ts
import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionInterceptor {
  private subscriptions: Subscription[] = [];

  wrap<T>(observable: Observable<T>): Observable<T> {
    return new Observable<T>((observer) => {
      const subscription = observable.subscribe(observer);
      this.subscriptions.push(subscription);
      return () => {
        subscription.unsubscribe();
        this.subscriptions = this.subscriptions.filter(
          (sub) => sub !== subscription,
        );
      };
    });
  }

  unsubscribeAll() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }
}
```

In this example, the `SubscriptionInterceptor` service acts as an interceptor for all subscriptions created in the application. The `wrap` method wraps around each subscription and adds it to an internal array. The `unsubscribeAll` method can be called at any time to unsubscribe from all subscriptions.

Here's an example of how you would use this service in a component:

```ts
import { Component, OnInit } from '@angular/core';
import { SubscriptionInterceptor } from './subscription-interceptor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private subscriptionInterceptor: SubscriptionInterceptor) {}

  ngOnInit() {
    this.subscriptionInterceptor.wrap(
      // your observable here
    ).subscribe(...);
  }
}

```
