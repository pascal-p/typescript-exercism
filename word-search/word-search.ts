export default class WordSearch {
  static readonly DIRS = [7, 0, 1, 6, -1, 2, 5, 4, 3]; // 8 directions
  // [7, 0, 1, 5, -1, 2, 6, 4, 3]; // 8 directions

  grid: string[];
  dim: number[];
  _match: any;

  constructor(grid: any[]) {
    if (grid.length === 0) {
      throw new Error('Empty grid')
    }
    this.grid = grid;
    this.dim = [grid.length, grid[0].length];
    this._match = undefined;
  }

  public find(words: string[]) {
    let result: Object = {};
    for (const word of words) {
      if (this.multiSearch(word, 0, 0, 0, -1)) {
        result = {
          ...result,
          ...this._match
        }
        this._match = undefined; // reset
      }
    }
    return result;
  }

  private multiSearch(word: string, ix: number, row: number, col: number, dir: number): boolean {
    for (let r = row; r < this.dim[0]; r++) {
      for (let c = col; c < this.dim[1]; c++) {
        if (word[ix] !== this.grid[r][c]) continue;

        // otherwise found a first match - check neighboring
        let matches = this.neighboringSearch(word, ix + 1, r, c);
        if (matches.length === 0) continue; // this first match was not confirmed

        // multiple matches to check
        ix++;
        if (typeof this._match === 'undefined') {
          this._match = {};
          this._match[word] = {
            start: [r + 1, c + 1],
            end: []
          }
        }

        for (let [rm, cm, dm] of matches) { // dm is the direction of the match
          if (dir !== -1 && dm !== dir) continue;

          // check if there is a full match in the given direction!
          if (this.checkMatchDir(word, ix, rm, cm, dm)) return true
        }
        // reset
        this._match = undefined;
        ix = 0;
        dir = -1;
      }
    }
    return false;
  }

  /*
    Directions as follows:

    | 7 | 0 | 1 |
    |---+---+---|
    | 6 |   | 2 |
    |---+---+---|
    | 5 | 4 | 3 |

   */
  private checkMatchDir(word: string, ix: number, row: number, col: number, dir: number): boolean {
    let jx = ix;
    const lim = word.length;
    let [frow, fcol] = [row, col];

    if (dir === 0) {
      for (let r = row; r >= 0; r--) {
        if (jx >= lim) break;
        if (word[jx] !== this.grid[r][col]) return false
        jx += 1;
        frow = r;
      }
    }
    else if (dir == 4) {
      for (let r = row; r < this.dim[0]; r++) {
        if (jx >= lim) break;
        if (word[jx] !== this.grid[r][col]) return false
        jx += 1;
        frow = r;
      }
    }
    else if (dir == 7) {
      for (let [r, c] = [row, col]; r >= 0 && c >= 0; r--, c--) {
        if (jx >= lim) break;
        if (word[jx] !== this.grid[r][c]) return false
        jx += 1;
        [frow, fcol] = [r, c];
      }
    }
    else if (dir == 3) {
      for (let [r, c] = [row, col]; r < this.dim[0] && c < this.dim[1]; r++, c++) {
        if (jx >= lim) break;
        if (word[jx] !== this.grid[r][c]) return false
        jx += 1;
        [frow, fcol] = [r, c];
      }
    }
    else if (dir == 6) {
      for (let c = col; c >= 0; c--) {
        if (word[jx] !== this.grid[row][c]) return false
        jx += 1;
        fcol = c;
      }
    }
    else if (dir == 2) {
      for (let c = col; c < this.dim[1]; c++) {
        if (jx >= lim) break;
        if (word[jx] !== this.grid[row][c]) return false
        jx += 1;
        fcol = c;
      }
    }
    else if (dir == 1) {
      for (let [r, c] = [row, col]; r >= 0 && c < this.dim[1]; r--, c++) {
        if (jx >= lim) break;
        if (word[jx] !== this.grid[r][c]) return false
        jx += 1;
        [frow, fcol] = [r, c];
      }
    }
    else if (dir == 5) {
      for (let [r, c] = [row, col]; r < this.dim[0] && c >= 0; r++, c--) {
        if (jx >= lim) break;
        if (word[jx] !== this.grid[r][c]) return false
        jx += 1;
        [frow, fcol] = [r, c];
      }
    }

    // conclusion
    if (jx === lim) {
      this._match[word].end = [frow + 1, fcol + 1];
      return true;
    }
    return false;
  }


  private neighboringSearch(word: string, ix: number, r0: number, c0: number) {
    let matches = [];
    let ix_dir = 0;
    for (let x = r0 - 1; x <= r0 + 1; x++) {
      if (x < 0 || x >= this.dim[0]) {
        ix_dir += 3;
        continue;
      }

      for (let y = c0 - 1; y <= c0 + 1; y++) {
        if (y < 0 || y >= this.dim[1]) { ix_dir++; continue; }
        if (x === r0 && y === c0) { ix_dir++; continue; }
        if (word[ix] === this.grid[x][y]) matches.push([x, y, WordSearch.DIRS[ix_dir]]);
        ix_dir++;
      }
    }

    return matches;
  }
}
