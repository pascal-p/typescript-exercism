const N: number = 8;

interface IQueenSpec {
  white?: number[];
  black?: number[];
}

class Point {
  readonly _x: number;
  readonly _y: number;

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  public get coord(): number[] {
    return [this._x, this._y];
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public eq(p: Point): boolean {
    return this._x === p._x && this._y === p._y;
  }
}

class QueenAttack {
  _white: Point;
  _black: Point;

  constructor(queenSpec?: IQueenSpec) {
    queenSpec = queenSpec || { white: [7, 3], black: [0, 3] };

    const white = queenSpec.white === undefined ? [7, 3] : queenSpec.white;
    const black = queenSpec.black === undefined ? [0, 3] : queenSpec.black;

    this.checkCoord(white[0], white[1]);
    this.checkCoord(black[0], black[1]);

    this._white = new Point(...white);
    this._black = new Point(...black);

    if (this.sameCoord()) {
      throw new Error('Queens cannot share the same space');
    }
    // All good
  }

  public get white(): Array<number> {
    return this._white.coord;
  }

  public get black(): Array<number> {
    return this._black.coord;
  }

  public canAttack(): boolean {
    if (typeof (this._black) === 'undefined' || typeof (this._white) === 'undefined') return false;

    // same row || same col || same diag
    return (this._white.x === this._black.x || this._white.y === this._black.y ||
      Math.abs(this._white.x - this._black.x) === Math.abs(this._white.y - this._black.y))
  }

  public toString(): string {
    let m: string[][] = [];
    for (let ix = 0; ix < N; ix++) {
      m[ix] = [];
      for (let jx = 0; jx < N; jx++) {
        m[ix].push('_ ');
      }
      m[ix][m[ix].length - 1] = m[ix][m[ix].length - 1].replace(' ', '');
    }

    // position white queen (if defined):
    if (typeof this._white !== 'undefined') {
      const [r, c] = this.white;
      m[r][c] = c == N - 1 ? 'W' : 'W ';
    }

    // position black queen (if defined):
    if (typeof this._black !== 'undefined') {
      const [r, c] = this.black;
      m[r][c] = c == N - 1 ? 'B' : 'B ';
    }

    let a = [];
    for (let ix = 0; ix < N; ix++) {
      a.push(m[ix].join(''))
    }

    return a.join('\n');
  }

  private sameCoord(): boolean {
    return this._white.eq(this._black);
  }

  private checkCoord(x: number, y: number) {
    if (x < 0 || x >= N) {
      throw new Error('Queen must be placed on the board');
    }

    if (y < 0 || y >= N) {
      throw new Error('Queen must be placed on the board');
    }
  }
}

export default QueenAttack;
