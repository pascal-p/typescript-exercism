import Squares from './difference-of-squares'

describe('Squares', () => {
  describe('up to 5', () => {
    const squares = new Squares(5)

    it('gets the square of sum', () => {
      expect(squares.squareOfSum).toBe(225)
    })

    it('gets the sum of squares', () => {
      expect(squares.sumOfSquares).toBe(55)
    })

    it('gets the difference', () => {
      expect(squares.difference).toBe(170)
    })
  })

  describe('up to 10', () => {
    const squares = new Squares(10)

    it('gets the square of sum', () => {
      expect(squares.squareOfSum).toBe(3025)
    })

    it('gets the sum of squares', () => {
      expect(squares.sumOfSquares).toBe(385)
    })

    it('gets the difference', () => {
      expect(squares.difference).toBe(2640)
    })
  })

  describe('up to 100', () => {
    const squares = new Squares(100)

    it('gets the square of sum', () => {
      expect(squares.squareOfSum).toBe(25502500)
    })

    it('gets the sum of squares', () => {
      expect(squares.sumOfSquares).toBe(338350)
    })

    it('gets the difference', () => {
      expect(squares.difference).toBe(25164150)
    })
  })

  describe('extrem...1', () => {
    const squares = new Squares(10_000)

    it('square of sum 10_000', () => {
      expect(squares.squareOfSum).toBe(2500500025000000);
    });
  })

  /*
  describe('extrem...2', () => {
    const squares = new Squares(100_000)
    // overflow: finds 497141619479951600
    it('square of sum 100_000', () => {
      expect(squares.squareOfSum).toBe(6553755928790448384);
    });
  })

  describe('extrem...3', () => {
    const squares = new Squares(500_000)
    // overflow - finds 199093026440909060
    it('square of sum 500_000', () => {
      expect(squares.squareOfSum).toBe(15625062500062500000000);

      // 15625062500062500000000 becomes a float: 1.56250625000625e+22
    });
  })
  */

})
