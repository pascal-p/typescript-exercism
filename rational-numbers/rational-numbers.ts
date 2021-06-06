interface IRational {
  _num: number;
  _den: number;

  abs(): Rational
  add(r: Rational): Rational
  sub(r: Rational): Rational
  mul(r: Rational): Rational
  div(r: Rational): Rational
  exprational(n: number): Rational
  expreal(n: number): number
}

class Rational implements IRational {
  _num: number;
  _den: number;

  constructor(num: number, den: number) {
    if (den === 0) { throw new Error(`Denominator cannot be 0 (num: ${num}, den: ${den}`) }

    if (num === den) {
      this._num = this._den = 1;
    }
    else {
      let sign = (num >= 0 && den >= 0) || (num < 0 && den < 0) ? 1 : -1;
      [num, den] = [Math.abs(num), Math.abs(den)];
      let [n, d] = Rational.divByGcd(num, den);
      this._num = sign * n;
      this._den = d;
    }
  }

  get num(): number {
    return this._num;
  }

  get den(): number {
    return this._den;
  }

  abs(): Rational {
    return new Rational(Math.abs(this._num), Math.abs(this._den));
  }

  // @checkArg
  add(r: Rational): Rational {
    r = Rational.checkArg(r);
    return new Rational(this._num * r._den + r._num * this._den, this._den * r._den);
  }

  sub(r: Rational): Rational {
    r = Rational.checkArg(r);
    return new Rational(this._num * r._den - r._num * this._den, this._den * r._den);
  }

  mul(r: Rational): Rational {
    r = Rational.checkArg(r);
    return new Rational(this._num * r._num, this._den * r._den);
  }

  div(r: Rational): Rational {
    r = Rational.checkArg(r);
    return new Rational(this._num * r._den, this._den * r._num);
  }

  exprational(n: number): Rational {
    if (n === undefined ||
      (typeof n) !== 'number' ||
      Math.floor(n) !== n) { throw new Error("NaN or Not an Integer"); }

    if (n >= 0) {
      return new Rational(this._num ** n, this._den ** n);
    }
    else {
      n = Math.abs(n);
      return new Rational(this._den ** n, this._num ** n);
    }
  }

  expreal(n: number, eps = 1e-12): number {
    if (n === undefined ||
      (typeof n) !== 'number') { throw new Error("NaN"); }

    const res = n ** (this._num / this._den);
    if (Math.abs(Math.ceil(Math.abs(res)) - Math.abs(res)) <= eps) {
      return Math.ceil(res);
    }
    return res;
  }

  reduce(): Rational {
    return this;  // identity
  }

  // Helpers

  private static divByGcd(num: number, den: number): number[] {
    let r = Rational.gcd(num, den);
    return [num / r, den / r];
  }

  private static gcd(num: number, den: number): number {
    [num, den] = num < den ? [den, num] : [num, den];

    if (den === 0) { return num; }

    let r = num;
    while (r > 1) {
      r = num % den;
      [num, den] = [den, r];
    }

    return r === 0 ? num : r;
  }

  private static checkArg(r: Rational | number) {
    if (r === undefined) { throw new Error("NaN"); }

    if (r instanceof Rational) {
      return r;
    }
    else if ((typeof r) === 'number' && Math.floor(r) === r) {
      // we want an integer, not a real
      return new Rational(r, 1);
    }
    else {
      throw new Error("NaN");
    }
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
    // console.log('params: ', ...args);
    const r = args[0];

    if (r === undefined) { throw new Error("NaN"); }

    if (r instanceof Rational) {
      // return r;
      return original.call(this, ...args);
    }
    else if ((typeof r) === 'number' && Math.floor(r) === r) {
      // we want an integer, not a real
      return original.call(this, new Rational(r, 1));
    }
    else {
      throw new Error("NaN");
    }
    // const result = original.call(this, ...args);
    // console.log('result: ', result);
    // return result;
  }
}


export default Rational;
