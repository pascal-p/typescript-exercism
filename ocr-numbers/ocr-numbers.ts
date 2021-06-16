export default class OcrParser {
  static readonly N = 4;  // 4 rows
  static readonly M = 3   // 3 cols

  static readonly DIGIT_MAP = new Map([
    [' _ \n' +
      '| |\n' +
      '|_|\n' +
      '   ', 0],
    ['   \n' +
      '  |\n' +
      '  |\n' +
      '   ', 1],
    [' _ \n' +
      ' _|\n' +
      '|_ \n' +
      '   ', 2],

    [' _ \n' +
      ' _|\n' +
      ' _|\n' +
      '   ', 3],
    ['   \n' +
      '|_|\n' +
      '  |\n' +
      '   ', 4],
    [' _ \n' +
      '|_ \n' +
      ' _|\n' +
      '   ', 5],

    [' _ \n' +
      '|_ \n' +
      '|_|\n' +
      '   ', 6],
    [' _ \n' +
      '  |\n' +
      '  |\n' +
      '   ', 7],
    [' _ \n' +
      '|_|\n' +
      '|_|\n' +
      '   ', 8],

    [' _ \n' +
      '|_|\n' +
      ' _|\n' +
      '   ', 9]
  ]);

  static convert(str: string) {
    const ary = str.split("\n");

    if (ary.length % OcrParser.N != 0) { // array length should be a mutilple of 4
      throw new Error(`Incorrect input size - num. of rows should be multiple of ${OcrParser.N}`);
    }

    if (ary.some((row) => row.length % OcrParser.M != 0)) {
      throw new Error(`Incorrect input size - num. of cols should be multiple of ${OcrParser.M}`);
    }

    if (OcrParser.DIGIT_MAP.has(str)) {
      return String(OcrParser.DIGIT_MAP.get(str));
    }

    return OcrParser._convert(ary);
  }

  private static _convert(ary: string[]) {
    const [n, m] = [ary.length / OcrParser.N >> 0, ary[0].length / OcrParser.M >> 0];

    if (n == 1 && m == 1) { // we have a problem with the input
      return "?";
    }

    // n >= 1 || m >= 1
    const p = n * m;
    let digits = new Array(p);
    for (let g = 0; g < p; g++) {
      digits[g] = new Array();
    }

    let offset = 0;
    for (let r = 0; r < ary.length; r++) { // [0, N[, [N..2N[, ...
      if (r > 0 && r % OcrParser.N == 0) offset += OcrParser.M;

      for (let g = 0; g < m; g++) {        // 0..m[==3]
        digits[g + offset].push(ary[r].slice(g * OcrParser.M, (g + 1) * OcrParser.M));
      }
    }

    let result = "";
    for (let g = 0; g < p; g++) {
      if (n > 1 && g > 0 && g % OcrParser.M == 0) { result = result.concat(","); }

      const str = digits[g].join("\n");
      if (OcrParser.DIGIT_MAP.has(str)) {
        result = result.concat(String(OcrParser.DIGIT_MAP.get(str)));
      }
      else {
        result = result.concat("?");
      }
    }
    return result;
  }
}
