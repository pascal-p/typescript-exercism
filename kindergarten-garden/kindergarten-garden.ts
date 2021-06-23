const PUPILS: string[] = [
  'Alice', 'Bob', 'Charlie', 'David',
  'Eve', 'Fred', 'Ginny', 'Harriet',
  'Ileana', 'Joseph', 'Kincaid', 'Larry'
];

const PLANTS: Map<string, string> = new Map([
  ['C', 'clover'],
  ['G', 'grass'],
  ['R', 'radishes'],
  ['V', 'violets']
]);

// a constructor
const Garden = function(diagram: string, pupils?: string[]) {
  const self = {};
  _assign(self, diagram, (pupils || PUPILS).sort());
  return self;
} as any as { new(diagram: string, pupils?: string[]): any }

// dynamically add properties (get) to current Object
const _assign = (self: Object, diagram: string, pupils: string[]) => {
  const ary = diagram.split('\n');

  let ix = 0;
  for (const pupil of pupils) {
    const jx = 2 * (ix + 1) - 2;
    let a: string[] = [];

    for (let kx = jx; kx < jx + 2; kx++) {
      let p = ary[0][kx]; // get the plant first row, col kx

      if (PLANTS.has(p)) {
        const plant = PLANTS.get(p) || '';
        a.push(plant);
      }
    }

    for (let kx = jx; kx < jx + 2; kx++) {
      let p = ary[1][kx]; // get the plant second row, col kx
      if (PLANTS.has(p)) {
        const plant = PLANTS.get(p) || '';
        a.push(plant);
      }
    }

    Object.defineProperty(self, pupil.toLowerCase(), {
      get: () => a,
      // set: (v: string[]) => assignment.set(key, v)
      // writable: false,
      enumerable: true,
      configurable: false
    });

    if (jx + 2 >= ary[0].length) break;
    ix++;
  }
}

export default Garden;
