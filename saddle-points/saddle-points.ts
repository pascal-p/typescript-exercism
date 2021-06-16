class SaddlePoints {
  static saddlePoints(matrix: number[][]) {
    if (matrix.length == 0 || (matrix.length == 1 && matrix[0].length == 0)) {
      return [];
    }

    let spoints = [];
    let [nrows, ncols] = [matrix.length, matrix[0].length];

    for (let ix = 0; ix < nrows; ix++) {
      for (let jx = 0; jx < ncols; jx++) {
        let isSaddlePoint = true; // assume matrix[ix][jx] is a saddle point (by default)

        // check current row
        for (let rjx = 0; rjx < ncols; rjx++) {
          if (rjx == jx) continue;

          if (matrix[ix][rjx] > matrix[ix][jx]) {
            isSaddlePoint = false;
            break;
          }
        }

        if (isSaddlePoint) {
          // check current col
          for (let rix = 0; rix < nrows; rix++) {
            if (rix == ix) continue;

            if (matrix[rix][jx] < matrix[ix][jx]) {
              isSaddlePoint = false;
              break;
            }
          }
        }

        if (isSaddlePoint) {
          spoints.push({ row: ix + 1, column: jx + 1 })
        }
      }
    }
    return spoints;
  }
}

export default SaddlePoints
