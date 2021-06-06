import QueenAttack from './queen-attack'

describe('Queens', () => {
  it('initialized with specific placement', () => {
    const queens = new QueenAttack({ white: [3, 7], black: [6, 1] })
    expect(queens.white).toEqual([3, 7])
    expect(queens.black).toEqual([6, 1])
  })

  it('queen must have positive row', () => {
    const positioning: { black: [number, number]; white: [number, number] } = {
      black: [-2, 4],
      white: [2, 4],
    }
    const expectedError = 'Queen must be placed on the board'
    expect(() => new QueenAttack(positioning)).toThrow(expectedError)
  })

  it('queen must have row on the board', () => {
    const positioning: { white: [number, number] } = {
      white: [8, 4],
    }
    const expectedError = 'Queen must be placed on the board'
    expect(() => new QueenAttack(positioning)).toThrow(expectedError)
  })

  it('cannot occupy the same space', () => {
    const positioning: { black: [number, number]; white: [number, number] } = {
      black: [2, 4],
      white: [2, 4],
    }
    const expectedError = 'Queens cannot share the same space'
    expect(() => new QueenAttack(positioning)).toThrow(expectedError)
  })

  it('toString representation', () => {
    const positioning: { black: [number, number]; white: [number, number] } = {
      white: [2, 4],
      black: [6, 6],
    }
    const queens = new QueenAttack(positioning)
    const board = [
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ W _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ B _',
      '_ _ _ _ _ _ _ _',
    ].join('\n')
    expect(queens.toString()).toEqual(board)
  })

  it('board with queens at their starting positions', () => {
    const queens = new QueenAttack();
    const board = [
      '_ _ _ B _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ W _ _ _ _',
    ].join('\n');
    expect(queens.toString()).toEqual(board);
  })

  it('board with the black queen at her starting positions', () => {
    const queens = new QueenAttack({ white: [1, 6] });
    const board = [
      '_ _ _ B _ _ _ _',
      '_ _ _ _ _ _ W _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
    ].join('\n');
    expect(queens.toString()).toEqual(board);
  });

  it('board with queens at the edges', () => {
    const positioning = { white: [0, 0], black: [7, 7] };
    const queens = new QueenAttack(positioning);
    const board = [
      'W _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ _',
      '_ _ _ _ _ _ _ B',
    ].join('\n');
    expect(queens.toString()).toEqual(board);
  });

  it('queens cannot attack', () => {
    const queens = new QueenAttack({ white: [2, 3], black: [4, 7] })
    expect(queens.canAttack()).toEqual(false)
  })

  it('queens can attack when they are on the same row', () => {
    const queens = new QueenAttack({ white: [2, 4], black: [2, 7] })
    expect(queens.canAttack()).toEqual(true)
  })

  it('queens can attack when they are on the same column', () => {
    const queens = new QueenAttack({ white: [5, 4], black: [2, 4] })
    expect(queens.canAttack()).toEqual(true)
  })

  it('queens can attack diagonally', () => {
    const queens = new QueenAttack({ white: [1, 1], black: [6, 6] })
    expect(queens.canAttack()).toEqual(true)
  })

  it('queens can attack another diagonally', () => {
    const queens = new QueenAttack({ white: [0, 6], black: [1, 7] })
    expect(queens.canAttack()).toEqual(true)
  })

  it('queens can attack yet another diagonally', () => {
    const queens = new QueenAttack({ white: [4, 1], black: [6, 3] })
    expect(queens.canAttack()).toEqual(true)
  })

  it('queens can attack on a north-east/south-west diagonal', () => {
    const queens = new QueenAttack({ white: [7, 0], black: [0, 7] })
    expect(queens.canAttack()).toEqual(true)
  })

  it('queens can attack on another ne/sw diagonal', () => {
    const queens = new QueenAttack({ white: [2, 6], black: [5, 3] })
    expect(queens.canAttack()).toEqual(true)
  })
})
