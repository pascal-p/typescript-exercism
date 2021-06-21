class Gigasecond {
  static readonly GIGA_SEC = 10 ** 9;
  readonly dateUTC: Date;

  constructor(dateUTC: Date) {
    this.dateUTC = dateUTC;
  }

  date(): Date {
    const dt = new Date(this.dateUTC); // shallow clonemake a copy
    return new Date(dt.setUTCSeconds(dt.getUTCSeconds() + Gigasecond.GIGA_SEC));
  }
}

export default Gigasecond
