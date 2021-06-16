export function keep<T>(collection: T[], predicate: any): T[] {
  let res = [];
  for (let x of collection) {
    if (predicate(x)) res.push(x);
  }
  return res;
}

export function discard<T>(collection: T[], predicate: any): T[] {
  let res = [];
  for (let x of collection) {
    if (predicate(x)) continue;

    res.push(x);
  }
  return res;
}
