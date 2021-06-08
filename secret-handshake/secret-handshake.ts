class HandShake {
  n: number;

  static readonly Base: number[] = [16, 8, 4, 2, 1];
  static readonly SecHandShakeCode: any = new Map([
    [1, 'wink'],
    [2, 'double blink'],
    [4, 'close your eyes'],
    [8, 'jump'],
    [16, 'reverse']
  ]);

  constructor(n: number) {
    if (typeof (n) !== "number" || !Number.isInteger(n) || n < 0) {
      throw new Error("value must be a non negative integer");
    }
    this.n = n;
  }

  commands(): string[] {
    if (this.n === 0 || this.n % HandShake.Base[0] === 0) return [];

    let ix = 1;
    let actions = [];
    let [value, method] = HandShake.case16(this.n, 'unshift');

    while (value >= 1) {
      let count = 0;

      if (value >= HandShake.Base[ix]) {
        value -= HandShake.Base[ix];
        count++;
      }
      ix++;

      if (count > 0) {
        const action = HandShake.SecHandShakeCode.get(HandShake.Base[ix - 1]);
        (method === 'unshift') ? actions.unshift(action) : actions.push(action);
      }
    }

    return actions;
  }

  private static case16(value: number, method: string): [number, string] {
    let count = 0;

    while (value >= HandShake.Base[0]) {
      value -= HandShake.Base[0];
      count++;
    }
    if (count % 2 === 1) { method = 'push'; }

    return [value, method];
  }
}

export default HandShake;
