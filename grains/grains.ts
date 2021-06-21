class Grains {
  static tot: number = 0

  static square(n: number) {
    if (n > 64 || n <= 0) {
      throw new Error('Out of bounds');
    }

    return 2 ** (n - 1);
  }

  static total() {
    if (Grains.tot === 0) {
      Grains.tot = (2 ** 64) - 1;
    }
    return Grains.tot;
  }
}

export default Grains;
