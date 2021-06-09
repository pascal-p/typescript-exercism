class PerfectNumbers {
  public static classify(n: number): string {
    if (n <= 0) {
      throw new Error('Classification is only possible for natural numbers.');
    }

    if (n <= 2) return "deficient";
    let divs = PerfectNumbers.findFactors(n); // find all factors of a given (natural integer) n
    const div_sum = divs.reduce((s: number, x: number) => s + x, 0);

    if (PerfectNumbers.isPerfect(n, div_sum)) {
      return "perfect";
    }
    else if (PerfectNumbers.isAbundant(n, div_sum)) {
      return "abundant";
    }
    return "deficient";
  }

  private static findFactors(n: number): number[] {
    // start a 2 up to Math.round(Math.sqrt(n) + 0.49)
    let fact = 2;
    let factors = new Set<number>();
    factors.add(1);
    const lim = Math.round(Math.sqrt(n) + 0.49);

    while (fact <= lim) {
      if (n % fact == 0) {
        const m = n / fact >> 0;  // integer division
        factors.add(fact).add(m);
        if (m == 1) { break; }
      }
      fact++;
    }
    return new Array(...factors.values());
  }

  private static isPerfect(n: number, sum: number): boolean {
    return n === sum;
  }

  private static isAbundant(n: number, sum: number): boolean {
    return n < sum;
  }

  /*
  private static isDeficient(n: number, sum: number): boolean {
    return n > sum;
  }
  */
}

export default PerfectNumbers;
