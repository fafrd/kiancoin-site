function createEmptyMap(transfers) {
    let map = {};

    for (let i = 0; i < transfers.length; i++) {
        map[transfers[i].from] = 0n;
    }

    for (let i = 0; i < transfers.length; i++) {
        map[transfers[i].to] = 0n;
    }

    return map;
}

function calcBalances(transfers) {
    // - create map "holders": "value"
    // - populate this map given the unique values of all from, to addrs
    // - tally up all 'to' addrs: increment value in map for holder 'to'
    // - tally up all 'from' addrs: increment value in map for holder 'from'
    // - return result

    let map = createEmptyMap(transfers);
    for (let i = 0; i < transfers.length; i++) {
        map[transfers[i].to] += BigInt(transfers[i].value);
        map[transfers[i].from] -= BigInt(transfers[i].value);
    }

    return map;
}

export { createEmptyMap, calcBalances };
