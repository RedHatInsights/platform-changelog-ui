export function SingleRegex({pattern, value}) {
    const regex = new RegExp(pattern);
    return regex.test(value);
}
