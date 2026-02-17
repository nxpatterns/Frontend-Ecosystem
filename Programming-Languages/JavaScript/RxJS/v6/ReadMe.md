# RxJS 7+ Revisited

- Composing asnynchronous and event based programms.
- Core Type: Observable
- Satelite Types: Observer, Scheudulars, Subjects,...
- Operators: map, filter, reduce, every,...
- Combines: Oberserver & Iterator patterns & functional programming with collections

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [RxJS 7+ Revisited](#rxjs-7-revisited)
  - [Tag Cloud](#tag-cloud)
  - [Observable](#observable)
    - [Simple: Observable, Observer, Subscription](#simple-observable-observer-subscription)
      - [Long Version (I)](#long-version-i)
      - [Long Version (II): Error, Complete, Teardown](#long-version-ii-error-complete-teardown)
      - [Short Version](#short-version)

<!-- /code_chunk_output -->

## Tag Cloud

- Stream, Observable, Subscription, Observer, Marble Diagrams, Notification Types,
- Observable: next, error, complete

## Observable

### Simple: Observable, Observer, Subscription

#### Long Version (I)

```js
import { Observable } from 'rxjs';

const observable$ = new Observable((subscriber) => {
  subscriber.next('Alice');
  subscriber.next('Ben');
});

const observer = {
  next: (value: any) => console.log(value),
};

observable$.subscribe(observer);
```

#### Long Version (II): Error, Complete, Teardown

```js
import { Observable } from 'rxjs';

const observable$ =
  new Observable() <
  string >
  ((subscriber) => {
    subscriber.next('Alice');
    subscriber.next('Ben');
    subscriber.error('Error happened!');
    subscriber.complete();
    return () => {
      console.log('Teardown Process');
    };
  });

observable$.subscribe({
  next: (value: any) => console.log(value),
  error: (error: any) => console.log(error),
  complete: () => console.log('Completed!'),
});
```

#### Short Version

```js
import { Observable, of } from 'rxjs';

const observable$ = of('Alice', 'Ben');
observable$.subscribe((value: any) => console.log(value));
```
