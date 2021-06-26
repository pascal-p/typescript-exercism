class FoodChain {
  static readonly ANIMALS: string[] = ["fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"];

  static readonly TEMPLATES: Map<number, string> = new Map([
    [1, "I know an old lady who swallowed a "],
    [-1, "I don't know why she swallowed the fly. Perhaps she'll die."],
    [2, " that wriggled and jiggled and tickled inside her."],
    [3, "She swallowed the "],
    [4, " to catch the "],
    [5, "She swallowed the <s1> to catch the <s2>"],
  ]);

  static readonly SPEC: Map<number, string> = new Map([
    // Map<number, string | undefined> = new Map([
    [1, ""],
    [2, "It wriggled and jiggled and tickled inside her."],
    [3, "How absurd to swallow a <s>!"],
    [4, "Imagine that, to swallow a <s>!"],
    [5, "What a hog, to swallow a <s>!"],
    [6, "Just opened her throat and swallowed a <s>!"],
    [7, "I don't know how she swallowed a <s>!"],
    [8, "She's dead, of course!"],
  ]);

  static verse(n: number) {
    let a_strophe: string[] = [
      FoodChain.TEMPLATES.get(1) + FoodChain.ANIMALS[n - 1] + "."
    ];

    if (n === 8) {
      a_strophe.push(FoodChain.SPEC.get(n) || "");
      return a_strophe.join("\n") + "\n";
    }

    if (n >= 2) {
      a_strophe.push((FoodChain.SPEC.get(n) || "").replace("<s>",
        FoodChain.ANIMALS[n - 1]));
    }

    if (n >= 4) {
      // "She swallowed the ANIMALS[startv] to catch the ANIMALS[startv - 1].",
      for (let ix = n; ix >= 4; ix--) {
        a_strophe.push(
          FoodChain.TEMPLATES.get(3) + FoodChain.ANIMALS[ix - 1] + FoodChain.TEMPLATES.get(4) +
          FoodChain.ANIMALS[ix - 2] + "."
        )
      }
    }
    if (n >= 3) {
      // "She swallowed the " <bird> " to catch the " <spider> " that wriggled and jiggled
      // and tickled inside her.",
      a_strophe.push(
        FoodChain.TEMPLATES.get(3) + FoodChain.ANIMALS[2] + FoodChain.TEMPLATES.get(4) +
        FoodChain.ANIMALS[1] + FoodChain.TEMPLATES.get(2)
      )
    }
    if (n >= 2) {
      // "She swallowed the spider to catch the fly."
      const str = (FoodChain.TEMPLATES.get(5) || "").replace("<s1>",
        FoodChain.ANIMALS[1]).replace("<s2>",
          FoodChain.ANIMALS[0]);
      a_strophe.push(str + ".");
    }

    // end strophe:
    // "I don't know why she swallowed the fly. Perhaps she'll die."
    a_strophe.push(FoodChain.TEMPLATES.get(-1) || "");
    return a_strophe.join("\n") + "\n";
  }

  static verses(_from: number, _to: number) {
    let poem: string[] = []
    for (let ix = _from; ix <= _to; ix++) {
      const a_strophe = this.verse(ix);
      poem.push(a_strophe)
    }

    const sol = poem.join("\n");
    return sol;
  }
}

export default FoodChain;
