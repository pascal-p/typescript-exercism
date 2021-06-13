class MatchingBrackets {
  readonly _s: string;

  constructor(s: string) {
    this._s = s;
  }

  isPaired(): boolean {
    let stack: any[] = [];

    for (const ch of this._s.split('')) {

      if (ch.match(/^[\{\(\[]$/)) {
        stack.push(ch)
        continue;
      }

      if (ch.match(/^[\}\)\]]$/)) { // ch is a closing bracket
        if (stack.length === 0 ||
          MatchingBrackets.openingBracket(ch) !== stack[stack.length - 1]) return false;
        stack.pop();
        continue;
      }

      // any other case: ignore and continue
    }

    console.log(`Got stack: `, stack);
    return stack.length === 0;
  }

  private static openingBracket(ch: string) {
    if (ch === '}') return '{';
    if (ch === ')') return '(';
    if (ch === ']') return '[';

    throw new Error(`no opening bracket defined for ${ch}`);
  }

}

export default MatchingBrackets;
