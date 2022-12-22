type PalObj = {
  largest: { value: number | null, factors: number[][] };
  smallest: { value: number | null, factors: number[][] }
};

type Factors = {
  minFactor?: number | undefined;
  maxFactor: number
}

type Pair = [Map<number, number[][]>, number[]]

export const generate = ({ minFactor, maxFactor }: Factors): PalObj => {
  if (typeof minFactor === 'undefined') {
    minFactor = 1;
  }

  if (minFactor > maxFactor) {
    throw new Error('min must be <= max');
  }

  const [prodMap, palProd] = genProducts(minFactor, maxFactor);
  if (palProd.length === 0) {
    return {
      smallest: { value: null, factors: [] },
      largest: { value: null, factors: [] }
    }
  }
  return selectMinMax(prodMap, palProd);
}

const genProducts = (min_: number, max_: number): Pair => {
  let prodMap: Map<number, number[][]> = new Map()
  let palProd: number[] = [];

  for (let ix = min_; ix <= max_; ix++) {
    for (let jx = ix; jx <= max_; jx++) {
      const p = ix * jx;
      if (!isPalindrome(p)) continue;

      if (prodMap.has(p)) {
        const a: number[][] = prodMap.get(p) || [];
        a.push([ix, jx]);
        prodMap.set(p, a);
      }
      else {
        prodMap.set(p, [[ix, jx]]);
      }
      palProd.push(p);
    }
  }
  return [prodMap, palProd];
}

const selectMinMax = (prodMap: Map<number, number[][]>, palProd: number[]): PalObj => {
  palProd.sort((a: number, b: number) => a - b); // ascending order

  const min_ = palProd[0];
  const max_ = palProd[palProd.length - 1];

  const resObj: PalObj = {
    smallest: { value: min_, factors: prodMap.get(min_) || [[]] },
    largest: { value: max_, factors: prodMap.get(max_) || [[]] }
  }
  return resObj;
}

const isPalindrome = (p: number): boolean => {
  const sp = String(p);
  const flag = true;
  const n = sp.length;
  for (let ix = 0; ix < n / 2 >> 0; ix++) { // note integer div.
    if (sp[ix] != sp[n - 1 - ix]) return false;
  }
  return flag;
}
