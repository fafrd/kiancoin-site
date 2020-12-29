var assert = require('assert');
import { createEmptyMap, calcBalances } from "../balances.js"

let sampleQueryResp = {"data":{"transfers":[{"from":"0x0000000000000000000000000000000000000000","to":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","value":"1000000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0xbdb6eb461e9602ab64ca5e805a3906dbc1095250","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x73bd1162e9da1b551d4601acf83158f3ac2247a9","value":"100000000000000000"}]}};
let sampleTransfers = sampleQueryResp.data.transfers;
let emptyMap = { '0x0000000000000000000000000000000000000000': 0,
    '0x5295b474f3a0bb39418456c96d6fcf13901a4aa1': 0,
    '0xbdb6eb461e9602ab64ca5e805a3906dbc1095250': 0,
    '0x73bd1162e9da1b551d4601acf83158f3ac2247a9': 0 };
let sampleBalanceResult = { '0x0000000000000000000000000000000000000000': -1000000000000000000,
      '0x5295b474f3a0bb39418456c96d6fcf13901a4aa1': 800000000000000000,
      '0xbdb6eb461e9602ab64ca5e805a3906dbc1095250': '0100000000000000000',
      '0x73bd1162e9da1b551d4601acf83158f3ac2247a9': '0100000000000000000' }

describe('Transfers', function() {
    describe('createEmptyMap', function() {
        it('should initialize map from transfers', function() {
            let result = createEmptyMap(sampleTransfers);
            assert.deepEqual(emptyMap, result);
        });

        it('should calclate the list of top holders', function () {
            let result = calcBalances(sampleTransfers);
            assert.deepEqual(sampleBalanceResult, result);
        });
    });
});

