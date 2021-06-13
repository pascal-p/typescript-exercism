class Converter {

  convert(digits: number[], ibase: number, obase: number) {
    if (!Number.isInteger(ibase) || ibase < 2) { throw new Error("Wrong input base"); }  // input base >= 2

    if (!Number.isInteger(obase) || obase < 2) { throw new Error("Wrong output base"); } // output base >= 2

    if (digits.length === 0) { throw new Error("Input has wrong format"); }

    if (digits.length > 1 &&
      (digits[0] === 0 || digits.every(x => x === 0))) { throw new Error("Input has wrong format"); }

    if (digits.some(x => x < 0 || x >= ibase)) {
      throw new Error('Input has wrong format');
    }

    let n = Converter.toBase10(ibase, digits);
    return (obase == 10) ? (n).toString().split('').map(x => parseInt(x)) :
      Converter.from10ToObase(obase, n);
  }

  private static toBase10(ibase: number, digits: number[]): number {
    return digits.reduce((n, d) => n * ibase + d, 0)
  }

  private static from10ToObase(obase: number, num: number): number[] {
    if (num === 0) { return [0]; }

    let digits = [];
    let d;
    while (num > 0) {
      [num, d] = [Math.floor(num / obase), num % obase];
      digits.unshift(d);
    }
    return digits;
  }
}

export default Converter;
