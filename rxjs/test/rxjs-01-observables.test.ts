import { randomNumGenerator$, TICK } from '../src/rxjs-01-observables';

// helper function
const setLimits = (num: number) => [num, num / TICK >> 0];

describe('Random Number Generator Observable', () => {

  it('should output random generated number until unsubscribed', (done) => {
    const randNums: number[] = [];

    const randNumObserver = randomNumGenerator$.subscribe({
      next(n) { randNums.push(n); }  // accumulate the received rand nums
    });

    const [DUR, N] = setLimits(1100);

    setTimeout(() => {
      // after  approx. DUR s => unsubscribe
      randNumObserver.unsubscribe();
      console.log(randNums);

      expect(randNums.length).toBeGreaterThanOrEqual(N);
      done();

    }, DUR);
  })

  it('should handle multiple observers', (done) => {
    const randNum1: number[] = [];
    const randNum2: number[] = [];

    const sub1 = randomNumGenerator$.subscribe({ next: (n) => randNum1.push(n) });
    const sub2 = randomNumGenerator$.subscribe({ next: (n) => randNum2.push(n) });

    const [DUR, N] = setLimits(1300);

    setTimeout(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();

      console.log(randNum1);
      console.log(randNum2);

      expect(randNum1.length).toEqual(N);
      expect(randNum2.length).toEqual(N);

      done();
    }, DUR);
  });
});
