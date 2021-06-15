import BinarySearch from './binary-search'

describe('BinarySearch', () => {
  const sortedArray = [1, 2, 3, 4, 5, 6]
  const sortedArrayOfOddLength = [0, 1, 2, 2, 3, 10, 12]
  const unsortedArray = [10, 2, 5, 1]

  it('should require a sorted array', () => {
    const invalidBinarySearch = new BinarySearch(unsortedArray)
    const validBinarySearch = new BinarySearch(sortedArray)

    expect(typeof invalidBinarySearch.array).toEqual('undefined')
    expect(Array.isArray(validBinarySearch.array)).toEqual(true)
  })

  it('should find the correct index of an included value', () => {
    expect(new BinarySearch(sortedArray).indexOf(3)).toEqual(2)
  })

  it('should search the middle of the array', () => {
    expect(new BinarySearch(sortedArrayOfOddLength).indexOf(2)).toEqual(3)
  })

  it('should return -1 for a value not in the array', () => {
    expect(new BinarySearch(sortedArray).indexOf(10)).toEqual(-1)
  })
})

describe('BinarySearch / 2', () => {
  const array = [1, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 634];

  it('should search anywhere in the array/1', () => {
    expect(new BinarySearch(array).indexOf(21)).toEqual(5);
  })

  it('should search anywhere in the array/2', () => {
    expect(new BinarySearch(array).indexOf(144)).toEqual(9);
  })
})

describe('BinarySearch / 3 - with duplicates', () => {

  it('finds a value in an array of even length', () => {
    const array = [1, 3, 5, 8, 13, 21, 21, 21, 21, 34, 55, 89, 144, 233, 377];
    expect(new BinarySearch(array).indexOfAll(21)).toEqual([5, 8]);
  });

  it('finds a value in an array of odd length', () => {
    const array = [1, 3, 5, 8, 13, 21, 34, 55, 89, 144, 144, 144, 233, 377, 634];
    expect(new BinarySearch(array).indexOfAll(144)).toEqual([9, 11]);
  });

  it('finds a value at the end of an array w/o duplicates', () => {
    const array = [1, 3, 4, 6, 8, 9, 11];
    expect(new BinarySearch(array).indexOfAll(11)).toEqual([6, 6]);
  });

  it('finds a value at the end of an array with duplicates', () => {
    const array = [1, 3, 4, 6, 8, 9, 11, 11, 11, 11, 11];
    expect(new BinarySearch(array).indexOfAll(11)).toEqual([6, 10]);
  });

  it("a value larger than the array's largest value is not found", () => {
    const array = [1, 3, 4, 6, 7, 7, 7, 8, 9, 11, 11, 11, 11, 11, 12, 12, 12, 12];
    expect(new BinarySearch(array).indexOfAll(5)).toEqual(-1);
  });
})
