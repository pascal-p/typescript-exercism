class Words {
    allSpacesRE: RegExp = /(\t|\n|\s|_)+/g;

    // implicit default constructor is enough
    // constructor() { }

    count(word: string): Map<string, number> {
        let str: string = word.replace(this.allSpacesRE, ' ').trim();

        const updateFn = (wc: Map<string, number>, w: string) => wc.set(w, (wc.get(w) || 0) + 1);

        return str.split(' ').reduce(
            (wc, word) => {
                // cf. https://javascript.info/regexp-unicode => Unicode support
                if (word.match(/^[\p{L}\p{P}:;\?!.\.&@%\^\$]+$/gu)) {  // no single-quote
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
            new Map()
        );
    }
}

export default Words;
