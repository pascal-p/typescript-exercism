class Hamming {

  public compute(s1: string, s2: string): number {
    if (s1.length === 0 && s2.length > 0) {
      throw new Error('left strand must not be empty.');
    };
    if (s1.length > 0 && s2.length === 0) {
      throw new Error('right strand must not be empty.');
    };
    if (s1.length !== s2.length) {
      throw new Error('DNA strands must be of equal length.');
    };

    if (s1.length === 0) { return 0; };

    return Hamming.zip(s1, s2).
      map(([...args]) => args[0] === args[1] ? 0 : 1).
      reduce((t: number, v: number) => t + v, 0);
  }

  private static zip(a1: string | any[], a2: string | any[]) {
    // only deal with strings or arrays
    // does not allow mix array/string
    let ary = [];

    if ((typeof a1) === 'string' && (typeof a2) === 'string') {
      const s1 = String(a1); // Explicit conversion
      const s2 = String(a2);
      for (let ix = 0; ix < Math.min(s1.length, s2.length); ix++) {
        ary.push([s1.substr(ix, 1), s2.substr(ix, 1)]);
      };
    }
    else if (Array.isArray(a1) && Array.isArray(a2)) {
      for (let ix = 0; ix < Math.min(a1.length, a2.length); ix++) {
        ary.push([a1[ix], a2[ix]])
      };
    }
    else {
      throw new Error('Type not supported...');
    }
    return ary;
  }
}

export default Hamming;
