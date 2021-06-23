class Sublist {
  static readonly EQUAL = 'equal';
  static readonly UNEQUAL = 'unequal';
  static readonly SUPERLIST = 'superlist';
  static readonly SUBLIST = 'sublist';

  _list: number[];

  constructor(...list: number[]) {
    this._list = [...list]; // safe copy
  }

  get len() {
    return this._list.length;
  }

  compare(olst: Sublist): string {
    if (this.len === 0 && olst.len === 0) {
      return Sublist.EQUAL;
    }
    else if (this.len == 0) {
      return Sublist.SUBLIST;       // [] is a sublist of any non empty list_b
    }
    else if (olst.len == 0) {
      return Sublist.SUPERLIST;     // list_a non empty is superlist of[]
    }

    // from here we have 2 non empty list
    if (this.len <= olst.len) {
      return this.classifyList(this, olst);
    }
    else {
      // this.len > olst.len
      return this.classifyList(olst, this, false);
    }
  }

  private classifyList(lst: Sublist, olst: Sublist, from_a = true): string {
    /**
       Classify olst as
       - a sublist (or superlist), or
       - an equal or
       - an unequal list
       of this

       from_a = true means if this is contained in olst, then SUBLIST result will be returned
       otherwise (if this contains olst) and from_a is false => SUPERLIST
    */
    const listClass = from_a ? Sublist.SUBLIST : Sublist.SUPERLIST;
    const ixes: number[] | undefined = this.indexesOf(lst._list[0], olst);

    if (typeof ixes === 'undefined') return Sublist.UNEQUAL

    for (const ix of ixes) {
      let jx = 1;
      while (jx < lst.len && (ix + jx) < olst.len && lst._list[jx] === olst._list[ix + jx]) {
        jx += 1;
      }

      if (jx >= lst.len) {
        // no mismatch found
        return lst.len === olst.len ? Sublist.EQUAL : listClass;
      }

      continue // mismatch
    }
    return Sublist.UNEQUAL;
  }

  private indexesOf(elem: number, lst: Sublist): any { // number[] | undefined {
    return lst._list.map((x, ix) => x === elem ? ix : undefined)
      .filter(x => typeof x !== 'undefined');
  }
}

export default Sublist;
