import Crypto from './crypto-square'

describe('Crypto', () => {
  it('normalize strange characters', () => {
    const crypto = new Crypto('s#$%^&plunk')
    expect(crypto.normalizePlaintext()).toEqual('splunk')
  })

  it('normalize numbers', () => {
    const crypto = new Crypto('1, 2, 3 GO!')
    expect(crypto.normalizePlaintext()).toEqual('123go')
  })

  it('size of small square', () => {
    const crypto = new Crypto('1234')
    expect(crypto.size()).toEqual(2)
  })

  it('size of small square with additional non-number chars', () => {
    const crypto = new Crypto('1 2 3 4')
    expect(crypto.size()).toEqual(2)
  })

  it('size of slightly larger square', () => {
    const crypto = new Crypto('123456789')
    expect(crypto.size()).toEqual(3)
  })

  it('size of non-perfect square/1', () => {
    const crypto = new Crypto('123456789abc')
    expect(crypto.size()).toEqual(4)
  })

  it('size of non-perfect square/2', () => {
    const crypto = new Crypto('1234567890abc')
    expect(crypto.size()).toEqual(4)
  })

  it('size of non-perfect square/3', () => {
    const crypto = new Crypto('1234567890abcd')
    expect(crypto.size()).toEqual(4)
  })

  it('size of non-perfect square/4', () => {
    const crypto = new Crypto('1234567890abcdefg')
    expect(crypto.size()).toEqual(5)
  })

  it('plain text segments', () => {
    const crypto = new Crypto('Never vex thine heart with idle woes')
    expect(crypto.plaintextSegments()).toEqual([
      'neverv',
      'exthin',
      'eheart',
      'withid',
      'lewoes',
    ])
  })

  it('plain text segments', () => {
    const crypto = new Crypto('ZOMG! ZOMBIES!!!')
    expect(crypto.plaintextSegments()).toEqual(['zomg', 'zomb', 'ies ']) // added a space for last word?
  })

  it('plain text segments/2', () => {
    const crypto = new Crypto('If man was meant to stay on the ground, god would have given us roots.')
    expect(crypto.plaintextSegments()).toEqual([
      "ifmanwas",
      "meanttos",
      "tayonthe",
      "groundgo",
      "dwouldha",
      "vegivenu",
      "sroots  ",
    ])
  })

  it('cipher text/1', () => {
    const crypto = new Crypto('Time is an illusion. Lunchtime doubly so.')
    expect(crypto.ciphertext()).toEqual('tasneyinicdsmiohooelntuillibsuuml')
  })

  it('cipher text/2', () => {
    const crypto = new Crypto('We all know interspecies romance is weird.')
    expect(crypto.ciphertext()).toEqual('wneiaweoreneawssciliprerlneoidktcms')
  })

  it('cipher text/3', () => {
    const crypto = new Crypto('If man was meant to stay on the ground, god would have given us roots.')
    expect(crypto.ciphertext()).toEqual('imtgdvsfearwermayoogoanouuiontnnlvtwttddesaohghnsseoau')
  })

  // decoding
  it('decipher text/1', () => {
    const crypto = new Crypto('');
    expect(crypto.decode('imtgdvsfearwermayoogoanouuiontnnlvtwttddesaohghnsseoau'))
      .toEqual('if man was meant to stay on the ground god would have given us roots'.replace(/\s+/g, ''))
  })

  it('cipher text/2', () => {
    const crypto = new Crypto('');
    expect(crypto.decode('wneiaweoreneawssciliprerlneoidktcms')).toEqual('we all know interspecies romance is weird'.replace(/\s+/g, ''))
  })

  it('cipher text/3', () => {
    const crypto = new Crypto('');
    expect(crypto.decode('tasneyinicdsmiohooelntuillibsuuml')).toEqual('time is an illusion lunchtime doubly so'.replace(/\s+/g, ''))
  })

})
