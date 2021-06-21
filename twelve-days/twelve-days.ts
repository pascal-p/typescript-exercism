class TwelveDays {
  static readonly PREFIX = "On the <nth> day of Christmas my true love gave to me:";
  static readonly PRESENTS = new Array(
    ['first', 'a Partridge in a Pear Tree'],
    ['second', 'two Turtle Doves'],
    ['third', 'three French Hens'],
    ['fourth', 'four Calling Birds'],
    ['fifth', 'five Gold Rings'],
    ['sixth', 'six Geese-a-Laying'],
    ['seventh', 'seven Swans-a-Swimming'],
    ['eighth', 'eight Maids-a-Milking'],
    ['ninth', 'nine Ladies Dancing'],
    ['tenth', 'ten Lords-a-Leaping'],
    ['eleventh', 'eleven Pipers Piping'],
    ['twelfth', 'twelve Drummers Drumming']
  );

  static recite(from: number, to?: number) {
    if (from < 1) {
      throw new Error('from must be  >= 1!')
    }

    if (to === undefined) {
      return TwelveDays.oneVerse(from);
    }

    // repetition - multi-verses (pun intended)
    let res: string = "";
    for (let ix = from; ix < to; ix++) {
      res = res.concat(TwelveDays.oneVerse(ix))
    }
    res = res.concat(TwelveDays.oneVerse(to));
    return res;
  }

  static oneVerse(from: number) {
    let prefix = TwelveDays.PREFIX;
    prefix = prefix.replace('<nth>', TwelveDays.PRESENTS[from - 1][0]);

    let ary = [];
    for (let ix = from - 1; ix > 0; ix--) {
      ary.push(TwelveDays.PRESENTS[ix][1]);
    }

    let str = "";
    if (from > 1) {
      str = ary.join(", ");
      str = str.concat(', and ', TwelveDays.PRESENTS[0][1]);
    }
    else {
      str = ary.join("") + TwelveDays.PRESENTS[0][1];
    }

    const res = prefix + " " + str + ".\n";
    return res;
  }
}

export default TwelveDays
