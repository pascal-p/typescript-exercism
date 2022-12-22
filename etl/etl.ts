type TIn = { [key: number]: string[]};
type TOut = { [key: string]: number };

function transform(input: TIn): TOut {
  return Object.getOwnPropertyNames(input)
    .reduce((obj: TOut, key: string) => {
      input[parseInt(key)]
        .reduce((obj: TOut, v: string) => {
          obj[v.toLowerCase()] = parseInt(key);
          return obj;
        }, obj); // init value
      return obj;
    },
    {}
  );
}

export default transform
