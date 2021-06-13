class Luhn {
  static valid(str: string) {
    let nstr = str.replace(/[\s\t\n\r]+/g, '');          // remove any space

    if (nstr.length <= 1) { return false; }              // check length
    if (!nstr.match(/^[0-9]+$/)) { return false; }       // consider only digit

    return Luhn.extractCalc(nstr.split('')) % 10 === 0;  // calculate and conclude
  }

  private static extractCalc(ary: string[]): number {
    let p = ary.length % 2 === 0 ? 0 : 1;

    const [ds, s] = ary.reduce(([ds, s], ch, ix) => {    // use ix to keep track of parity position
      let d = parseInt(ch, 10);
      if ((ix + 1) % 2 === p) { s += d; }                // accumulate
      else {
        let x = 2 * d;
        ds += x > 9 ? x - 9 : x;                         // double, norm., accumulate
      }
      return [ds, s];
    }, [0, 0]);
    return ds + s;
  }
}

export default Luhn;
