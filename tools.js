
export function debounce(fn, delay) {
    let timeId = null;

    return function (...args) {
        if (timeId) clearTimeout(timeId);

        timeId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}