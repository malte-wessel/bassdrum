const hasOwn = Object.prototype.hasOwnProperty;

// Object.is polyfill
const is = (x: any, y: any) => {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
};

export const shallowEqual = (a: any, b: any) => {
    if (is(a, b)) {
        return true;
    }

    if (
        typeof a !== 'object' ||
        a === null ||
        typeof b !== 'object' ||
        b === null
    ) {
        return false;
    }

    if (Array.isArray(a) !== Array.isArray(b)) {
        return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(b, keysA[i]) || !is(a[keysA[i]], b[keysA[i]])) {
            return false;
        }
    }

    return true;
};
