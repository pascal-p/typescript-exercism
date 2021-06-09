function transform(input: any): object {
  return Object.getOwnPropertyNames(input).reduce(
    (obj: object, key: string) => {
      input[key].reduce(
        (obj: any, v: string) => {
          obj[v.toLowerCase()] = parseInt(key);
          return obj;
        },
        obj           // init value
      ); // end of inner reduce
      return obj
    },
    Object()          // init value, could be {}
  );
}

export default transform
