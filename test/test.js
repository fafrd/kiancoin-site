var assert = require('assert');
import { Transfers } from "../transfers.js"

//describe('Array', function() {
//    describe('#indexOf()', function() {
//        it('should return -1 when the value is not present', function() {
//            assert.equal([1, 2, 3].indexOf(4), -1);
//        });
//    });
//});

let sampleQueryResp = {"data":{"transfers":[{"from":"0x0000000000000000000000000000000000000000","to":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","value":"1000000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0xbdb6eb461e9602ab64ca5e805a3906dbc1095250","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x73bd1162e9da1b551d4601acf83158f3ac2247a9","value":"100000000000000000"}]}}

describe('Transfers', function() {
    describe('createEmptyMap', function() {
        it('should create map as expected', function() {
            let expected = { '0x0000000000000000000000000000000000000000': 0,
                  '0x5295b474f3a0bb39418456c96d6fcf13901a4aa1': 0,
                  '0xbdb6eb461e9602ab64ca5e805a3906dbc1095250': 0,
                  '0x73bd1162e9da1b551d4601acf83158f3ac2247a9': 0 };
            let result = Transfers.createEmptyMap(sampleQueryResp.data.transfers);
            assert.deepEqual(expected, result);
        });
    });
});

