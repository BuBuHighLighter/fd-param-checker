var assert = require('assert');
const typeChecker = require('../index.js');
const zh = require('../zh_CN.json');

describe('Number', () => {
    describe('onlyNumber', () => {
        it(`传入2，返回2`, function() {
            assert.strictEqual(new typeChecker(2).onlyNumber().done(), 2);
        })

        it(`传入'a'，报错`, function() {
            assert.throws(new typeChecker('a').onlyNumber().done, Error);
        })

        it(`传入''，报错`, function() {
            assert.throws(new typeChecker('').onlyNumber().done, Error);
        })

        it(`传入undefined，报错`, function() {
            assert.throws(new typeChecker(undefined).onlyNumber().done, Error);
        })

        it(`传入null，报错`, function() {
            assert.throws(new typeChecker(null).onlyNumber().done, Error);
        })

        it(`传入9007199254740992，报错`, function() {
            assert.strictEqual(new typeChecker(9007199254740992).onlyNumber().done(), 9007199254740993);
        })
    })
})

describe('复合操作', () => {
    it(`typeChecker(1).notNumber().notString().limitLen(3), 报错`, function() {
        assert.throws(new typeChecker(1).notNumber().notString().limitLen(3).done, Error);
    })

    it(`typeChecker('ab').notNumber().notString().limitLen(3), 报错`, function() {
        assert.throws(new typeChecker('ab').notNumber().notString().limitLen(3).done, Error);
    })

    it(`typeChecker([1,2]).notNumber().notString().limitLen(3), 返回[1,2]`, function() {
        assert.deepStrictEqual(new typeChecker([1,2]).notNumber().notString().limitLen(3).done(), [1,2]);
    })

    it(`typeChecker([null,null]).notNumber().notString().limitLen(3), 返回[null, null]`, function() {
        assert.deepStrictEqual(new typeChecker([null,null]).notNumber().notString().limitLen(3).done(), [null, null]);
    })
})