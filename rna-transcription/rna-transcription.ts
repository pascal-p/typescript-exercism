class Transcriptor {
  static readonly MAP_DNA_RNA: Map<string, string> = new Map([
    ['A', 'U'],
    ['C', 'G'],
    ['G', 'C'],
    ['T', 'A'],
  ]);

  toRna(dna: string): string {
    if (dna.length == 0) { return ""; };
    return dna.toUpperCase().split('').map((ch) => this.transcribe(ch)).join('');
  }

  private transcribe(ch: string): string {
    const nch: string | undefined = Transcriptor.MAP_DNA_RNA.get(ch)
    if (nch === undefined) throw new Error('Invalid input DNA.');
    return nch;
  }
}

export default Transcriptor
