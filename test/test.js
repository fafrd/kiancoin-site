var assert = require('assert');
import { createEmptyMap, calcBalances } from "../balances.js"

let sampleQueryResp_3transfers = {"data":{"transfers":[{"from":"0x0000000000000000000000000000000000000000","to":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","value":"1000000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0xbdb6eb461e9602ab64ca5e805a3906dbc1095250","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x73bd1162e9da1b551d4601acf83158f3ac2247a9","value":"100000000000000000"}]}};
let sampleQueryResp_4transfers = {"data":{"transfers":[{"from":"0x0000000000000000000000000000000000000000","to":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","value":"1000000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0xbdb6eb461e9602ab64ca5e805a3906dbc1095250","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x73bd1162e9da1b551d4601acf83158f3ac2247a9","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x122fed718c784ad25e2a5ab351f034fc57512a48","value":"333000000000000000"}]}};
let emptyMap = { '0x0000000000000000000000000000000000000000': '0',
    '0x5295b474f3a0bb39418456c96d6fcf13901a4aa1': '0',
    '0xbdb6eb461e9602ab64ca5e805a3906dbc1095250': '0',
    '0x73bd1162e9da1b551d4601acf83158f3ac2247a9': '0' };
let sampleBalanceResult_3transfers = { '0x0000000000000000000000000000000000000000': '-1000000000000000000',
    '0x5295b474f3a0bb39418456c96d6fcf13901a4aa1': '800000000000000000',
    '0xbdb6eb461e9602ab64ca5e805a3906dbc1095250': '0100000000000000000',
    '0x73bd1162e9da1b551d4601acf83158f3ac2247a9': '0100000000000000000'};
let sampleBalanceResult_4transfers = { '0x0000000000000000000000000000000000000000': '-1000000000000000000',
    '0x5295b474f3a0bb39418456c96d6fcf13901a4aa1': '467000000000000000',
    '0x122fed718c784ad25e2a5ab351f034fc57512a48': '0333000000000000000',
    '0xbdb6eb461e9602ab64ca5e805a3906dbc1095250': '0100000000000000000',
    '0x73bd1162e9da1b551d4601acf83158f3ac2247a9': '0100000000000000000'
};

describe('balances.js', function() {
    describe('createEmptyMap', function() {
        it('should initialize map from transfers', function() {
            let transfers = sampleQueryResp_3transfers.data.transfers;
            let result = createEmptyMap(transfers);
            assert.deepEqual(emptyMap, result);
        });
    });

    describe('calcBalances', function () {
        it('should calculate the list of top holders (3 transfers)', function () {
            let transfers = sampleQueryResp_3transfers.data.transfers;
            let result = calcBalances(transfers);
            assert.deepEqual(sampleBalanceResult_3transfers, result);
        });

        it('should calculate the list of top holders (4 transfers)', function() {
            let transfers = sampleQueryResp_4transfers.data.transfers;
            let result = calcBalances(transfers);
            assert.deepEqual(sampleBalanceResult_4transfers, result);
        });
    });
});

