import List from './list-ops'

describe('append entries to a list and return the new list', () => {
  it('empty lists', () => {
    const list1 = new List()
    const list2 = new List()
    expect(list1.append(list2)).toEqual(new List())
  })

  it('empty list to list', () => {
    const list1 = new List([1, 2, 3, 4])
    const list2 = new List<number>()
    expect(list1.append(list2)).toEqual(list1)
  })

  it('non-empty lists', () => {
    const list1 = new List([1, 2])
    const list2 = new List([2, 3, 4, 5])
    expect(list1.append(list2).values).toEqual([1, 2, 2, 3, 4, 5])
  })
})

describe('concat lists and lists of lists into new list', () => {
  it('empty list', () => {
    const list1 = new List()
    const list2 = new List([])
    expect(list1.concat(list2).values).toEqual([])
  })

  it('list of lists', () => {
    const list1 = new List([1, 2])
    const list2 = new List([3])
    const list3 = new List([])
    const list4 = new List([4, 5, 6])
    const listOfLists = new List([list2, list3, list4])
    expect(list1.concat(listOfLists).values).toEqual([1, 2, 3, 4, 5, 6])
  })
})

describe('filter list returning only values that satisfy the filter function', () => {
  it('empty list', () => {
    const list1 = new List([])
    expect(list1.filter((el: number) => el % 2 === 1).values).toEqual([])
  })

  it('non empty list', () => {
    const list1 = new List([1, 2, 3, 5])
    expect(list1.filter((el: number) => el % 2 === 1).values).toEqual([1, 3, 5])
  })
})

describe('returns the length of a list', () => {
  it('empty list', () => {
    const list1 = new List()
    expect(list1.length()).toEqual(0)
  })

  it('non-empty list', () => {
    const list1 = new List([1, 2, 3, 4])
    expect(list1.length()).toEqual(4)
  })
})

describe('returns a list of elements whose values equal the list value transformed by the mapping function', () => {
  it('empty list', () => {
    const list1 = new List<number>()
    expect(list1.map((el: number) => ++el).values).toEqual([])
  })

  it('non-empty list', () => {
    const list1 = new List([1, 3, 5, 7])
    expect(list1.map((el: number) => ++el).values).toEqual([2, 4, 6, 8])
  })
})

describe('folds (reduces) the given list from the left with a function', () => {
  it('empty list', () => {
    const list1 = new List<number>()
    expect(list1.foldl((acc: number, el: number) => el / acc, 2)).toEqual(2)
  })

  it('division of integers', () => {
    const list1 = new List([1, 2, 3, 4])
    expect(list1.foldl((acc: number, el: number) => el / acc, 24)).toEqual(64)
  })
})

describe('folds (reduces) the given list from the right with a function', () => {
  it('empty list', () => {
    const list1 = new List<number>()
    expect(list1.foldr((acc: number, el: number) => el / acc, 2)).toEqual(2)
  })

  it('division of integers', () => {
    const list1 = new List([1, 2, 3, 4])
    expect(list1.foldr((acc: number, el: number) => el / acc, 24)).toEqual(9)
  })
})

describe('reverse the elements of a list', () => {
  it('empty list', () => {
    const list1 = new List()
    expect(list1.reverse().values).toEqual([])
  })

  it('non-empty list', () => {
    const list1 = new List([1, 3, 5, 7])
    expect(list1.reverse().values).toEqual([7, 5, 3, 1])
  })
})

// additions
describe('unique over a list', () => {
  it('empty list', () => {
    const list = new List()
    expect(list.unique().values).toEqual([])
  })

  it('non-empty list', () => {
    const list = new List([1, 2, 1, 2, 3, 2, 3, 4, 5, 1])
    expect(list.unique().values).toEqual([1, 2, 3, 4, 5])
  })
})

describe('flattening a list', () => {
  it('empty list', () => {
    const list = new List()
    expect(list.flatten().values).toEqual([])
  })

  it('non-empty list', () => {
    const list = new List([[[1, 2]], [[2, 4]], [5]])
    expect(list.flatten(2).values).toEqual([1, 2, 2, 4, 5])
  })
})

describe('Extension: list unique', () => {
  it('empty list', () => {
    const list = new List()
    expect(list.unique().values).toEqual([])
  })

  it('non-empty list', () => {
    const list = new List([1, 2, 2, 4, 1, 2, 5])
    expect(list.unique().values).toEqual([1, 2, 4, 5])
  })
})

describe('Extension: list every', () => {
  it('empty list', () => {
    const list = new List()
    expect(list.every((x: any) => x)).toBeTruthy()
  })

  it('non-empty list/1', () => {
    const list = new List([1, 2, 2, 4, 1, 2, 5])
    expect(list.every((x: number) => x % 2 === 0)).toBeFalsy()
  })

  it('non-empty list/2', () => {
    const list = new List([1, 5, 3, 7])
    expect(list.every((x: number) => x % 2 === 1)).toBeTruthy()
  })
})
