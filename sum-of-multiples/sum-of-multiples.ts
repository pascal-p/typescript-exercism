class SumOfMultiples {
  readonly digits: number[];

  constructor(digits: number[]) {
    this.digits = digits
  }

  to(limit: number): number {
    let hsh = new Map([[0, 1]]);

    for (const m of this.digits) {
      if (m === 0) continue;

      for (let p = m; p < limit; p += m) {
        if (hsh.has(p)) continue;

        hsh.set(p, 1)
      }
    }

    return [...hsh.keys()].reduce((s, k) => s += k, 0);
  }
}

export default SumOfMultiples;
