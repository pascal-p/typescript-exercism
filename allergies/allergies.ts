class Allergies {
  static readonly ALLERGIES: Map<number, string> = new Map([
    [1, 'eggs'],
    [2, 'peanuts'],
    [4, 'shellfish'],
    [8, 'strawberries'],
    [16, 'tomatoes'],
    [32, 'chocolate'],
    [64, 'pollen'],
    [128, 'cats']
  ]);

  static readonly ALL_KEYS = Array.from(Allergies.ALLERGIES.keys())
    .sort((a, b) => b - a); // reverse keys order

  allergies: Set<string>;
  keys: number[];

  constructor(val: number) {
    val = Math.trunc(val) % 256;
    [this.allergies, this.keys] = this.genAllergySet(val);
  }

  list() {
    return this.keys.reverse().map((k) => Allergies.ALLERGIES.get(k));
  }

  allergicTo(allergy: string) {
    // Check validity of allergy? No, lazy approach, it does not matter...
    // ... as we test for presence
    return this.allergies.has(allergy);
  }

  private genAllergySet(val: number): any[] {
    let allergies = new Set();  // collect the allergies
    let keys = [];              // maintain order

    for (const k of Allergies.ALL_KEYS) {
      if (val >= k) {
        keys.push(k)
        allergies.add(Allergies.ALLERGIES.get(k))
        val -= k;
      }
      if (val < 0) break;
    }
    return [allergies, keys];
  }
}

export default Allergies;
