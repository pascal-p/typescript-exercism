class Series {
  _series: string;
  _len: number;

  constructor(series: string) {
    if (series.length === 0) {
      throw new Error('series cannot be empty')
    }
    this._series = series;
    this._len = series.length;
  }

  get digits(): number[] {
    return this._series.split("").map(s => parseInt(s, 10));
  }

  public slices(sliceLen: number) {
    if (typeof sliceLen === 'undefined') {
      throw new Error('expect a natural integer');
    }

    sliceLen = Math.trunc(sliceLen); // make sure we deal with integer

    if (sliceLen === 0) {
      throw new Error('slice length cannot be zero');
    }
    else if (sliceLen < 0) {
      throw new Error('slice length cannot be negative')
    }
    else if (sliceLen > this._len) {
      throw new Error('slice length cannot be greater than series length')
    }

    let series = [];
    for (let s = 0; s <= this._len - sliceLen; s++) {
      const nums = this._series.slice(s, s + sliceLen).split("").map(x => parseInt(x, 10));
      series.push(nums);
    }
    return series;
  }
}

export default Series;
