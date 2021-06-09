class RunLengthEncoding {

  public static encode(str: string): string {
    if (str.length == 0) {
      return '';
    }
    else if (str.length == 1) {
      return str;
    }

    let [prev_ch, count, encoding] = ['', 0, ''];
    for (const cur_ch of str) {
      if (cur_ch == prev_ch) {
        count += 1;
        continue;
      }

      if (cur_ch != '') {
        encoding = encoding.concat(count > 1 ? String(count) : "", prev_ch);
      }
      prev_ch = cur_ch;
      count = 1;
    }

    if (count > 0) {
      encoding = encoding.concat(count > 1 ? String(count) : "", prev_ch);
    }
    return encoding;
  }

  public static decode(str: string): string {
    if (str.length == 0) {
      return '';
    }
    else if (str.length == 1 && str.match(/\d/)) {
      // str should not be a single digit like '2' for ex.
      throw new Error('invliad string')
    }
    else if (str.length == 1) {
      return str;
    }

    let [decoding, snum] = ['', ''];
    for (const cur_ch of str) {
      if (cur_ch >= '0' && cur_ch <= '9') {
        snum = snum.concat(cur_ch);
        continue;
      }

      // cur_ch is a Character that needs to be repeated
      snum = (snum.length == 0) ? '1' : snum;
      const num = parseInt(snum, 10);
      decoding = decoding.concat(cur_ch.repeat(num));
      snum = '';
    }
    return decoding;
  }

}

export default RunLengthEncoding;
