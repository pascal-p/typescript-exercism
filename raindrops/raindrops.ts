class Raindrops {
  static readonly mapping: Map<number, string> = new Map([
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong']
  ]);

  public convert(n: number): string {
    let res = [];

    for (const factor of Raindrops.mapping.keys()) {
      if (n % factor === 0) { res.push(Raindrops.mapping.get(factor)) }
    }

    if (res.length === 0) { res.push(n); }

    return res.join('');
  }

}

export default Raindrops;
