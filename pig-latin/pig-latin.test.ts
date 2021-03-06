import PigLatin from './pig-latin';

describe('ay is added to words that start with vowels', () => {
  it('word beginning with a', () => {
    const expected = 'appleay'
    expect(PigLatin.translate('apple')).toEqual(expected)
  })

  it('word beginning with e', () => {
    const expected = 'earay'
    expect(PigLatin.translate('ear')).toEqual(expected)
  })

  it('word beginning with i', () => {
    const expected = 'iglooay'
    expect(PigLatin.translate('igloo')).toEqual(expected)
  })

  it('word beginning with o', () => {
    const expected = 'objectay'
    expect(PigLatin.translate('object')).toEqual(expected)
  })

  it('word beginning with u', () => {
    const expected = 'underay'
    expect(PigLatin.translate('under')).toEqual(expected)
  })

  it('word beginning with a vowel and followed by a qu', () => {
    const expected = 'equalay'
    expect(PigLatin.translate('equal')).toEqual(expected)
  })
})

describe('first letter and ay are moved to the end of words that start with consonants', () => {
  it('word beginning with p', () => {
    const expected = 'igpay'
    expect(PigLatin.translate('pig')).toEqual(expected)
  })

  it('word beginning with k', () => {
    const expected = 'oalakay'
    expect(PigLatin.translate('koala')).toEqual(expected)
  })

  it('word beginning with x', () => {
    const expected = 'enonxay'
    expect(PigLatin.translate('xenon')).toEqual(expected)
  })

  it('word beginning with q without a following u', () => {
    const expected = 'atqay'
    expect(PigLatin.translate('qat')).toEqual(expected)
  })
})

describe('some letter clusters are treated like a single consonant', () => {
  it('word beginning with ch', () => {
    const expected = 'airchay'
    expect(PigLatin.translate('chair')).toEqual(expected)
  })

  it('word beginning with qu', () => {
    const expected = 'eenquay'
    expect(PigLatin.translate('queen')).toEqual(expected)
  })

  it('word beginning with qu and a preceding consonant', () => {
    const expected = 'aresquay'
    expect(PigLatin.translate('square')).toEqual(expected)
  })

  it('word beginning with th', () => {
    const expected = 'erapythay'
    expect(PigLatin.translate('therapy')).toEqual(expected)
  })

  it('word beginning with thr', () => {
    const expected = 'ushthray'
    expect(PigLatin.translate('thrush')).toEqual(expected)
  })

  it('word beginning with sch', () => {
    const expected = 'oolschay'
    expect(PigLatin.translate('school')).toEqual(expected)
  })
})

describe('position of y in a word determines if it is a consonant or a vowel', () => {
  it('y is treated like a consonant at the beginning of a word', () => {
    const expected = 'ellowyay'
    expect(PigLatin.translate('yellow')).toEqual(expected)
  })

  it('y as second letter in two letter word', () => {
    const expected = 'ymay'
    expect(PigLatin.translate('my')).toEqual(expected)
  })
})

describe('phrases are translated', () => {
  it('a whole phrase/1', () => {
    const expected = 'ickquay astfay unray'
    expect(PigLatin.translate('quick fast run')).toEqual(expected)
  })

  it('a whole phrase/2', () => {
    // hum... is this correct?
    const expected = 'ethay ickquay rownbay oxfay umpsjay overay ethay azylay ogday'
    expect(PigLatin.translate('the quick brown fox jumps over the lazy dog')).toEqual(expected)
  })
})
