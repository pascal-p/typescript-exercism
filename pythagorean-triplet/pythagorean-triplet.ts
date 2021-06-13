class Triplet {
  readonly _x: number;
  readonly _y: number;
  readonly _z: number;

  constructor(x: number, y: number, z: number) {
    let ary = [x, y, z].sort();

    this._x = ary[0];
    this._y = ary[1];
    this._z = ary[2];
  }

  isPythagorean(): boolean {
    return this._x ** 2 + this._y ** 2 === this._z ** 2;
  }

  product() {
    return this._x * this._y * this._z;
  }

  sum() {
    return this._x + this._y + this._z;
  }

  public static where(options: any = {}): Triplet[] {
    if (typeof options.sum === 'undefined') {
      if (typeof options.minFactor === 'undefined' && typeof options.maxFactor === 'undefined') {
        return [];
      }
      else if (typeof options.minFactor !== 'undefined' && typeof options.maxFactor !== 'undefined') {
        return Triplet.search1(options.minFactor, options.maxFactor);
      }
      else if (typeof options.maxFactor !== 'undefined') {
        return Triplet.search1(1, options.maxFactor);
      }

      // only minFactor defined!
      return [];
    }
    // now options.sum defined

    if (typeof options.minFactor === 'undefined' && typeof options.maxFactor === 'undefined') {
      return Triplet.search2(options.sum, 1, options.sum);
    }
    else if (typeof options.minFactor !== 'undefined' && typeof options.maxFactor !== 'undefined') {
      return Triplet.search2(options.sum, options.minFactor, options.maxFactor);
    }
    else if (typeof options.maxFactor !== 'undefined') {
      return Triplet.search2(options.sum, 1, options.maxFactor);
    }

    return Triplet.search2(options.sum, 1, options.sum);
  }

  private static search1(minFactor = 1, maxFactor = 1000): Triplet[] {
    let triplets: Triplet[] = [];
    for (let a = minFactor; a <= maxFactor; a++) {
      if (a > maxFactor) break;

      for (let b = a + 1; b <= maxFactor; b++) {
        if (b > maxFactor) break;

        for (let c = b + 1; c <= maxFactor; c++) {
          if (c > maxFactor) break;
          if (a ** 2 + b ** 2 === c ** 2) {
            const t = new Triplet(a, b, c);
            triplets.push(t);
          }
        } // end for c
      } // end for b
    } // end for a

    return triplets;
  }

  private static search2(sum: number, minFactor = 1, maxFactor = sum): Triplet[] {
    let triplets: Triplet[] = [];
    for (let a = minFactor; a <= maxFactor; a++) {
      if (a > maxFactor) break;

      for (let b = a + 1; b <= maxFactor; b++) {
        if (a + b > sum || b > maxFactor) break;

        for (let c = b + 1; c <= maxFactor; c++) {// (let c = sum - a - b; c <= maxFactor; c++) {
          if (a + b + c < sum) continue;
          if (a + b + c > sum || c > maxFactor) break;
          if (a ** 2 + b ** 2 === c ** 2) {
            const t = new Triplet(a, b, c);
            triplets.push(t);
          }
        } // end for c
      } // end for b
    } // end for a

    return triplets;
  }

}

export default Triplet;
