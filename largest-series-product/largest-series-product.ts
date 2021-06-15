class Series {
  readonly _serie: string

  constructor(serie: string) {
    this._serie = serie;
  }

  largestProduct(size: number) {
    if (!this._serie.match(/^[0-9]*$/)) {
      throw new Error('Invalid input.');
    }
    else if (size === 0) {
      return 1;
    }
    else if (size < 0) {
      throw new Error('Invalid input.');
    }
    else if (size > this._serie.length) {
      throw new Error('Slice size is too big.');
    }

    let max_s = 0;
    let max_seq: string = '';

    for (let ix = 0; ix < this._serie.length - size + 1; ix++) {
      const seq = this._serie.substring(ix, ix + size);
      if (seq.includes('0')) { continue; }

      const s = seq.split('').map(s => parseInt(s, 10)).
        reduce((p, i) => p * i, 1);

      if (s > max_s) {
        max_s = s;
        max_seq = seq;
        // if (max_seq.match(/^9+$/)) { break; }
      }
    }
    return [max_s, max_seq][0];
  }
}

export default Series;
