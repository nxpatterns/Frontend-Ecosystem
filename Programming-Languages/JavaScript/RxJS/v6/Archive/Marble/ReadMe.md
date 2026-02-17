# Writing Marble Tests

## Run the code

`npm install`
`npm run test`

## Basic methods

> [See further details online](https://rxjs-dev.firebaseapp.com/guide/testing/internal-marble-tests)

The unit tests have helper methods that have been added to make creating tests easier.

- hot(marbles: string, values?: object, error?: any) - creates a "hot" observable (a subject) that will behave as though it's already "running" when the test begins. An interesting difference is that hot marbles allow a ^ character to signal where the "zero frame" is. That is the point at which the subscription to observables being tested begins.
- cold(marbles: string, values?: object, error?: any) - creates a "cold" observable whose subscription starts when the test begins.
- expectObservable(actual: Observable<T>).toBe(marbles: string, values?: object, error?: any) - schedules an assertion for when the TestScheduler flushes. The TestScheduler will automatically flush at the end of your jasmine it block.
- expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]).toBe(subscriptionMarbles: string) - like expectObservable schedules an assertion for when the testScheduler flushes. Both cold() and hot() return an observable with a property subscriptions of type SubscriptionLog[]. Give subscriptions as parameter to expectSubscriptions to assert whether it matches the subscriptionsMarbles marble diagram given in toBe(). Subscription marble diagrams are slightly different than Observable marble diagrams. Read more below.

### Ergonomic defaults for hot and cold

In both hot and cold methods, value characters specified in marble diagrams are emitted as strings unless a values argument is passed to the method. Therefor:

`hot('--a--b')` will emit "a" and "b" whereas

`hot('--a--b', { a: 1, b: 2 })` will emit 1 and 2.

Likewise, unspecified errors will just default to the string "error", so:

`hot('---#')` will emit error "error" whereas

`hot('---#', null, new SpecialError('test'))` will emit new SpecialError('test')
