class AtbashCipher {
  static readonly Group_Fact = 5;
  static readonly CharCode: Map<string, number> = new Map([
    ['a', 'a'.charCodeAt(0)],
    ['z', 'z'.charCodeAt(0)]
  ]);
  static readonly Offset = 'a'.charCodeAt(0) + 'z'.charCodeAt(0);

  encode(input: string, enc = true): string {
    let s = ' ';

    for (const ch of input) {
      if (!ch.match(/[a-zA-Z0-9]/)) { continue; }

      s += (ch >= '0' && ch <= '9') ? ch :
        String.fromCharCode(AtbashCipher.Offset - ch.toLowerCase().charCodeAt(0));

      if (enc) {
        s += s.length % (AtbashCipher.Group_Fact + 1) === 0 ? ' ' : '';
      }
    }

    return s.trimStart().trimEnd();
  }

  decode(input: string): string {
    return this.encode(input, false);
  }
}

export default AtbashCipher;
