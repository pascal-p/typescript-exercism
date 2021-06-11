class SpaceAge {
  static readonly EarthYear = 31_557_600;
  static readonly MercuryYear = 0.2408467;  // in Earth years
  static readonly VenusYear = 0.61519726;   // ditto
  static readonly MarsYear = 1.8808158;     // ditto
  static readonly JupiterYear = 11.862615;  // ditto
  static readonly SaturnYear = 29.447498;   // ditto
  static readonly UranusYear = 84.016846;   // ditto
  static readonly NeptuneYear = 164.79132;  // ditto

  readonly _age: number

  constructor(age: number) {
    if (age < 0) {
      throw new Error('age should be a natural integer');
    }
    this._age = Math.trunc(age); // deal only with (natural) integer
  }

  get seconds(): number {
    return this._age;
  }

  public onEarth(): number {
    return this.round(this.baseCalc());
  }

  // A call for meta-programming here...

  public onMercury(): number {
    return this.round(this.baseCalc() * (1. / SpaceAge.MercuryYear));
  }

  public onVenus(): number {
    return this.round(this.baseCalc() * (1. / SpaceAge.VenusYear));
  }

  public onMars(): number {
    return this.round(this.baseCalc() * (1. / SpaceAge.MarsYear));
  }

  public onJupiter(): number {
    return this.round(this.baseCalc() * (1. / SpaceAge.JupiterYear));
  }

  public onSaturn(): number {
    return this.round(this.baseCalc() * (1. / SpaceAge.SaturnYear));
  }

  public onUranus(): number {
    return this.round(this.baseCalc() * (1. / SpaceAge.UranusYear));
  }

  public onNeptune(): number {
    return this.round(this.baseCalc() * (1. / SpaceAge.NeptuneYear));
  }

  private baseCalc(): number {
    return this._age / SpaceAge.EarthYear;
  }

  private round(res: number): number {
    return Math.round(res * 100.) / 100.;
  }


}

export default SpaceAge;
