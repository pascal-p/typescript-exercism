class Isogram {
  static isIsogram(str: string): boolean {
    // build a frequency map - check than all values are 1
    let d = new Map();

    for (let ix = 0; ix < str.length; ix++) {
      let ch = str[ix].toLowerCase();
      if ('a' <= ch && ch <= 'z') {
        if (d.has(ch)) {
          return false; // no point going on...
        }
        else {
          d.set(ch, 1);
        }
      }
    }
    const vals = [...d.values()];
    return vals.every((x) => x === 1);
  }
}

export default Isogram
