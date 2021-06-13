type AccFnType = (x: any) => any;

const accumulate = (coll: any[], fn: AccFnType) => {
  let res = [];

  for (const x of coll) {
    res.push(fn(x))
  }

  return res;
}

export default accumulate;
