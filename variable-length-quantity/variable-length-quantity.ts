class VLQ {
  static readonly SHIFT = 7;
  static readonly MOD = 0x80;          // 128
  static readonly HEX = 16;
  static readonly ZERO = 0x00;
  static readonly SLIM = 2 ** 31 - 1;  // signed limit

  public static encode(vnum: number[]): number[] {
    if (vnum.length === 1 && vnum[0] <= (VLQ.MOD - 1)) return vnum

    let res: number[] = [];
    for (let n of vnum) {
      let ary = [];
      const lowerByte = n % VLQ.MOD;    // lower 8 byte (rightmost one) ==> zero-ed leftmost bit
      ary.push(lowerByte);

      let r = n >>> VLQ.SHIFT;          // divide (extract 7bits, unsigned right shift)...
      while (r > VLQ.ZERO) {            // until reaching 0
        ary.push(r % VLQ.MOD + VLQ.MOD) // set leftmost bit to 1
        r >>>= VLQ.SHIFT;
      }
      res.push(...ary.reverse());
    }

    return res;
  }

  public static decode(vnum: number[]): number[] {
    const slices = VLQ.extractSlices(vnum)

    let res = [];
    for (let slice of slices) {
      slice = slice.map(x => x & (VLQ.MOD - 1));
      let shift = -VLQ.SHIFT;

      let fn = (b: number) => {
        shift += VLQ.SHIFT;

        const r = b << shift
        if (r < 0) {          // bitwise operators are 32 bits bounded - limit 2 ** 31 -1
          shift -= VLQ.SHIFT;
          b <<= shift
          for (let ix = 0; ix < VLQ.SHIFT; ix++) {
            b *= 2;           // Arithmetic operators work on 64-bits values...
          }
          return b;
        }

        return r;
      }
      const ary = slice.reverse().map(fn);
      const s = ary.reduce((s, x) => s += x, VLQ.ZERO);
      res.push(s);
    }

    return res;
  }

  private static extractSlices(vnum: number[]) {
    let aOfAry: number[][] = [];
    let ary: number[] = [];

    for (let num of vnum) {
      if ((num & VLQ.MOD) >>> VLQ.SHIFT === VLQ.ZERO) {
        ary.push(num);
        aOfAry.push(ary);
        ary = [];
      }
      else {
        ary.push(num);
      }
    }

    if (ary.length > 0) {
      if (VLQ.getLast(ary) !== VLQ.ZERO) {
        throw new Error('Incomplete sequence');
      }
      aOfAry.push(ary);
    }

    return aOfAry;
  }

  private static getLast(ary: number[]) {
    const n = ary.length;
    if (n > 0) return ary[n - 1];
    throw new Error('Cannot get last element of an empty array');
  }

}

export default VLQ
