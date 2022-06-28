export function removeItem(item) {
    window.localStorage.removeItem(item);
}
export function setItem(item, value) {
    window.localStorage.setItem(item, value);
}

export function getItem(item) {
    return window.localStorage.getItem(item);
}
