class Transfers {}

Transfers.stuff = () => {
    console.log("stuff");
};

Transfers.createEmptyMap = (transfers) => {
    let map = {};

    console.log("length: " + transfers.length);
    for (let i = 0; i < transfers.length; i++) {
        map[transfers[i].from] = 0;
    }

    for (let i = 0; i < transfers.length; i++) {
        map[transfers[i].to] = 0;
    }

    return map;
}

Transfers.calculateHoldersFromTransfers = (queryResp) => {
    // - create map "holders": "value"
    // - populate holders given the unique values of all from, to
    // - tally up all to: increment value in map for holder 'to'
    // - tally up all from: increment value in map for holder 'from'
    // - return result

}

export { Transfers };
