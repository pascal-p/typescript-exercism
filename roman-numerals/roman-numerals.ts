class RomanNumerals {
  static readonly YA_MAP: Map<number, string> = new Map(
    [
      [1, 'I'], [2, 'II'], [3, 'III'], [4, 'IV'], [5, 'V'],
      [6, 'VI'], [7, 'VII'], [8, 'VIII'], [9, 'IX'], [10, 'X'],
      [50, 'L'], [100, 'C'], [500, 'D'], [1000, 'M']
    ]
  );
  static readonly LIMITS = [1, 3000];

  static roman(n: number): string {
    if (n < RomanNumerals.LIMITS[0] || n > RomanNumerals.LIMITS[1]) {
      throw (new Error("Out of range"));
    }

    if (RomanNumerals.YA_MAP.has(n)) {
      return String(RomanNumerals.YA_MAP.get(n));
    }

    let [roman, p] = ['', 1000];
    while (true) {
      let [num, rem] = [n / p >> 0, n % p];  // perform integer division (a/b) >> 0 or ~~(a / b);
      if (num > 0) {
        if (p == 1000) {
          roman = roman.concat((RomanNumerals.YA_MAP.get(p) || '').repeat(num));
        }
        else if ((p == 100) || (p == 10)) {
          roman = RomanNumerals.roman_helper_fn(roman, num, p);
        }
        else {
          roman = roman.concat((RomanNumerals.YA_MAP.get(num) || ''));
        }
      }
      if (rem == 0) { break; }
      [n, p] = [rem, p / 10 >> 0];
    }
    return roman;
  }

  private static roman_helper_fn(roman: string, num: number, p: number) {
    let args = [];
    if (num <= 3) {
      if (!RomanNumerals.YA_MAP.has(p)) {
        throw new Error('Missing roman Symbol?');
      }
      // roman symbol defined
      args = [(RomanNumerals.YA_MAP.get(p) || '').repeat(num)];               // ex. 30 => XXXX
    }
    else if (num == 4) {
      args = [RomanNumerals.YA_MAP.get(p), RomanNumerals.YA_MAP.get(5 * p)];  // ex. 40 => XL
    }
    else if (num < 9) {
      if (!RomanNumerals.YA_MAP.has(p)) {
        throw new Error('Missing roman Symbol?');
      }
      // roman symbol defined
      const s = RomanNumerals.YA_MAP.get(p) || '';
      args = [RomanNumerals.YA_MAP.get(5 * p), s.repeat(num - 5)];            // ex. 70 => LXX
    }
    else {
      args = [RomanNumerals.YA_MAP.get(p), RomanNumerals.YA_MAP.get(10 * p)]; // ex. 90 => XC
    }
    roman = roman.concat(args.join(''))
    return roman;
  }
}

export default RomanNumerals
