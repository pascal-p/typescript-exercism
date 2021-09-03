## RxJs

  - Lesson1 - Observables
  
#### Lesson1

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



<hr />
<p><sub><em>Sep. 2021 Corto Inc</sub></em></p>
