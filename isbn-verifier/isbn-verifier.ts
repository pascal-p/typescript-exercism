class ISBN {
  static readonly LEN = 10;
  static readonly REXP = /^\d{9}[0-9X]$/;
  _isbn: string;


  constructor(isbn: string) {
    this._isbn = isbn
  }

  isValid() {
    if (this._isbn.length !== ISBN.LEN &&
      this._isbn.length !== ISBN.LEN + 3) { return false; }

    const isbn = this._isbn.replace(/\-/g, '');
    if (!ISBN.REXP.test(isbn)) { return false; }

    // assume well formed ISBN from this point
    let [sum, _t] = isbn.split('').reduce(
      ([s0, s1], ch) => {
        s1 += ch >= '0' && ch <= '9' ? parseInt(ch) : 10;
        s0 += s1;
        return [s0, s1];
      },
      [0, 0]
    );

    return sum % 11 === 0;
  }
}

export default ISBN;
