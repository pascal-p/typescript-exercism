class Armstrong {

  public static isArmstrongNumber(n: number): boolean {
    const s = String(n);
    const p: number = s.length;
    return s.split('').reduce((s, d) => s + parseInt(d) ** p, 0) === n;
  }

}

export default Armstrong;
