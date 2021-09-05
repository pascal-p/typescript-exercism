## RxJs

  - Lesson 1 - Observables
  - Lesson 2 - Subjects
  - Lesson 3 - Subscriptions
  
#### Lesson 1 - Observables

  - What is an __Observable__? (my take)
    * From RxJs doc. _An observable is a representation of any set of values over an arbitrary amount of tinme_.
    
    * An __Observable__ (a source of "emitted" events over time) is just a **function** (well almost, as RxJs gives some guarantees with observables).   
    
      Guarantees about observables:
        + After an Observable completes, __no__ more values are to be emitted
        + The (event)stream is terminated on error case
        + an Observer that subscribes to an Observable is able to cancel its subscription and therefore also the async task wrapped by this observable (teardown).
        + An Observable can emit 0 to infinite _next_ notifications. 
        + An _error_  __xor__ a _complete_ are only delivered once. This can be expressed in Regex term:   
      `next*(error|complete)?`
      
      
    * An __Observable__ is "lazy by design" and won't start its work (emitting/streaming "events") until "something" (subscriber or observer) subscribe to it.


#### Lesson 2 - Subjects

A `RxJs Subject` is a type of Observable which allows multicasting. A "vanilla" Observable is unicast by design.  
  + Unicast: each (subscribed) Observer owns an independent execution of the Observable (no sharing).
  + Multicast: multiple Observers see the same execution of the Observable.

A `RxJs Subject` is both an Observable (source/producer) and an Observer (consumer) at the same time.

For (vanilla) Observables every subscription starts an execution. With a `Subject`, a subscription just registers the new Observer in a given list of observers.
  - A Subject is an Observable: we can subscribe to it and receive its values. from the standpoint of the observer there is no distinction  on whether it is subscribed to a Subject or a plain Observable.
  - A Subject is an Observer (subscriber) and hence it is an object with the three methods: `next()`, `error()`, and `complete()` which can receive values.

Thus, we can use a Subject by calling its `next()` method, this in turn notifies every Observer about the new value.

```javascript
import { Subject } from 'rxjs';

describe('Subject', () => {
  it('should inform all subscribers', () => {
    const subject$: Subject<number> = new Subject<number>();

    subject$.subscribe({ next: (v) => console.log(`A: ${v}`)});
    subject$.next(1);
    
    subject$.subscribe({ next: (v) => console.log(`B: ${v}`)});
    subject$.next(2);
    
  });
});

// A: 1   // => as soon as an observer subscribes to a subject it receives values from upcoming next() 
// A: 2
// B: 2   // => B only receives 2 because its subcription happens later (than first next()) 
// ...
```

##### Other type of Subjects

  - `BehaviorSubject`:  
    When using a BehaviorSubject the Observer receives a value directly after subscribing. This is either the initial value or the last value that was emitted.
  
  - `ReplaySubject`:  
    It is similar to a BehaviorSubject and also replays old values. Here you can also specify how many old values are emitted or from which time frame into the past.

  - `AsyncSubject`:  
    It is only delivering one value and this value is only emitted when the execution completes.
   
```javascript
import { AsyncSubject } from 'rxjs';

describe('AsyncSubject', () => {
  it('should inform the subscriber only with the last value before completion', () => {
    const subject$: AsyncSubject<number> = new AsyncSubject<number>();

    subject$.subscribe({ next: (v) => console.log(`A: ${v}`)});
    subject$.next(1);
    subject$.next(2);
    
    subject$.subscribe({ next: (v) => console.log(`B: ${v}`)});
    subject$.next(3);
    subject$.complete();
    // A: 3
    // B: 3
  });
});
```

#### Lesson 3 - Subscriptions

A _subscription_ usually represents an execution of an Observable. It is the access to the disposable resource or async task. The subscription is returned from the `subscribe()` method call, which is primarily useful to unsubscribe.  
Unsubscribing invokes the Observalde's `teardown` logic which cleans up and frees up resources.

Check [this for examples](https://github.com/pascal-p/typescript-exercism/blob/rxjs-p1-br/rxjs/src/rxjs-03-subscriptions.ts).


### Requirements

Install project dependencies:

```bash
$ yarn install
```

### Making the test suite pass

Execute the tests with:

```bash
$ yarn test
```

In the test suites all tests but the first have been skipped.

Once you get a test passing, you can enable the next one by changing `xit` to
`it`.

### Source
  The series [RxJs in 73 lessons - by  Ronnie Schaniel](https://ronnieschaniel.com/open-source/)

  - for lesson 1:  
    [RxJs in 73 Lessons – #2 Observables](https://ronnieschaniel.com/rxjs/rxjs-lesson-observables/)
    [source](https://github.com/rschaniel/rxjs_in_x_lessons/tree/main/src/2_observable)

  - for lesson 2:  
    [RxJs in 73 Lessons – #3 Subjects](https://ronnieschaniel.com/rxjs/rxjs-lesson-subjects/)
    [source](https://github.com/rschaniel/rxjs_in_x_lessons/tree/main/src/3_subjects)
    
  - for lesson 3:  
    [RxJs in 73 Lessons – #4 Subscription](https://ronnieschaniel.com/rxjs/rxjs-in-lessons-subscription-and-scheduler/)




<hr />
<p><sub><em>Sep. 2021 Corto Inc</sub></em></p>
