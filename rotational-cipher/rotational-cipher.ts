class RotationalCipher {
  static readonly AlphaLen = 26;
  static readonly SpaceOrPunctOrDigits = [' ', '\'', ',', '.', '?', '!', '"', ';', ':',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


  public static rotate(str: string, n: number): string {
    return str.split('').reduce(
      (cipher, ch) => cipher + RotationalCipher.rot(ch, n),
      ''
    );
  }

  private static rot(ch: string, n: number): string {
    let chCode;

    if (ch >= 'a' && ch <= 'z') {
      const aCode = 'a'.charCodeAt(0);
      chCode = aCode + (ch.charCodeAt(0) - aCode + n) % RotationalCipher.AlphaLen;
    }
    else if (ch >= 'A' && ch <= 'Z') {
      const aCode = 'A'.charCodeAt(0);
      chCode = aCode + (ch.charCodeAt(0) - aCode + n) % RotationalCipher.AlphaLen;
    }
    else if (RotationalCipher.SpaceOrPunctOrDigits.includes(ch)) {
      chCode = ch.charCodeAt(0);
    }
    else {
      throw new Error(`${ch} not in latin alphabet nor punctuation`)
    }

    return String.fromCharCode(chCode);
  }
}

export default RotationalCipher;
