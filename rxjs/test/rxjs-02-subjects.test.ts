import { subject$, behaveSubject$, replaySubject$ } from '../src/rxjs-02-subjects';
import { Subject, Subscription } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

const testScheduler = new TestScheduler((act, exp) => {
  // console.error("==> actual:   ", act);
  // console.error("==> expected: ", exp);
  expect(act).toEqual(exp);
});

describe('Subject', () => {

  it('should inform all subscribers', (done) => {
    const obsA: number[] = [];
    const obsB: number[] = [];
    const obsC: number[] = [];


    const subA = subject$.subscribe({
      next(v) {
        console.log(`[S] A: ${v}`);
        obsA.push(v)
      }
    });
    subject$.next(1);

    subject$.subscribe({
      next(v) {
        console.log(`[S] B: ${v}`);
        obsB.push(v)
      }
    });
    subject$.next(2);

    subA.unsubscribe();
    subject$.subscribe({
      next(v) {
        console.log(`[S] C: ${v}`);
        obsC.push(v);
      }
    });

    subject$.next(3);

    expect(obsA).toEqual([1, 2]);
    expect(obsB).toEqual([2, 3]);
    expect(obsC).toEqual([3]);
    done();

    // --1--2--3--
    // --1--2|           (subscriber) A
    // -----2--3--       (subscriber) B
    // --------3--       (subscriber) C
  });
});

describe('marbles testing', () => {
  it('should emit 1, 2  3 with A seeing 1,2 B seeing 2,3 ...', () => {
    testScheduler.run((helpers) => {
      const { cold, hot, expectObservable } = helpers;

      const sub$: Subject<number> = hot('--x--y--z--', { x: 1, y: 2, z: 3 });

      //               <- subscription ->          <- expected ->
      //                     '--x--y--z--'              '--x--y--z'
      // expectObservable(sub$, '^------!').toEqual(cold('--x--y-|', { x: 1, y: 2 }));

      expectObservable(sub$, '-----^---!').toEqual(cold('     y--z|', { y: 2, z: 3 }));

      // expectObservable(sub$, '-----^!').toEqual(cold('     y|', { y: 2, z: 3 }));
    });
  });
});

describe('BehaviourSubject', () => {
  it('should inform all subscribers (also about the last value)', (done) => {
    const obsA: number[] = [];
    const obsB: number[] = [];

    behaveSubject$.subscribe({
      next(v) {
        console.log(`[BS] A: ${v}`);
        obsA.push(v);
      }
    });
    behaveSubject$.next(1);
    behaveSubject$.next(2);

    behaveSubject$.subscribe({
      next(v) {
        console.log(`[BS] B: ${v}`);
        obsB.push(v);
      }
    });
    behaveSubject$.next(3);

    // A: 0
    // A: 1
    // A: 2
    // B: 2
    // A: 3
    // B: 3

    expect(obsA).toEqual([0, 1, 2, 3]);
    expect(obsB).toEqual([2, 3]);
    done();
  });
});


describe('ReplaySubject', () => {
  it('should inform all subscribers time based', (done) => {
    const obs: number[] = [];

    let value = 0;
    // incr value every 100 ms
    const interval = setInterval(() => replaySubject$.next(value++), 100);

    setTimeout(() => {
      // subscribe after approx 450ms
      replaySubject$.subscribe({
        next(v) {
          console.log(`[RS] A: ${v}`);
          obs.push(v);
        }
      });
    }, 450);

    //  100 210 320 430 540 650 760 870 980 1010   assuming event itsel, emitting number is 10ms
    // 0---1---2---3---4---5---6---7---8---9---10
    //                ^                   !
    //       ^--200ms-- extension
    setTimeout(() => {
      clearInterval(interval);
      replaySubject$.unsubscribe();

      expect(obs).toEqual([2, 3, 4, 5, 6, 7, 8]);
      done();
    }, 1000)
  });
});
