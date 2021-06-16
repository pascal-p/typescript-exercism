function transpose(rows: string[]): string[] {
  if (rows.length == 0) return [];

  const ncols = Math.max(...rows.map((s) => s.length));   // find longest row => ncols
  let transpose_m: string[] = [];                         // allocate...

  for (let ix = 0; ix < ncols; ix++) {                    // init each sub-array
    transpose_m[ix] = '';
  }

  for (let ix = 0; ix < ncols; ix++) {                    // fill in
    for (let row of rows) {
      if (rows[ix] !== null) {
        transpose_m[ix] = transpose_m[ix].concat(row[ix] === undefined ? " " : row[ix]);
      }
    }
  }
  transpose_m[ncols - 1] = String(transpose_m.slice(-1)).trimEnd(); // adjust
  return transpose_m;
}

export default transpose
