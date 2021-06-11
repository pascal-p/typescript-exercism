class Pangram {
  static readonly LEN_ALPHA = 26;
  readonly str: string;

  constructor(str: string) {
    this.str = str;
  }

  public isPangram(): boolean {
    if (this.str.length === 0) return false;

    const lMap = this.str.split("").reduce((aMap: Map<string, number>, char) => {  //
      char = char.toLowerCase();
      if ('a' <= char && char <= 'z') {
        let v = aMap.get(char);
        if (typeof v === 'undefined') { v = 0; }
        aMap.set(char, v + 1);
      }
      return aMap;
    }, new Map<string, number>());

    return lMap.size === Pangram.LEN_ALPHA;
  }
}

export default Pangram;
