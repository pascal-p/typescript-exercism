class ComplexNumber {
  readonly _re: number
  readonly _im: number

  constructor(real: number, imag: number) {
    this._re = real;
    this._im = imag;
  }

  get real() {
    return this._re;
  }

  get imag() {
    return this._im;
  }

  add(other: ComplexNumber) {
    return new ComplexNumber(this._re + other._re, this._im + other._im)
  }

  sub(other: ComplexNumber) {
    return new ComplexNumber(this._re - other._re, this._im - other._im)
  }

  div(other: ComplexNumber) {
    const [a, b] = this.to_tuple();
    const [c, d] = other.to_tuple();
    const den = c * c + d * d;
    const x = (a * c + b * d) / den;
    const y = (b * c - a * d) / den;
    return new ComplexNumber(x, y)
  }

  mul(other: ComplexNumber) {
    const [a, b] = this.to_tuple();
    const [c, d] = other.to_tuple();
    const x = (a * c - b * d);
    const y = (b * c + a * d);
    return new ComplexNumber(x, y)
  }

  get abs() {
    return Math.sqrt(this._re * this._re + this._im * this._im)
  }

  get conj() {
    return new ComplexNumber(this._re, this._im !== 0.0 ? -this._im : this._im)
  }

  get exp() {
    const a = Math.exp(this._re);
    const [x, y] = [Math.cos(this._im), Math.sin(this._im)];
    return new ComplexNumber(a * x, a * y)
  }

  to_tuple() {
    return [this._re, this._im]
  }

}

export default ComplexNumber;
