class Sieve {
  static primes(n: number) {
    n = Math.trunc(n); // deal with integer

    if (n < 2) return [];
    if (n === 2) return [2];

    let ary: boolean[] = [];
    for (let ix = 0; ix <= n; ix++) {
      ary[ix] = ix % 2 === 1;
    }
    ary[0] = ary[1] = false;
    ary[2] = true;

    let [cp, m] = [3, ary.length];
    while (cp < m) {
      for (let ix = 2 * cp; ix < m; ix += cp) {
        ary[ix] = false
      }
      cp += 2;  // next candidate prime (cp)
      while (cp < m && !ary[cp]) {
        cp += 2;
      }
    }
    /*
    const reducer_fn = (pf: number[], cp: boolean, ix: number) => cp ? pf.push(ix) : pf;
    const fp = ary.reduce(reducer_fn, []);
    */
    let fp: number[] = [2];
    for (let ix = 3; ix < m; ix++) {
      if (ary[ix]) fp.push(ix);
    }
    return fp;
  }
}

export default Sieve;
