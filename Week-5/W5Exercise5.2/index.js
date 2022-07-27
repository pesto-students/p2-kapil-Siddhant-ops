const vowelCount = (phrase) => {
    const map = new Map([
        ["a", 0],
        ["e", 0],
        ["i", 0],
        ["o", 0],
        ["u", 0],
    ]);
    const _phrase = phrase.trim().toLowerCase();
    for (const char of _phrase) {
        if (map.has(char)) {
            const count = map.get(char) ?? 0;
            map.set(char, count + 1);
        }
    }
    return map;
};
console.log(vowelCount("I want to buy a Macbook pro and an Iphone"));
