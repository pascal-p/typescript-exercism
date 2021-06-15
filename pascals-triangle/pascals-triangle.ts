export default class Triangle {
  readonly _n: number;
  _rows: number[][] | undefined = undefined;

  constructor(n: number) {
    if (n < 0) { throw new Error("Integer must be > 0"); };
    this._n = n;
  }

  get rows() {
    return this.calcRows();
  }

  get lastRow() {
    const rows = this.calcRows();
    return (typeof rows === 'undefined') ? [] : rows[rows.length - 1];
  }

  private calcRows() {
    if (this._n === 0) { return []; };
    if (typeof this._rows !== 'undefined') {
      return this._rows;
    }

    let ary = [[1]];
    // construct full array
    for (let ix = 1; ix < this._n; ix++) {
      ary.push([1]);
      for (let jx = 1; jx < ix; jx++) {
        // the rec. formulae
        ary[ix].push(ary[ix - 1][jx - 1] + ary[ix - 1][jx]);
      };
      ary[ix].push(1);
    };

    return this._rows = ary;
  }
}
