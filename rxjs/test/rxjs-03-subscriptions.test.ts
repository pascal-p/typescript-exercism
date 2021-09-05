import { take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

const testScheduler = new TestScheduler((act, exp) => {
  // console.warn("==> actual:   ", act);
  // console.warn("\t==> expected: ", exp);
  expect(act).toEqual(exp);
});


/*
describe('marbles testing', () => {
  it('should test the subscription', (done) => {
    testScheduler.run((helpers) => {
      const { hot, expectSubscriptions, expectObservable } = helpers;

      const source = hot('--a-b-c-d-');
      const sub = '       ---^---!';
      const output = '    ----b-c---';

      expectObservable(source, sub).toBe(output);
      expectSubscriptions(source.subscriptions).toBe([sub]);
      done();
    });
  });
});
*/

describe('marbles testing/2', () => {
  it('should test the subscription dependent on take', (done) => {
    testScheduler.run((helpers) => {
      const { hot, expectSubscriptions } = helpers;
      let myService = {
        data: () => hot('-a-b-c-d', { a: 1, b: 2, c: 3, d: 4 }),
      };

      const observable = myService.data();
      observable.pipe(take(3)).subscribe();
      const sub = '^----!';

      expectSubscriptions(observable.subscriptions).toBe(sub);
      done();
    });
  });
});
