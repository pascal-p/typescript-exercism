/*
 * Rule 1: If a word begins with a vowel sound, add an "ay" sound to the end of the word.
   Please note that "xr" and "yt" at the beginning of a word make vowel sounds
   "xray" -> "xrayay", "yttria" -> "yttriaay".

 * Rule 2: If a word begins with a consonant sound, move it to the end of the word and then add an "ay" sound to the end of the word.
   Consonant sounds can be made up of multiple consonants, a.k.a. a consonant cluster
   "chair" -> "airchay").

 * Rule 3: If a word starts with a consonant sound followed by "qu", move it to the end of the word, and then add an "ay" sound to the end of the word
   "square" -> "aresquay".

 * Rule 4: If a word contains a "y" after a consonant cluster or as the second letter in a two letter word it makes a vowel sound (e.g. "rhythm" -> "ythmrhay", "my" -> "ymay").
 *
 */

class PigLatin {
  static readonly VowelsRExp = /^(?:a|e|i|o|u|xr|yr)/;
  static readonly ConsonnantRExp = /^(b|ch|c|d|f|g|h|j|k|l|m|n|o|ph|p|qu|q|r|rh|r|sch|sh|squ|s|thr|th|tr|t|v|w|x|y|z)/;

  public static translate(str: string): string {
    const res = str.split(/\s+/).map(s => {
      if (s.length === 0) return '';

      if (s.match(PigLatin.VowelsRExp)) {
        return s + 'ay';
      }

      const found = s.match(PigLatin.ConsonnantRExp);
      if (typeof found !== 'undefined' && found !== null) {
        const p = found[0];
        return s.slice(p.length, s.length) + p + 'ay';
      }

      throw new Error(`problem with: ${str} / <${s}> - found: ${found}`);
    })

    return res.join(' ');
  }
}

export default PigLatin;
