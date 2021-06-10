class Square {
  // keep in mind: integer overflow
  n: number

  constructor(n: number) {
    this.n = Math.trunc(n); // only integers
  }

  get sumOfSquares() {
    // 1² + 2² + 3² + ... + n² ≡ (n × (n + 1) × (2n + 1)) / 6
    const x1 = this.n;
    const x2 = this.n + 1; // x1 + 1;
    const x3 = (this.n << 1) + 1;
    const x = (x1 * x2 * x3) >> 1;
    return x / 3 >> 0;          // integer
  }

  get squareOfSum() {
    // sum(1:n)^2 ≡ (n × (n + 1) / 2)²
    const x1 = this.n;
    const x2 = this.n + 1; // x1 + 1;
    const x = (x1 * x2) >> 1;
    return x * x;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }

}

export default Square
