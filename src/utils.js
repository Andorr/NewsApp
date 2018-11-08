export const mergeElements: Function = (num: number, list: Array<Object>, start: number = 2) => {
    const arr = [];
    let from: number = start;
    let to: number = list.length > (num + start) ? (num + start) : list.length;
    while(from < list.length) {
        arr.push(list.slice(from ,to));
        from += num;
        to = (from + num) < list.length ? from + num : list.length;
    }
    return arr;
}

export const capitalize: Function = (value: string) => {
    return (value)? value.charAt(0).toUpperCase() + value.slice(1) : '';
}