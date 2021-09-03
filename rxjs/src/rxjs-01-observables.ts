import { Observable } from 'rxjs';

/*
 * generate and publish a random number every (TICK) 200 msec.
 */
export const TICK: number = 200;

export const randomNumGenerator$ = new Observable<number>((subscriber) => {
  const interval = setInterval(() => {
    const randNum = Math.ceil(Math.random() * 500);  // this observable (function) is a producer
    subscriber.next(randNum)                         // publish "event" to observers/subscribers
  }, TICK);

  // teardown - to "complete/terminate" this observable...
  // ...by clearing the "async" resource => here interval
  return () => clearInterval(interval);
});
