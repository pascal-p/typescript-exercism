class Prime {
  static _primes = [2, 3, 5, 7, 11, 13];

  nth(n: number) {
    if (n === 0) {
      throw new Error('Prime is not possible')
    }

    const m = Prime._primes.length;

    if (n <= m) {
      return Prime._primes[n - 1];
    }

    //
    // How abundant are primes numbers?
    // as we increase the index we find less and less primes...
    //
    // Given n what should be the limit if we use Eratosthenes sieve to extend the primes
    // is a 10x, 100x... as n increase?
    // cf. nth -> where I am taking a 10x factor (< g digits number) and ...
    //
    //
    // 

    // extend, then return value at given index
    const j = String(n).length;
    const e = j < 6 ? 10 ** (j + 1) : 10 ** (j + 2);
    // console.log(`Extension by factor ${e} called...`);
    this.extendPrimes(e);
    return Prime._primes[n - 1];
  }

  private extendPrimes(n: number): void {
    const np = Prime._primes.length;
    const lastPrime = Prime._primes[np - 1];
    let candidatePrimes: boolean[] = [];

    // Create a candidate primes onto which we need to use the sieve
    for (let ix = 0; ix < n; ix++) { // for (let ix = 0; ix < 2 * n; ix++) {
      candidatePrimes.push(true);    // first (encoded) value is: Prime._primes[np - 1] + 2!
    }
    const m = candidatePrimes.length;

    let lastTestedPrime = 1;

    for (const p of Prime._primes.slice(1, np)) {
      // LIMIT: Math.floor(Math.sqrt(lastPrime + 2 * m))
      lastTestedPrime = p;
      const cont = this.sieving(candidatePrimes, p, lastPrime, m);
      if (!cont) break;
    }

    if (lastTestedPrime * lastTestedPrime > lastPrime + 2 * m) {
      this.mergePrimes(lastPrime, m, candidatePrimes);
    }
    else {
      // ok we know the limit:  Math.floor(Math.sqrt(lastPrime + 2 * m))
      for (let ix = 0; ix < n; ix++) {
        if (candidatePrimes[ix]) {
          const p = lastPrime + 2 * (ix + 1);
          const cont = this.sieving(candidatePrimes, p, lastPrime, m, true);
          if (!cont) break;
        }
        else {
          // NO-OP => continue
        }
      } // end for
      this.mergePrimes(lastPrime, m, candidatePrimes);
    }
  }

  private sieving(candidatePrimes: boolean[], p: number, lastPrime: number, m: number, extended = false): boolean {
    if (p * p > lastPrime + 2 * m) return false;

    let ix = 0;                          // index for primes_ind
    let cp = lastPrime + 2;              // (possible) next candidate prime
    while (ix <= m && cp % p !== 0) {    // find next candidate prime (cp)
      ix++;
      cp += 2;
    }
    if (ix > m) return false;            // we are done...

    // now eliminate multiples of p
    for (let jx = extended ? ix + p : ix; jx < m; jx += p) {
      candidatePrimes[jx] = false;
    }
    return true;
  }

  private mergePrimes(lastPrime: number, m: number, candidatePrimes: boolean[]): void {
    let newPrimes = [];
    for (let ix = 0; ix < m; ix++) {
      if (candidatePrimes[ix]) {
        const pr = lastPrime + 2 * (ix + 1);
        newPrimes.push(pr);
      }
    }
    Prime._primes = [...Prime._primes, ...newPrimes];
  }
}

export default Prime;
