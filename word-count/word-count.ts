// const PUNCTUATION = [':', ';', '\\\?', '!', ',', '\\\.'];

class Words {
    // expr = PUNCTUATION.map((s) => s + '|').join('').replace(/\|$/, '');
    // punctRE: RegExp = new RegExp(this.expr, 'g');
    allSpacesRE: RegExp = /(\t|\n|\s|_)+/g;

    constructor() { }

    count(word: string): Map<string, number> {
        let str = word.replace(this.allSpacesRE, ' ').trim();

        // const updateFn = (wc: Map<string, number>, w: string) => wc.set(w, wc.get(w) === undefined ? 1 : wc.get(w) + 1);
        const updateFn = (wc: any, w: string) => wc.set(w, wc.get(w) === undefined ? 1 : wc.get(w) + 1);

        return str.split(' ').reduce(
            (wc, word) => {
                if (word.match(/^[\w:;\?!.\.&@%\^\$]+$/i)) {          // no single-quote
                    updateFn(wc, word.toLowerCase());
                }
                else if (word.startsWith("'") && word.endsWith("'")) {
                    updateFn(wc, word.replace(/^'/, '').replace(/'$/, '').toLowerCase());
                }
                else if (word.match(/^[\w']+$/i)) {  // potentially multi-single quotes
                    updateFn(wc, word.toLowerCase());
                }
                return wc;
            },
            new Map() // {}
        );
    }
}

export default Words;
