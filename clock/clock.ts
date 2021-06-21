class Clock {
  readonly hour: number;
  readonly min: number;
  readonly sec: number

  constructor(h: number, m?: number, s?: number) {
    [this.hour, this.min, this.sec] = this.convertHMS(h, m || 0, s || 0);
  }

  toString() {
    const hs = this.hour < 10 ? '0' + String(this.hour) : String(this.hour);
    const ms = this.min < 10 ? '0' + String(this.min) : String(this.min);
    if (this.sec > 0) {
      const ss = this.sec < 10 ? '0' + String(this.sec) : String(this.sec);
      return `${hs}:${ms}:${ss}`;
    }
    return `${hs}:${ms}`;
  }

  plus(m: number, s?: number): Clock {
    s = s || 0;
    if (s === 0) {
      const [min_hour, min] = divrem(this.min + m, 60)
      return new Clock((this.hour + min_hour) % 24, min);
    }
    else {
      throw new Error('Not Yet Implemented')
    }
  }

  minus(m: number, s?: number): Clock {
    s = s || 0;
    if (s === 0) {
      let [hour, min] = [0, 0];
      if (this.min < min) { // Adjust hour and minute
        const nbHourMin = Math.ceil(min / 60) >> 0;
        hour = this.adjustHour(this.hour, nbHourMin);
        min = nbHourMin * 60 + this.min - m;
      }
      else {
        min = this.min - m;
        hour = this.hour;
      }
      return new Clock(hour, min);
    }
    else {
      throw new Error('Not Yet Implemented')
    }
  }

  equals(oClock: Clock): boolean {
    return this.hour % 24 == oClock.hour % 24 &&
      this.min % 60 == oClock.min % 60 &&
      this.sec % 60 == oClock.sec % 60;
  }

  private convertHMS(h: number, m: number, s: number) {
    if (s < 0) {
      // make if positive by borrowing over the minutes
      const count = Math.abs(s / 60 - 1) >> 0;
      m -= count;
      s = count * 60 + m; // now m can be < 0
    }

    if (m < 0) {
      const count = Math.abs(m / 60 - 1) >> 0;
      h -= count;
      m = count * 60 + m; // now h can be < 0
    }

    if (h < 0) {
      h = 24 + (h % 24)
    }

    // h >= 0 && m >= 0 && s >= 0
    let [dmin, sec] = divrem(s, 60);
    let [dhour, min] = divrem(m + dmin, 60);
    const hour = (h + dhour) % 24;

    return [hour, min, sec]
  }

  private adjustHour(hour: number, nbHourMin: number) {
    const hdiff = (hour - nbHourMin) % 24
    return 0 <= hdiff && hdiff < 23 ? hdiff : 24 + hdiff;
  }
}

const divrem = (p: number, q: number) => [p / q >> 0, p % q];

export default Clock;
