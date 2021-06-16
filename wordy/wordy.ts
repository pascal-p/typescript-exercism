/*
  Extension: we will admit question of the following form:
  - What is 2 raised to the 5th power? 32
  - What is 5 raised to the 2nd power? 25
  - What is 5 raised to the 0th power? 1
  - What is 5 raised to the 3rd power? 125
  - What is 2 raised to the 16th power? 65536
  - What is 3 plus 2 raised to the 16th power?  5**16 == 152587890625
 */

export class WordProblem {
  static readonly BinaryOps = ['plus', 'minus', 'divided', 'multiplied', 'raised'];
  static readonly UnaryOps = ['squared', 'cubed', 'logarithm'];

  _question: string
  _answer: number | undefined

  constructor(question: string) {
    if (!question.match(/^what is /i)) {
      this._question = question;
      this._answer = undefined;
    }
    else {
      this._question = question.replace(/\?/, ''); // punctuation - at the moment only ?
      this._answer = this.solve()
    }
  }

  answer() {
    if (typeof this._answer === 'undefined') {
      throw new ArgumentError();
    }
    return this._answer;
  }

  private solve(): number {
    let tokens: string[] = this._question.split(/\s+/);
    tokens = tokens.splice(2, tokens.length);

    let operand_stack: number[] = [];
    let operator_stack: string[] = [];

    for (const token of tokens) {
      const m = token.match(/^(\d+)|^(\-\d+)/)
      if (m !== null) { // starts with digit => treat it as operand
        if (operand_stack.length < 1) operand_stack.push(parseInt(m[0], 10));
        else {
          if (operator_stack.length === 0) { throw new Error('Expression is not well formed') }
          operand_stack.push(parseInt(m[0], 10));
          this.calculate(operator_stack.pop() || '', operand_stack);
        }
      }
      else if (WordProblem.BinaryOps.indexOf(token.toLowerCase()) !== -1) {
        operator_stack.push(token);
      }
      else if (WordProblem.UnaryOps.indexOf(token.toLowerCase()) !== -1) {
        this.ucalculate(token, operand_stack);
      }

      // else ignore
    }
    if (operand_stack.length === 0) { throw new Error('Expression is not well formed') }
    return operand_stack.pop() || 0;
  }

  private calculate(operator: string, operand_stack: number[]) {
    if (operator === 'plus') {
      const v: number = operand_stack.pop() || 0;
      operand_stack[0] += v;
    }
    else if (operator === 'minus') {
      const v: number = operand_stack.pop() || 0;
      operand_stack[0] -= v;
    }
    else if (operator === 'multiplied') {
      const v: number = operand_stack.pop() || 0;
      operand_stack[0] *= v;
    }
    else if (operator === 'divided') {
      const v: number = operand_stack.pop() || 1;
      operand_stack[0] /= v >> 0;
    }
    else if (operator === 'raised') {
      const v: number = operand_stack.pop() || 0; // careful with falsey...
      operand_stack[0] **= v;
    }
    else {
      throw new ArgumentError();
    }
  }

  private ucalculate(operator: string, operand_stack: number[]) {
    // unary operator
    const top = operand_stack.length - 1;

    if (operator === 'squared') {
      operand_stack[top] = operand_stack[top] ** 2;
    }
    else if (operator === 'cubed') {
      operand_stack[top] = operand_stack[top] ** 3;
    }
    else if (operator === 'logarithm') {
      operand_stack[top] = Math.log(operand_stack[top]);
    }
    else {
      throw new ArgumentError();
    }
  }
}

export class ArgumentError { }
