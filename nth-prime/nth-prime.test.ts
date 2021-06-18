import Prime from './nth-prime'

describe('Prime', () => {
  const prime = new Prime()

  it('first', () => {
    expect(prime.nth(1)).toEqual(2)
  })

  it('second', () => {
    expect(prime.nth(2)).toEqual(3)
  })

  it('sixth', () => {
    expect(prime.nth(6)).toEqual(13)
  })

  it('10th', () => {
    expect(prime.nth(10)).toEqual(29)
  })

  it('20th', () => {
    expect(prime.nth(20)).toEqual(71)
  })

  it('50th', () => {
    expect(prime.nth(50)).toEqual(229)
  })

  it('100th', () => {
    expect(prime.nth(100)).toEqual(541)
  })

  it('150th', () => {
    expect(prime.nth(150)).toEqual(863)
  })

  // 400	2741
  it('400th', () => {
    expect(prime.nth(400)).toEqual(2741)
  })

  // 499	3559
  it('499th', () => {
    expect(prime.nth(499)).toEqual(3559)
  })

  // 601	4421
  it('601th', () => {
    expect(prime.nth(601)).toEqual(4421)
  })

  // 700	5279
  it('700th', () => {
    expect(prime.nth(700)).toEqual(5279)
  })

  // 801	6143

  // 900	6997

  // 901	7001

  // 1000	7919
  it('1000th', () => {
    expect(prime.nth(1000)).toEqual(7919)
  })

  // 2000 17389
  it('2000th', () => {
    expect(prime.nth(2000)).toEqual(17389)
  })

  // 10000 104729
  it('10000th', () => {
    expect(prime.nth(10000)).toEqual(104729)
  })

  it('big prime', () => {
    expect(prime.nth(10001)).toEqual(104743)
  })

  it('weird case', () => {
    expect(() => prime.nth(0)).toThrowError('Prime is not possible')
  })
})
