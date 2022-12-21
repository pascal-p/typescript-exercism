interface IRational {
  abs(): Rational
  add(r: Rational): Rational
  sub(r: Rational): Rational
  mul(r: Rational): Rational
  div(r: Rational): Rational
  exprational(n: number): Rational
  expreal(n: number): number
}

type TRational = [num: number, den: number]

class Rational implements IRational {
  private _pair: TRational;

  constructor(num: number, den: number = 1) {
    if (den === 0) { throw new Error(`Denominator cannot be 0 (num: ${num}, den: ${den}`) }
    if (num === den) {
      this._pair = [1, 1];
      return;
    }
    this._pair = this.canonicalize(num, den);
  }

  get num(): number {
    return this._pair[0];
  }

  get den(): number {
    return this._pair[1];
  }

  abs(): Rational {
    return new Rational(Math.abs(this._pair[0]), Math.abs(this._pair[1]));
  }

  @checkArg
  add(r: Rational): Rational {
    return new Rational(this._pair[0] * r._pair[1] + r._pair[0] * this._pair[1], this._pair[1] * r._pair[1]);
  }

  @checkArg
  sub(r: Rational): Rational {
    return new Rational(this._pair[0] * r._pair[1] - r._pair[0] * this._pair[1], this._pair[1] * r._pair[1]);
  }

  @checkArg
  mul(r: Rational): Rational {
    return new Rational(this._pair[0] * r._pair[0], this._pair[1] * r._pair[1]);
  }

  @checkArg
  div(r: Rational): Rational {
    return new Rational(this._pair[0] * r._pair[1], this._pair[1] * r._pair[0]);
  }

  exprational(n: number): Rational {
    if (n === undefined ||
      (typeof n) !== 'number' ||
      Math.floor(n) !== n) { throw new Error("NaN or Not an Integer"); }

    if (n >= 0) {
      return new Rational(this._pair[0] ** n, this._pair[1] ** n);
    }

    n = Math.abs(n);
    return new Rational(this._pair[1] ** n, this._pair[0] ** n);
  }

  expreal(n: number, eps = 1e-12): number {
    if (n === undefined ||
      (typeof n) !== 'number') { throw new Error("NaN"); }

    const res = n ** (this._pair[0] / this._pair[1]);
    if (Math.abs(Math.ceil(Math.abs(res)) - Math.abs(res)) <= eps) {
      return Math.ceil(res);
    }
    return res;
  }

  reduce(): Rational {
    return this;  // identity
  }

  //
  // Helpers
  //
  private static divByGcd(num: number, den: number): number[] {
    let r = Rational.gcd(num, den);
    return [num / r, den / r];
  }

  private static gcd(num: number, den: number): number {
    let [num_, den_] = num < den ? [den, num] : [num, den];
    if (den_ === 0) { return num_; }
    let r = num_;
    while (r > 1) {
      r = num_ % den_;
      [num_, den_] = [den_, r];
    }
    return r === 0 ? num_ : r;
  }

  private canonicalize(num: number, den: number): TRational {
    const sign = (num >= 0 && den >= 0) || (num < 0 && den < 0) ? 1 : -1;
    [num, den] = [Math.abs(num), Math.abs(den)];
    const [n, d] = Rational.divByGcd(num, den);
    return [sign * n, d];
  }
}

/*
  Method Decorators

  Type annotation:

  type MethodDecorator = <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) => TypedPropertyDescriptor<T> | void;

  @Params:
    target: Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
    propertyKey: The name of the property.
    descriptor: The property descriptor for the member;

  @Returns:
    If returns a value, it will be used as the descriptor of the member.
 */

function checkArg(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function(...args: any) {
    const r = args[0];

    if (!r) { throw new Error("NaN"); }

    if (r instanceof Rational) {
      return original.call(this, ...args);
    }

    if ((typeof r) === 'number' && Math.floor(r) === r) {
      // we want an integer, not a real
      return original.call(this, new Rational(r, 1));
    }

    throw new Error("NaN");
  }
}

export default Rational;
