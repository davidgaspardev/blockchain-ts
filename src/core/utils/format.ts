export function getTimestamp(): number {
    return Number.parseInt(new Date().getTime().toString().slice(0, -3));
}