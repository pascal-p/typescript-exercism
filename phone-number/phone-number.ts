class PhoneNumber {
  static readonly PHONE_LEN = 11;                          // comprising prefix
  static readonly OPT_CHAR_RE = /^\+1|^1|\s+|\(|\)|\-/g;
  static readonly NON_ALLOWED_RE = /(?:[^0-9]+)/g;
  static readonly PH_NUM_RE = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  static readonly PUNCT_RE = /[!?\.,;:@_]/;
  static readonly LETTER_RE = /[a-b]/i;

  num: string | undefined;

  constructor(num: string) {
    /**
     * Area Code - 3 digits => leftist one from 2..9
     * Exch Code - 3 digits => leftist one from 2..9
     * Rest      - 4 digits
     */
    this.num = this.checkAndClean(num);
  }

  number() {
    return this.num;
  }

  private checkAndClean(num: string) {
    // 1. remove optional chars
    let ph_str: string | undefined = num.replace(PhoneNumber.OPT_CHAR_RE, '');

    // 2. check for non-allowed characters
    ph_str = this.check4NonAllowedChar(ph_str);
    if (!ph_str) return undefined;

    if (ph_str.length > PhoneNumber.PHONE_LEN - 1) {
      return undefined; // throw new Error('More than 11 digits');
    }

    ph_str = ph_str.replace(PhoneNumber.NON_ALLOWED_RE, '');
    if (ph_str.length < PhoneNumber.PHONE_LEN - 1) {
      return undefined; // throw new Error('Incorrect number of digits');
    }

    if (!ph_str.match(PhoneNumber.PH_NUM_RE)) { // Validation of Area + Exch codes
      if (!this.validAreaCode(ph_str)) return undefined;
      if (!this.validExchCode(ph_str)) return undefined;
      // assume correctness?
    }
    return ph_str;
  }

  private check4NonAllowedChar(ph_str: string): string | undefined {
    const ary = ph_str.match(PhoneNumber.NON_ALLOWED_RE);

    if (ary !== null && ary.length > 0) {             // Match on  non-allowed characters
      let pass = false
      if (ary.every((x) => x.match(/\./))) {          // if only dot => OK
        ph_str = ph_str.replace(PhoneNumber.NON_ALLOWED_RE, '');
        pass = true;
      }
      else if (ary.some((x) => x.match(PhoneNumber.PUNCT_RE))) {  // Punctuation case
        return undefined; // throw new Error('Punctuations not permitted');
      }
      else if (ary.some((x) => x.match(PhoneNumber.LETTER_RE))) { // Letters
        return undefined; //throw new Error('Letters not permitted');
      }
      if (!pass) {
        return undefined; // throw new Error("This phone number contains invalid characters");
      }
    }
    return ph_str;
  }

  private validAreaCode(ph_str: string): boolean {
    let flag = true
    if (ph_str.startsWith('0')) {
      flag = false; // throw new Error('Area code cannot start with zero');
    }
    else if (ph_str.startsWith('1')) {
      flag = false; // throw new Error('Area code cannot start with one');
    }
    return flag;
  }

  private validExchCode(ph_str: string): boolean {
    let flag = true
    if (ph_str.charAt(3) == '0') {
      flag = false; // throw new Error('Exchange code cannot start with zero');
    }
    else if (ph_str.charAt(3) == '1') {
      flag = false; // throw new Error('Exchange code cannot start with one');
    }
    return flag;
  }
}

export default PhoneNumber;
