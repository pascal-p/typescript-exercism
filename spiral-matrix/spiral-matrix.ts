class SpiralMatrix {
  static _matrix: number[][] = [];

  static ofSize(n: number) {
    n = Math.trunc(n);
    if (n == 0) return [];

    SpiralMatrix._matrix = new Array(n);
    for (let ix = 0; ix < n; ix++) {
      SpiralMatrix._matrix[ix] = new Array(n);
    }

    let kx = 1;
    let [start, end] = [0, n - 2];
    if (end < 0) {
      SpiralMatrix._matrix[0][0] = 1;
      return SpiralMatrix._matrix;
    }

    while (true) {
      kx = SpiralMatrix.left2Right(start, end, kx);
      kx = SpiralMatrix.topBottom(start, end, kx);
      kx = SpiralMatrix.right2Left(start, end, kx);
      kx = SpiralMatrix.bottomUp(start, end, kx);

      // next
      start++;
      end--;
      if (end < 0) break;
    }

    if (n % 2 == 1) {  // when n is odd
      const m = n / 2 >> 0;
      SpiralMatrix._matrix[m][m] = kx;
    }

    return SpiralMatrix._matrix;
  }

  private static left2Right(start: number, end: number, kx: number) {
    for (let ix = start; ix <= end; ix++) {
      SpiralMatrix._matrix[start][ix] = kx++;
    }
    return kx;
  }

  private static right2Left(start: number, end: number, kx: number) {
    for (let ix = end + 1; ix > start; ix--) {
      SpiralMatrix._matrix[end + 1][ix] = kx++;
    }
    return kx;
  }

  private static topBottom(start: number, end: number, kx: number) {
    for (let ix = start; ix <= end; ix++) {
      SpiralMatrix._matrix[ix][end + 1] = kx++;
    }
    return kx;
  }

  private static bottomUp(start: number, end: number, kx: number) {
    for (let ix = end + 1; ix > start; ix--) {
      SpiralMatrix._matrix[ix][start] = kx++;
    }
    return kx;
  }
}

export default SpiralMatrix;
