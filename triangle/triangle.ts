export default class Triangle {
  sides: number[]

  constructor(...sides: number[]) {
    this.sides = sides
  }

  /*
   * Choosing to test triangle validity only when required...
   */
  kind(): string {
    if (this.sides.some(x => x < 0)) {
      throw new Error('negative sides is illegal');
    }

    const s = new Set(this.sides);

    if (s.size === 1) {
      if (s.has(0)) throw new Error('No size');
      return 'equilateral';
    }
    else if (s.size === 2) {
      this.checkValidTriangle();
      return 'isosceles';
    }
    else {
      this.checkValidTriangle();
      return 'scalene';
    }
  }

  private checkValidTriangle(): void {
    // get index of max
    const ix_max = this.sides.reduce((ix_max, cur, ix) => ix_max = cur > this.sides[ix_max] ? ix : ix_max, 0)

    // calc. sum of the sides (but the longest one)
    const sum = this.sides.filter((_x, ix) => ix !== ix_max)
      .reduce((s, x) => s + x, 0);

    if (sum < this.sides[ix_max]) {
      throw new Error('triangle inequality violated');
    }
  }
}
