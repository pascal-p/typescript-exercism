/**
 * Rules:
 * (i) input is normalized: the spaces and punctuation are removed from the English text and the message is downcased.
 * (ii) the normalized characters are broken into rows.
 *      These rows can be regarded as forming a rectangle when printed with intervening newlines.
 *
 * The plaintext should be organized in to a rectangle.
 * The size of the rectangle (r x c) should be decided by the length of the message, such that
 * c ≥ r ∧  c - r ≤ 1, where c is the number of columns and r is the number of rows.
 */

class Crypto {
  _msg: string;
  _normMsg: string;
  _ncols: number

  constructor(msg: string) {
    this._msg = msg;
    this._normMsg = this._normalizePlaintext(msg);
    this._ncols = this._size(this._normMsg);
  }

  normalizePlaintext(): string {
    return this._normMsg;
  }

  size(): number {
    return this._ncols;
  }

  //
  // A choice of not keeping
  // - plaintextsegments
  // - ciphered text
  //
  // Should go further not keeping original msg/normalized mesage
  //
  plaintextSegments(): string[] {
    let ary: string[] = [];
    for (let ix = 0; ix < this._normMsg.length; ix += this._ncols) {
      ary.push(this._normMsg.slice(ix, ix + this._ncols));
    }

    const last_elem = ary[ary.length - 1];
    if (last_elem.length < ary[0].length) { // pad
      ary[ary.length - 1] = ary[ary.length - 1].padEnd(this._ncols, " ");
    }
    return ary;
  }

  ciphertext(): string {
    //
    // 1 - iterate over segments by position  or
    // (alt) 2 - transpose segments - return transposition
    //
    const segments = this.plaintextSegments();
    let encodedMsg: string[] = [];
    for (let ix = 0; ix < this._ncols; ix++) {
      const encodeStr = segments.map(s => s[ix]).join('');
      encodedMsg.push(encodeStr.trimEnd());
    }
    return encodedMsg.join('');
  }

  decode(cipheredText: string): string { // without spaces!
    const [segments, nrows] = this._cipheredSegments(cipheredText);
    let decodedMsg: string[] = [];
    for (let ix = 0; ix < nrows; ix++) {
      const decodeStr = segments.map((s: string) => s[ix]).join('');
      decodedMsg.push(decodeStr.trimEnd());
    }
    return decodedMsg.join('');
  }

  private _normalizePlaintext(msg: string) {
    return msg.replace(/\s+/g, '').replace(/[\W]+/g, '').toLowerCase();
  }

  private _size(normMsg: string): number {
    const n = normMsg.length;
    const c = Math.ceil(Math.sqrt(n));
    // assert r == c - 1 // c * (c - 1) >= n
    // assert r == c     // otherwise
    return c;
  }

  //
  private _cipheredSegments(cipheredText: string): any[] {
    const n = cipheredText.length;
    const ncols = this._size(cipheredText);
    const nrows = ncols * (ncols - 1) >= n ? ncols - 1 : ncols;
    const npads = ncols * nrows - n;

    let segments: string[] = [];
    let jx = 0;
    let shift = 0;
    for (let ix = 0; ix < n; ix += nrows - shift) { // ncols times
      if (jx < ncols - npads) {
        segments.push(cipheredText.slice(ix, ix + nrows));
      }
      else {
        segments.push(cipheredText.slice(ix, ix + nrows - 1).padEnd(nrows, ' '));
        shift = 1;
      }
      jx++;
    }
    return [segments, nrows];
  }

}

export default Crypto
