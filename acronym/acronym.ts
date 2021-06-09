class Acronym {
  public static parse(phrase: string): string {
    if (phrase.length === 0) { return ""; }

    const tokens = phrase.split(/[\s!\?,\.:;\(\)\[\]\{\}%@\"\/\\<>#_\-]+/).
      map(t => t.replace("'", '').replace('"', '')).
      filter(t => t.length !== 0);

    return tokens.map(t => Acronym.firstLetter(t)).join('');
  }

  private static firstLetter(word: string): string {
    // if word contains only uppercase letters then only take first char.
    if (word.match(/^[A-Z]+$/)) {
      return word[0];
    }
    const nWord = word[0].toUpperCase() + word.slice(1, word.length - 1);
    if ('A' <= nWord[0] && nWord[0] <= 'Z')
      return nWord.split(/[a-z]/).join('');
    else {
      throw new Error('Unexpected character - expecting leter in [a..z] or [A..Z]');
    }
  }
}

export default Acronym;
