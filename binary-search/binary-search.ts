export default class BinarySearch {
  readonly _ary: number[];
  readonly _n: number;

  constructor(ary: number[]) {
    if (!BinarySearch.isSorted(ary)) {
      this._ary = [];
      this._n = -1;
    }
    else {
      this._ary = ary;
      this._n = ary.length;
    }
  }

  get array() {
    return this._n === -1 ? undefined : this._ary;
  }

  indexOf(elt: number): any[] | number {
    const [_found, m] = this.findFirst(elt);
    return m;
  }

  indexOfAll(elt: number) {
    // Assuming duplicate => return all matching indexes given an elt.
    let [found, m, l, r] = this.findFirst(elt);
    if (!found) { return -1; }

    let lx = m;
    if (m > l) {
      lx = this.findOthers(elt, lx, l);
    }
    let rx = m;
    if (m < r) {
      rx = this.findOthers(elt, rx, r, isGreater, 1);
    }

    return [lx, rx]; // return an array (representing a range)
  }

  private static isSorted(ary: number[]): boolean {
    for (let ix = 0; ix < ary.length - 1; ix++) {
      if (ary[ix] > ary[ix + 1]) return false;
    }

    return true;
  }

  private findFirst(elt: number): any[] {
    if (elt < this._ary[0] || elt > this._ary[this._n - 1]) return [false, -1, 0, this._n];

    let [l, r] = [0, this._n];
    let [found, m] = [false, -1];

    while (l <= r) {
      m = Math.floor((l + r) / 2);
      if (elt < this._ary[m]) {
        r = m - 1;
      }
      else if (elt > this._ary[m]) {
        l = m + 1;
      }
      else {
        found = true;
        break;
      }
    }
    return [found, m, l, r];
  }

  private findOthers(elt: number, ix: number, lim: number, rel = isLess, incr = -1) {
    while (elt === this._ary[ix]) {
      ix += incr;
      if (rel(ix, lim)) { break; }
    }
    return ix -= incr;
  }
}

const isLess = (x: number, y: number) => x < y;

const isGreater = (x: number, y: number) => x > y;
