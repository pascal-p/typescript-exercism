class NucleotideCount {
  static readonly DNA = {
    A: 0,
    C: 0,
    G: 0,
    T: 0
  };

  static nucleotideCounts(str: string): object {
    if (str.length === 0) return NucleotideCount.DNA;

    if (!str.match(/^[ACGT]+$/)) {
      throw new Error('Invalid nucleotide in strand');
    }

    return str.split("").map(s => s.toUpperCase())
      .reduce((obj: any, letter) => {
        obj[letter] += 1;
        return obj;
      }, { ...NucleotideCount.DNA })
  }
}

export default NucleotideCount;
