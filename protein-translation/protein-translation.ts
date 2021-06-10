class ProteinTranslation {
  static readonly COD_PRO: Map<string, string> = new Map([
    ['AUG', 'Methionine'],
    ['UUU', 'Phenylalanine'], ['UUC', 'Phenylalanine'],
    ['UUA', 'Leucine'], ['UUG', 'Leucine'],
    ['UCU', 'Serine'], ['UCC', 'Serine'], ['UCA', 'Serine'], ['UCG', 'Serine'],
    ['UAU', 'Tyrosine'], ['UAC', 'Tyrosine'],
    ['UGU', 'Cysteine'], ['UGC', 'Cysteine'],
    ['UGG', 'Tryptophan'],
    ['UAA', 'STOP'], ['UAG', 'STOP'], ['UGA', 'STOP']
  ]);
  static readonly LEN_COD = 3;

  public static proteins(strand: string): string[] | undefined {
    if (strand.length % 3 !== 0) { throw new Error("Invalid codon"); }

    strand = strand.toUpperCase();

    if (strand.length == ProteinTranslation.LEN_COD) {
      const val = ProteinTranslation.getValue(strand);
      return val === undefined ? [] : [val];
    }

    let proteins = [];
    for (let ix = 0; ix <= strand.length - ProteinTranslation.LEN_COD; ix += ProteinTranslation.LEN_COD) {
      const key = strand.slice(ix, ix + ProteinTranslation.LEN_COD);
      const val = ProteinTranslation.getValue(key);
      if (val === undefined) { return proteins; }
      proteins.push(val);
    }
    return proteins;
  }

  private static getValue(key: string) {
    if (ProteinTranslation.COD_PRO.has(key)) {
      let val = ProteinTranslation.COD_PRO.get(key);
      return val === 'STOP' ? undefined : val;
    }
    throw new Error("Invalid codon"); // Not such CODON in our base (yet)    
  }
}

export default ProteinTranslation
