var assert = require('assert');
const typeChecker = require('../typeChecker.js');
const zh = require('../zh_CN.json');

describe('Number', () => {
    // 检查是否是number类型的变量，且是安全数
    describe('isNumber()', () => {
        it('填入1，正常', function () {
            assert.strictEqual(new typeChecker(1).isNumber().val(), 1);
        });

        it(`填入'a'，报错`, function () {
            assert.throws(new typeChecker('a').isNumber, Error);
        })

        it(`填入null，报错`, function () {
            assert.throws(new typeChecker(null).isNumber, Error);
        })

        it(`填入undefined，报错`, function () {
            assert.throws(new typeChecker(undefined).isNumber, Error);
        })

        it(`填入true，报错`, function () {
            assert.throws(new typeChecker(true).isNumber, Error);
        })

        it(`填入false，报错`, function () {
            assert.throws(new typeChecker(false).isNumber, Error);
        })

        it(`不输入任何值，报错`, function () {
            assert.throws(new typeChecker().isNumber, Error);
        })

        it(`填入Infinity，正常`, function () {
            assert.throws(new typeChecker(Infinity).isNumber, Error);
        })

        it(`填入-Infinity，正常`, function () {
            assert.throws(new typeChecker(-Infinity).isNumber, Error);
        })

        it(`填入Number.MAX_SAFE_INTEGER，正常`, function () {
            assert.strictEqual(new typeChecker(Number.MAX_SAFE_INTEGER).isNumber().val(), Number.MAX_SAFE_INTEGER);
        })

        it(`填入Number.MAX_SAFE_INTEGER+1，报错`, function () {
            assert.throws(new typeChecker(Number.MAX_SAFE_INTEGER + 1).isNumber, Error);
        })

        it(`填入Number.MIN_SAFE_INTEGER，正常`, function () {
            assert.strictEqual(new typeChecker(Number.MIN_SAFE_INTEGER).isNumber().val(), Number.MIN_SAFE_INTEGER);
        })

        it(`填入Number.MIN_SAFE_INTEGER-1，报错`, function () {
            assert.throws(new typeChecker(Number.MIN_SAFE_INTEGER - 1).isNumber, Error);
        })

        it(`填入9007199254740993，报错`, function () {
            assert.throws(new typeChecker(9007199254740993).isNumber, Error);
        })

        it(`填入9007199254740993e100，报错`, function () {
            assert.throws(new typeChecker(9007199254740993e100).isNumber, Error);
        })
    });

    // 检查是否不是number类型
    describe('notNumber()', () => {
        it(`填入1，报错`, function () {
            assert.throws(new typeChecker(1).notNumber, Error);
        })

        it(`填入'a'，正常`, function () {
            assert.strictEqual(new typeChecker('a').notNumber().val(), 'a');
        })

        it(`填入undefined，正常`, function () {
            assert.strictEqual(new typeChecker(undefined).notNumber().val(), undefined);
        })

        it(`填入null，正常`, function () {
            assert.strictEqual(new typeChecker(null).notNumber().val(), null);
        })

        it(`填入true，正常`, function () {
            assert.strictEqual(new typeChecker(true).notNumber().val(), true);
        })

        it(`填入false，正常`, function () {
            assert.strictEqual(new typeChecker(false).notNumber().val(), false);
        })

        it(`填入''，正常`, function () {
            assert.strictEqual(new typeChecker('').notNumber().val(), '');
        })

        it(`不填任何值，正常`, function () {
            assert.strictEqual(new typeChecker().notNumber().val(), undefined);
        })
    });

    // 检查参数是不是为string
    describe('isString()', () => {
        it(`填入'a',正常`, function () {
            assert.strictEqual(new typeChecker('a').isString().val(), 'a');
        })

        it(`填入1，报错`, function () {
            assert.throws(new typeChecker(1).isString, Error);
        })

        it(`填入undefined，报错`, function () {
            assert.throws(new typeChecker(undefined).isString, Error);
        })

        it(`不填入任何参数，报错`, function () {
            assert.throws(new typeChecker().isString, Error);
        })

        it(`传入null，报错`, function () {
            assert.throws(new typeChecker(null).isString, Error);
        })

        it(`传入true，报错`, function () {
            assert.throws(new typeChecker(true).isString, Error);
        })

        it(`传入false，报错`, function () {
            assert.throws(new typeChecker(false).isString, Error);
        })

        it(`传入{}，报错`, function () {
            assert.throws(new typeChecker({}).isString, Error);
        })

        it(`传入{a:'123'}，报错`, function () {
            assert.throws(new typeChecker({ a: '123' }).isString, Error);
        })

        it(`传入{a:''}，报错`, function () {
            assert.throws(new typeChecker({ a: '' }).isString, Error);
        })

        it(`传入[]，报错`, function () {
            assert.throws(new typeChecker({ a: '123' }).isString, Error);
        })

        it(`传入['1', '2', '3']，报错`, function () {
            assert.throws(new typeChecker(['1', '2', '3']).isString, Error);
        })
    });

    // 检查参数是否不是string
    describe('notString()', () => {
        it(`传入'a'，报错`, function () {
            assert.throws(new typeChecker('a').notString, Error);
        })

        it(`传入1,正常`, function () {
            assert.strictEqual(new typeChecker(1).notString().val(), 1);
        })

        it(`传入undefined，正常`, function () {
            assert.strictEqual(new typeChecker(undefined).notString().val(), undefined);
        })

        it(`传入null，正常`, function () {
            assert.strictEqual(new typeChecker(null).notString().val(), null);
        })

        it(`传入true，正常`, function () {
            assert.strictEqual(new typeChecker(true).notString().val(), true);
        })

        it(`传入false，正常`, function () {
            assert.strictEqual(new typeChecker(false).notString().val(), false);
        })

        it(`传入{},正常`, function () {
            assert.deepStrictEqual(new typeChecker({}).notString().val(), {});
        })

        it(`传入{a:'123'}, 正常`, function() {
            assert.deepStrictEqual(new typeChecker({a:'123'}).notString().val(), {a:'123'});
        })
    });
    
});