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
            assert.throws(new typeChecker(9007199254740992).onlyNumber().done, Error);
        })
    });
})

describe(`Date`, () => {
    describe('onlyDate', () => {
        it(`传入1,报错`, function() {
            assert.throws(new typeChecker(1).onlyDate().done, Error);
        })

        it(`传入'123',报错`, function() {
            assert.throws(new typeChecker('123').onlyDate().done, Error);
        })

        it(`传入{a:123},报错`, function() {
            assert.throws(new typeChecker({a: 123}).onlyDate().done, Error);
        })

        it(`传入[1,2,3],报错`, function() {
            assert.throws(new typeChecker([1,2,3]).onlyDate().done, Error);
        })

        it(`传入1991-12-11，返回'1991-12-11'`, function() {
            assert.deepStrictEqual(new typeChecker('1991-12-11').onlyDate().done(), '1991-12-11');
        })

        it(`传入23:59:56,报错`, function() {
            assert.throws(new typeChecker('23:59:56').onlyDate().done, Error);
        })

        it(`传入1991/12/11,报错`, function() {
            assert.throws(new typeChecker('1991/12/11').onlyDate().done, Error);
        })

        it(`传入1991@12@11,报错`, function() {
            assert.throws(new typeChecker('1991/12/11').onlyDate().done, Error);
        })

        it(`传入1991:12:11,报错`, function() {
            assert.throws(new typeChecker('1991/12/11').onlyDate().done, Error);
        })

        it(`传入91:12:11,报错`, function() {
            assert.throws(new typeChecker('91:12:11').onlyDate().done, Error);
        })
    });

    describe(`isDate`, () => {
        it(`传入1,返回1`, function() {
            assert.strictEqual(new typeChecker(1).isDate().isNumber().done(), 1);
        })

        it(`传入'a',返回'a'`, function() {
            assert.strictEqual(new typeChecker('a').isDate().isString().done(), 'a');
        })

        it(`传入true,返回true`, function() {
            assert.strictEqual(new typeChecker(true).isDate().isBoolean().done(), true);
        })

        it(`传入false,返回false`, function() {
            assert.strictEqual(new typeChecker(false).isDate().isBoolean().done(), false);
        })

        it(`传入undefined,返回undefined`, function() {
            assert.deepStrictEqual(new typeChecker(undefined).isDate().isUndefined().done(), undefined);
        })

        it(`传入null,返回null`, function() {
            assert.deepStrictEqual(new typeChecker(null).isDate().isNull().done(), null);
        })

        it(`传入[1,2,3],返回[1,2,3]`, function() {
            assert.deepStrictEqual(new typeChecker([1,2,3]).isDate().isArray().done(), [1,2,3]);
        })

        it(`传入'1991-12-11',报错`, function() {
            assert.throws(new typeChecker('1991-12-11').isDate().isArray().done, Error);
        })

        it(`传入'1991-12-11 12:12:12',返回'1991-12-11 12:12:12'`, function() {
            assert.deepStrictEqual(new typeChecker('1991-12-11 12:12:12').isDate().isArray().done(), '1991-12-11 12:12:12');
        })

        it(`传入'12:12:12',报错`, function() {
            assert.throws(new typeChecker('12:12:12').isDate().isArray().done, Error);
        })

        it(`传入'1991@12@11 12:12:12',报错`, function() {
            assert.throws(new typeChecker('1991@12@11 12:12:12').isDate().isArray().done, Error);
        })
    });

    describe(`DateBetween()`, () => {
        it(`传入'1991-12-12 12:12:12', 参数('1970-1-1 0:0:1', '2001-1-1 12:12:12'),返回'1991-12-12 12:12:12'`, function() {
            assert.strictEqual(new typeChecker('1991-12-12 12:12:12').DateBetween('1970-1-1 0:0:1', '2001-1-1 12:12:12').done(), '1991-12-12 12:12:12');
        })

        it(`传入'1991-12-12 12:12:12', 参数('1970-1-1 0:0:1', '1971-1-1 12:12:12'),报错`, function() {
            assert.throws(new typeChecker('1991-12-12 12:12:12').DateBetween('1970-1-1 0:0:1', '1971-1-1 12:12:12').done, Error);
        })

        it(`传入'1991-12-12 12:12:12', 参数('1999-1-1 0:0:1', '2000-1-1 12:12:12'),报错`, function() {
            assert.throws(new typeChecker('1991-12-12 12:12:12').DateBetween('1999-1-1 0:0:1', '2000-1-1 12:12:12').done, Error)
        })

        it(`传入'1991-12-12 12:12:12', 参数('2000-1-1 0:0:1', '1970-1-1 12:12:12'),报错`, function() {
            assert.throws(new typeChecker('1991-12-12 12:12:12').DateBetween('2000-1-1 0:0:1', '1970-1-1 12:12:12').done, Error)
        })

        it(`传入'1991-12-12 12:12:12', 参数(),返回'1991-12-12 12:12:12'`, function() {
            assert.strictEqual(new typeChecker('1991-12-12 12:12:12').DateBetween().done(), '1991-12-12 12:12:12');
        })

        it(`传入1, 参数(),返回1`, function() {
            assert.strictEqual(new typeChecker(1).DateBetween().done(), 1);
        })

        it(`传入'a',参数(),报错`, function() {
            assert.throws(new typeChecker('a').DateBetween().done, Error);
        })

        it(`传入true,参数(),报错`, function() {
            assert.throws(new typeChecker(true).DateBetween().done, Error);
        })

        it(`传入{a:123}, 参数(),报错`, function() {
            assert.throws(new typeChecker({a:123}).DateBetween().done, Error);
        })

        it(`传入[1,2,3], 参数(),报错`, function() {
            assert.throws(new typeChecker([1,2,3]).DateBetween().done, Error)
        })

        it(`传入undefined, 参数(),报错`, function() {
            assert.throws(new typeChecker(undefined).DateBetween().done, Error)
        })

        it(`传入null, 参数(),报错`, function() {
            assert.throws(new typeChecker(null).DateBetween().done, Error)
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