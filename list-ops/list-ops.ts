class List<T> {
  buffer: T[];

  constructor(arg?: any) {
    // make a copy...
    if (typeof arg === 'undefined') {
      this.buffer = [];
      return
    }

    if (this.isList(arg)) {
      this.buffer = [...arg.buffer];
      return
    }

    if (Array.isArray(arg)) {
      this.buffer = (arg.length === 1) ?
        [...arg] : arg.reduce((b, a) => b = [...b, ...(this.isList(a) ? a.buffer : [a])], []);
      return
    }

    throw new Error('Type not yet managed or incompatible');
  }

  get values(): T[] {
    return this.buffer;
  }

  isEmpty(): boolean { return this.buffer.length == 0; }

  append(list: List<T>) {
    /*
     * given two lists, add all items in the second list to the end of the first list
     */
    this.buffer = list.buffer.reduce((clist, item) => [...clist, item], this.buffer);
    return this;
  }

  concat(...lists: Array<List<T>>) {
    /*
     * given a series of lists, combine all items in all lists into one flattened list)
     */
    this.buffer = lists.reduce((buf: T[], cl: List<T>) => {
      buf = [...buf, ...(this.isList(cl) ? cl.buffer : [cl])] as T[];
      return buf;
    }, this.buffer);
    return this;
  }

  filter(fn: (x: T) => boolean) {
    /*
     * given a predicate and a list, return the list of all items for which predicate(item) is True
     */
    this.buffer = this.buffer.filter(fn);
    return this;
  }

  map(fn: (x: T) => T) {
    /*
     * given a function and a list, return the list of the results of applying function(item) on all items
     */
    this.buffer = this.buffer.map(fn);
    return this;
  }

  length() { return this.buffer.length; }

  foldl(fn: (acc: T, x: T) => T, init: T) {
    /*
     * given a function, a list, and initial accumulator, fold (reduce) each item into the accumulator
     * from the left using function(accumulator, item)
     */
    return this.buffer.reduce(fn, init);
  }

  foldr(fn: (acc: T, x: T) => T, init: T) {
    /*
     * given a function, a list, and an initial accumulator, fold (reduce) each item into the accumulator
     * from the right using function(item, accumulator)
     */
    return this.buffer.reduceRight(fn, init);
  }

  reverse() {
    /*
     * given a list (this.buffer), return a list with all the original items, but in reversed order
     */
    this.buffer = this.buffer.reverse();
    return this;
  }

  isList(list: any) {
    return list.hasOwnProperty('buffer');
  }

  //
  // Extensions
  //

  flatten(depth = 1): List<T> {
    // creates a new list with all sub-list elements concatenated into it recursively up to the specified depth.
    if (typeof depth === 'undefined') { depth = 1; }
    const buf = this.buffer.flat(depth);
    return new List(buf);
  }

  push(x: T): List<T> {
    this.buffer.push(x)
    return this;
  }

  pop(): T | undefined {
    if (this.isEmpty()) { return undefined; }
    return this.buffer.pop();
  }

  every(predicateFn: (args: T) => boolean): boolean {
    return this.buffer.every(predicateFn)
  }

  some(predicateFn: (args: T) => boolean): boolean {
    return this.buffer.some(predicateFn)
  }

  unique(): List<T> {
    const buf = this.buffer.reduce((cl: any, elt) => cl.indexOf(elt) === -1 ? [...cl, elt] : cl, [])
    return new List(buf);
  }
}

export default List;
