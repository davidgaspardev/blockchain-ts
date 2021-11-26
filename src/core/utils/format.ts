export function getTimestamp(): number {
    return Number.parseInt(new Date().getTime().toString().slice(0, -3));
}

export function json2hex(data: Object): string {
    return Buffer.from(JSON.stringify(data)).toString('hex');
}

export function string2hex(data: string): string {
    return Buffer.from(data).toString('hex');
}