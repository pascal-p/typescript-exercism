class DiffieHellman {
  readonly _p: number;
  readonly _g: number;

  constructor(p: number, g: number) {
    DiffieHellman.checkFactor(p);
    DiffieHellman.checkFactor(g);
    this._p = p;
    this._g = g;
  }

  getPublicKeyFromPrivateKey(privKey: number) {
    DiffieHellman.checkKey(privKey, this._p);
    return this._g ** privKey % this._p; // g ^ this._privKey % p;
  }

  getSharedSecret(privKey: number, pubKey: number) {
    DiffieHellman.checkKey(privKey, this._p);
    DiffieHellman.checkKey(pubKey, this._p, 'pub');
    return pubKey ** privKey % this._p;
  }

  private static checkKey(pKey: number, p: number, tag = 'priv'): void {
    if (pKey < 2 || pKey >= p) {
      throw new Error(`${tag} Key must be an integer >= 2`);
    }
  }

  private static checkFactor(f: number): void {
    if (f < 2 || !DiffieHellman.isPrime(f)) {
      throw new Error("factor must be a prime number >= 2");
    }
  }

  private static isPrime(p: number): boolean {
    if (p <= 1 || (p > 2 && p % 2 === 0)) return false;
    if (p <= 3) return true;
    if (p % 3 === 0) return false;

    const n = Math.floor(Math.sqrt(p));
    let [prime, cp] = [true, 5];
    while (cp < n) {
      if (p % cp === 0 || p % (cp + 2) === 0) return false;
      cp += 6;
    }
    return prime;
  }
}

export default DiffieHellman;
