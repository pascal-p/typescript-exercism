class Minesweeper {
  annotate(desc: string[]) {
    if (desc.length === 0) return desc;
    if (desc.length === 1 && desc[0].length === 0) return desc;

    if (desc.every(row => row.match(/^\*+$/))) return desc;
    if (desc.every(row => row.match(/^\s+$/))) return desc;

    let matrix = [];
    let ix = 0;
    for (const s of desc) {
      matrix.push([]);
      matrix[ix] = s.split('');
      ix++;
    }
    const m = matrix.length

    let res = []
    for (let ix = 0; ix < m; ix++) {
      let row = '';
      for (let jx = 0; jx < matrix[ix].length; jx++) {
        if (matrix[ix][jx] === '*') {
          row += '*';
          continue;
        }

        const n = this.numMines(matrix, ix, jx, m);
        if (n === 0) { row = row + ' '; }
        else {
          row += String(n);
        }
      }
      res.push(row);
    }

    return res;
  }

  private numMines(matrix: string[][], ix: number, jx: number, m: number) {
    let nm = 0;
    let rl = matrix[ix].length; // row length

    for (let rix = ix - 1; rix <= ix + 1; rix++) {
      if (rix < 0 || rix >= m) continue;

      for (let cjx = jx - 1; cjx <= jx + 1; cjx++) {
        if (cjx < 0 || cjx >= rl) continue;

        if (matrix[rix][cjx] === '*') nm += 1;
      }
    }
    return nm;
  }
}

export default Minesweeper;
