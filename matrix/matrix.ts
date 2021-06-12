class Matrix {
  matrix: number[][] = [];
  nrows: number;
  ncols: number;

  constructor(str: string) {
    this.matrix = str.split("\n").map(s => s.split(/\s+/).map(s => parseInt(s, 10)))
    this.nrows = this.matrix.length;
    this.ncols = this.matrix.reduce((max, row) => {
      max = Math.max(max, row.length);
      return max;
    }, 0);
  }

  get rows() {
    return this.matrix;
  }

  get columns() {
    // costly...
    let cols: number[][] = [];
    for (let cx = 0; cx < this.ncols; cx++) {
      cols.push([]);
      for (let rx = 0; rx < this.nrows; rx++) {
        cols[cx].push(this.matrix[rx][cx]);
      }
    }
    return cols;
  }

}

export default Matrix
