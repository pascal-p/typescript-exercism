import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

export const subject$: Subject<number> = new Subject<number>();

export const behaveSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

// limit to the last 10 values within the (last) 200ms timeframe
export const replaySubject$: ReplaySubject<number> = new ReplaySubject<number>(10, 200);
