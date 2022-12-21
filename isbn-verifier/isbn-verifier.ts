class ISBN {
  static readonly LEN = 10;
  static readonly REXP = /^\d{9}[0-9X]$/;
  _isbn: string;

  constructor(isbn: string) {
    this._isbn = isbn
  }

  isValid() {
    if (!this.validLen) return false;

    const isbn = this._isbn.replace(/\-/g, '');
    if (!this.onlyValidChars(isbn)) return false;

    // assume well formed ISBN from this point
    return this.sumDigits(isbn) % 11 === 0;
  }

  private validLen(): boolean {
    const isbn = this._isbn;
    return isbn.length === ISBN.LEN || isbn.length === ISBN.LEN + 3;
  }

  private onlyValidChars(isbn: string): boolean {
    return ISBN.REXP.test(isbn)
  }

  private sumDigits(isbn: string): number {
    const [sum, _] = isbn.split('').reduce(
      ([s0, s1], ch) => {
        s1 += ch >= '0' && ch <= '9' ? parseInt(ch) : 10;
        s0 += s1;
        return [s0, s1];
      },
      [0, 0]
    );
    return sum;
  }
}

export default ISBN;
