export type Optional<T> = T | undefined;

const ALPHA: string = "abcdefghijklmnopqrstuvwxyz";
const LEN_ALPHA: number = ALPHA.length;

const getRandomInt = (min: number = 0, max: number = LEN_ALPHA) => Math.floor(Math.random() * (max - min) + min);

const check = (input: string): void => {
  if (!input.match(/^[a-z]+$/)) { throw new Error('Expecting only Latin lower case characters'); }
}

type Pair = [number, number];

class SimpleCipher {
  // { a → 0, b → 1, c → 2, d → 3, e → 4, ... }
  private static HSH: Map<string, number> =
    ALPHA.split('').reduce((hsh, ch, ix) => hsh.set(ch, ix), new Map());

  // { 0 → "a", 1 → "b", 2 → "c", 3 → "d", 4 → "e", ... }
  private static REV_HSH: Map<number, string> =
    [...SimpleCipher.HSH.entries()].reduce((hsh, [k, v]) => hsh.set(v, k), new Map());

  readonly key: string;
  readonly keyLen: number;

  constructor(key?: Optional<string>) {
    if (typeof key === 'undefined') {
      key = '';
      for (let ix = 0; ix < 100; ix++) {
        key += SimpleCipher.REV_HSH.get(getRandomInt());
      }
    }
    else {
      check(key);
    }
    this.key = key.toLowerCase();
    this.keyLen = this.key.length;
  }

  encode(plain: string, canThrow: boolean = true): string {
    if (canThrow) { check(plain); }
    return this.transcode(plain, this.transFn.bind(this));
  }

  decode(ciphered: string, canThrow: boolean = true): string {
    if (canThrow) { check(ciphered); }
    return this.transcode(ciphered, this.revTransFn.bind(this));
  }

  //
  // internal helpers
  //
  private transcode(input: string, fn: (_s: string, _n: number) => number): string {
    // input can contains non latin chars that we ignore...
    return input.toLowerCase().split("")
      .filter((ch: string) => ch.match(/[a-z]/))
      .map((ch: string, ix: number) => SimpleCipher.REV_HSH.get(fn(ch, ix)))
      .join('');
  }

  private getIndex(ch: string, ix: number): Pair {
    const och = this.key.charAt(ix % this.keyLen);
    const kx = (SimpleCipher.HSH.has(ch) ? SimpleCipher.HSH.get(ch) : -1) as number;
    const jx = (SimpleCipher.HSH.has(och) ? SimpleCipher.HSH.get(och) : -1) as number;
    if (kx == -1 || jx == -1) {
      throw new Error('key undefined'); // ch or och
    }
    return [kx, jx];
  }

  private revTransFn(ch: string, ix: number): number {
    let [kx, jx] = this.getIndex(ch, ix);
    jx = kx - jx;
    jx = jx < 0 ? LEN_ALPHA + jx : jx;
    return jx % LEN_ALPHA;
  }

  private transFn(ch: string, ix: number): number {
    const [kx, jx] = this.getIndex(ch, ix);
    return (jx + kx) % LEN_ALPHA;
  }
}

export default SimpleCipher
