import { interval } from 'rxjs';

const observable$ = interval(100); // gen. and integer every 100ms
const sub = observable$.subscribe(
  x => console.log("obs1: ", x, " - at: ", Date.now())
);

// child subscription
setTimeout(() => {
  const childSub = observable$.subscribe(
    x => console.log("\tchild of obs1: ", x, " - at: ", Date.now())
  );
  sub.add(childSub);
}, 200);


// after 500ms - unsubscribe
setTimeout(() => {
  sub.unsubscribe();
}, 500);

// run with:
// npx ts-node src/rxjs-03-subscriptions.ts 

