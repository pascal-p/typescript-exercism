class CollatzConjecture {
  static steps(n: number) {
    if (n <= 0) {
      throw new Error('Only positive numbers are allowed');
    }

    let step = 0;
    let p = n;

    while (p > 1) {
      if (p % 2 === 0) {
        p = p / 2 >> 0;
      }
      else {
        p = 3 * p + 1;
      }
      step++;
    }

    return step;
  }
}

export default CollatzConjecture
