import Acronym from './acronym'

describe('Acronym are produced from', () => {
  it('title cased phrases', () => {
    expect(Acronym.parse('Portable Network Graphics')).toEqual('PNG')
  })

  it('other title cased phrases', () => {
    expect(Acronym.parse('Ruby on Rails')).toEqual('ROR')
  })

  it('inconsistently cased phrases', () => {
    expect(Acronym.parse('HyperText Markup Language')).toEqual('HTML')
  })

  it('phrases with punctuation', () => {
    expect(Acronym.parse('First In, First Out')).toEqual('FIFO')
  })

  it('other phrases with punctuation', () => {
    expect(Acronym.parse('PHP: Hypertext Preprocessor')).toEqual('PHP')
  })

  it('phrases with punctuation and sentence casing', () => {
    expect(Acronym.parse('Complementary metal-oxide semiconductor')).toEqual(
      'CMOS'
    )
  })

  it('long phrases', () => {
    expect(Acronym.parse('Rolling on the floor laughing so hard, that my dogs came over and licked me!'))
      .toEqual('ROTFLSHTMDCOALM');
  });

  it('phrases with consecutive delimiters', () => {
    expect(Acronym.parse('Something - I made up from thin air!!!')).toEqual('SIMUFTA');
  });

  it('phrases with apostrophes', () => {
    expect(Acronym.parse("Halley's Comet")).toEqual('HC');
  });

  it('phrases with underscore emphasis', () => {
    expect(Acronym.parse('The Road _Not_ Taken')).toEqual('TRNT');
  });

  it('series', () => {
    const spec = [
      ["Portable Network Graphics", "PNG"],
      ["Looks good to me", "LGTM"],
      ["Sounds 'good' to me", "SGTM"],
      ["Isn't it good", "IIG"],
      ["If and only if...", "IAOI"],
      ["Yet Another Funny Acronym", "YAFA"],
      ["Sometimes, it is necessary to raise an exception.", "SIINTRAE"],
      ["Last-in, first-out", "LIFO"],
      ["Oh my \"Gosh!\"", "OMG"],
      ["Functional Programming", "FP"],
      ["Imperative Programming", "IP"],
      ["Object oriented Programming", "OOP"],
      ["Differentiable Programming", "DP"],
      ["Cross-origin resource sharing", "CORS"]
    ]

    for (const [str, exp] of spec) {
      expect(Acronym.parse(str)).toEqual(exp);
    }
  })
})
