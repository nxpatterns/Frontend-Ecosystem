# Observables

[Excerpt from the official documentation](http://reactivex.io/rxjs/manual/)

## Anatomy of an Observable

Observables are created using `Rx.Observable.create` or a creation operator, 
are `subscribed` to with an Observer, execute to deliver `next` / `error` / `complete` 
notifications to the Observer, and their execution may be disposed.

Observables can be created with create, but usually we use the so-called creation 
operators, like `of`, `from`, `interval`, etc.

In an Observable Execution, zero to infinite Next notifications may be delivered. 
If either an Error or Complete notification is delivered, then nothing 
else can be delivered afterwards.

When you subscribe, you get back a Subscription, which represents the 
ongoing execution. Just call `unsubscribe()` to cancel the execution.

## Observer

An Observer is a consumer of values delivered by an Observable. Observers are simply 
a set of callbacks, one for each type of notification delivered by the 
Observable: `next`, `error`, and `complete`.

The following is an example of a typical Observer object:

    var observer = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    
To use the Observer, provide it to the subscribe of an Observable:

    observable.subscribe(observer);
    
## Subscription


A Subscription is an object that represents a disposable resource, 
usually the execution of an Observable. A Subscription has one important method, 
unsubscribe, that takes no argument and just disposes the resource held by 
the subscription. In previous versions of RxJS, Subscription was called “Disposable”.

Subscriptions can also be put together, so that a call to an `unsubscribe()` of one 
Subscription may unsubscribe multiple Subscriptions. You can do this by `“adding”` one 
subscription into another:

    var observable1 = ........
    var observable2 = ........

    var subscription = observable1.subscribe(...
    var childSubscription = observable2.subscribe(...

    subscription.add(childSubscription);

    setTimeout(() => {
      // Unsubscribes BOTH subscription and childSubscription
      subscription.unsubscribe();
    }, 1000);
    
Subscriptions also have a `remove(otherSubscription)` method, in order to undo the 
addition of a child Subscription.
