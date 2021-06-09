class Anagram {
  _word: string;
  _repr: string;

  constructor(word: string) {
    this._word = word;
    this._repr = Anagram.canonicalRepr(word);
  }

  public matches(...args: string[]) {
    return args.map((w: string) => [Anagram.canonicalRepr(w), w]).
      filter(([cw, w]) => cw === this._repr && w.toLowerCase() !== this._word).
      map(([_cw, w]) => w);
  }

  private static canonicalRepr(word: string): string {
    return word.toLowerCase().split('').sort().join('');
  }
}

export default Anagram;
