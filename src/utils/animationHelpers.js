export const getWinType = (combo) => {
    const [a, b, c] = combo;

    if (b - a === 1 && c - b === 1) {
        return 'row';
    }
    if (b - a === 3 && c - b === 3) {
        return 'col';
    }
    if (a === 0 && b === 4 && c === 8) {
        return 'diagRight';
    }
    if (a === 2 && b === 4 && c === 6) {
        return 'diagLeft';
    }
    return 'unknown';
};