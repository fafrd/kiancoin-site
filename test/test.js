var assert = require('assert');
import { createEmptyMap, calcBalances } from "../balances.js"

let sampleQueryResp_3transfers = {"data":{"transfers":[{"from":"0x0000000000000000000000000000000000000000","to":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","value":"1000000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0xbdb6eb461e9602ab64ca5e805a3906dbc1095250","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x73bd1162e9da1b551d4601acf83158f3ac2247a9","value":"100000000000000000"}]}};
let sampleQueryResp_4transfers = {"data":{"transfers":[{"from":"0x0000000000000000000000000000000000000000","to":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","value":"1000000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0xbdb6eb461e9602ab64ca5e805a3906dbc1095250","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x73bd1162e9da1b551d4601acf83158f3ac2247a9","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x122fed718c784ad25e2a5ab351f034fc57512a48","value":"333000000000000000"}]}};
let sampleQueryResp_12transfers = {
  "data": {
    "transfers": [
      {
        "from": "0x122fed718c784ad25e2a5ab351f034fc57512a48",
        "to": "0xbc31fda98ed7cf6daaf50327d922b78cbc486d23",
        "value": "32000000000000000"
      },
      {
        "from": "0x0000000000000000000000000000000000000000",
        "to": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "value": "1000000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0x08b4249c79215fdd6a048af43e9ff86b9ee6be2e",
        "value": "50000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0x4c71526d3f7b112aaa4c0af173a6a47ab69d54cd",
        "value": "33000000000000000"
      },
      {
        "from": "0x122fed718c784ad25e2a5ab351f034fc57512a48",
        "to": "0x636483cb4e3e09e4a8e9d7f618a7f544579cc38c",
        "value": "80000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0xe3a2b4da15130c7830862e945a2383f0a29b8bc8",
        "value": "110000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0x636483cb4e3e09e4a8e9d7f618a7f544579cc38c",
        "value": "80000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0x969b81bba3a3eae0fccc78f8b64f012fd823a912",
        "value": "30000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0xbdb6eb461e9602ab64ca5e805a3906dbc1095250",
        "value": "100000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0xfc6f9a3c0fe29423ca6b974109817a323998f762",
        "value": "90000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0x73bd1162e9da1b551d4601acf83158f3ac2247a9",
        "value": "100000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0xff82289231128fc6f185137f445d34e30d036c98",
        "value": "70000000000000000"
      },
      {
        "from": "0x5295b474f3a0bb39418456c96d6fcf13901a4aa1",
        "to": "0x122fed718c784ad25e2a5ab351f034fc57512a48",
        "value": "333000000000000000"
      }
    ]
  }
};

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
let sampleBalanceResult_12transfers =   {
    '0x0000000000000000000000000000000000000000': '-1000000000000000000',
    '0x08b4249c79215fdd6a048af43e9ff86b9ee6be2e': '50000000000000000',
    '0x122fed718c784ad25e2a5ab351f034fc57512a48': '221000000000000000',
    '0x4c71526d3f7b112aaa4c0af173a6a47ab69d54cd': '33000000000000000',
    '0x5295b474f3a0bb39418456c96d6fcf13901a4aa1': '4000000000000000',
    '0x636483cb4e3e09e4a8e9d7f618a7f544579cc38c': '160000000000000000',
    '0x73bd1162e9da1b551d4601acf83158f3ac2247a9': '100000000000000000',
    '0x969b81bba3a3eae0fccc78f8b64f012fd823a912': '30000000000000000',
    '0xbc31fda98ed7cf6daaf50327d922b78cbc486d23': '32000000000000000',
    '0xbdb6eb461e9602ab64ca5e805a3906dbc1095250': '100000000000000000',
    '0xe3a2b4da15130c7830862e945a2383f0a29b8bc8': '110000000000000000',
    '0xfc6f9a3c0fe29423ca6b974109817a323998f762': '90000000000000000',
    '0xff82289231128fc6f185137f445d34e30d036c98': '70000000000000000',
  }

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

        it('should calculate the list of top holders (12 transfers)', function () {
            // This was the test that taught the value of using BigInteger...
            let transfers = sampleQueryResp_12transfers.data.transfers;
            let result = calcBalances(transfers);
            assert.deepEqual(sampleBalanceResult_12transfers, result);
        });
    });
});

