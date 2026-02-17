# @ngneat/until-destroy

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Basic Usage with Ivy](#basic-usage-with-ivy)
- [Automatic Unsubscription of Property Subscriptions](#automatic-unsubscription-of-property-subscriptions)
- [Unsubscribing from Subscriptions in an Array](#unsubscribing-from-subscriptions-in-an-array)
- [Using a Blacklist](#using-a-blacklist)

<!-- /code_chunk_output -->


@ngneat/until-destroy is an elegant solution for automatically unsubscribing from Observables in Angular. After installation, you can use it in various ways:

## Basic Usage with Ivy
Import UntilDestroy and untilDestroyed from @ngneat/until-destroy. Annotate your component with @UntilDestroy() and use untilDestroyed(this) in your Observable pipes:

```typescript
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({})
export class InboxComponent {
  ngOnInit() {
    interval(1000).pipe(untilDestroyed(this)).subscribe();
  }
}
```

This method ensures that all subscriptions are automatically unsubscribed when the component is destroyed​​.

## Automatic Unsubscription of Property Subscriptions
Using @UntilDestroy({ checkProperties: true }), all subscriptions assigned as component properties will be automatically unsubscribed upon component destruction:

```typescript
@UntilDestroy({ checkProperties: true })
@Component({})
export class HomeComponent {
  subscription = fromEvent(document, 'mousemove').subscribe();
}
```

This is useful for managing multiple subscriptions defined as class properties​​.

## Unsubscribing from Subscriptions in an Array
With the arrayName option, you can specify that all subscriptions in a certain array should be unsubscribed:

```typescript
@UntilDestroy({ arrayName: 'subscriptions' })
@Component({})
export class HomeComponent {
  subscriptions = [
    fromEvent(document, 'click').subscribe(),
    fromEvent(document, 'mousemove').subscribe(),
  ];
}
```

This allows for organized management of multiple subscriptions in an array​​.

## Using a Blacklist
The blackList option allows you to exclude certain subscriptions from automatic unsubscription:

```typescript
@UntilDestroy({ checkProperties: true, blackList: ['subscription1'] })
@Component({})
export class HomeComponent {
  subscription1: Subscription;
  subscription2: Subscription;

  constructor() {
    this.subscription1 = new Subject().subscribe();
    this.subscription2 = new Subject().subscribe();
  }
}
```

In this example, subscription1 will not be automatically unsubscribed, while subscription2 will be unsubscribed upon component destruction​​.

These methods offer a flexible and automated way to manage subscriptions in Angular components, making the code cleaner and more maintainable.
