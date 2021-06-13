class FlattenArray {
  static flatten(ary: any[]) {
    let res: any[] = [];

    for (const x of ary) {
      if (typeof x === 'undefined') continue;

      if (Array.isArray(x)) {
        // need to flatten
        const nary = FlattenArray.flatten(x);
        res = [...res, ...nary];
        continue
      }
      res.push(x);
    }

    return res
  }
}

export default FlattenArray;
