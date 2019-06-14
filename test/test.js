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
});

describe('String', () => {
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

        it(`传入{a:'123'}, 正常`, function () {
            assert.deepStrictEqual(new typeChecker({ a: '123' }).notString().val(), { a: '123' });
        })
    });

    describe('limitLen(max, min)', () => {
        it(`传入3, limit(4), 返回3`, function () {
            assert.strictEqual(new typeChecker(3).limitLen(4).val(), 3);
        })

        it(`传入123, limit(4), 返回123`, function () {
            assert.strictEqual(new typeChecker(123).limitLen(4).val(), 123);
        })

        it(`传入123, limit(2), 报错`, function () {
            assert.throws(() => {
                new typeChecker(123).limitLen(2)
            }, Error);
        })

        it(`传入'a', limit(2), 返回'a'`, function () {
            assert.strictEqual(new typeChecker('a').limitLen(2).val(), 'a');
        })

        it(`传入'abc', limit(2), 报错`, function () {
            assert.throws(() => {
                new typeChecker('abc').limitLen(2)
            }, Error);
        })

        it(`传入'', limit(2), 返回''`, function () {
            assert.strictEqual(new typeChecker('').limitLen(2).val(), '');
        })

        it(`传入undefined, limit(2), 报错`, function () {
            assert.throws(new typeChecker(undefined).limitLen(2).val, Error);
        })

        it(`传入null, limit(2), 报错`, function () {
            assert.throws(new typeChecker(null).limitLen(2).val, Error);
        })

        it(`传入true, limit(2), 报错`, function () {
            assert.throws(new typeChecker(true).limitLen(2).val, Error);
        })

        it(`传入false, limit(2), 报错`, function () {
            assert.throws(new typeChecker(false).limitLen(2).val, Error);
        })

        it(`传入{}, limit(2), 报错`, function () {
            assert.throws(new typeChecker({}).limitLen(2).val, Error);
        })

        it(`传入{a:123}, limit(2), 报错`, function () {
            assert.throws(new typeChecker({ a: 123 }).limitLen(2).val, Error);
        })

        it(`传入[], limit(2), 返回[]`, function () {
            assert.deepStrictEqual(new typeChecker([]).limitLen(2).val(), []);
        })

        it(`传入[1,2,3], limit(4), 返回[1,2,3]`, function () {
            assert.deepStrictEqual(new typeChecker([1,2,3]).limitLen(4).val(), [1,2,3]);
        })

        it(`传入['a', 'b', 'c'], limit(4), 返回['a', 'b', 'c']`, function () {
            assert.deepStrictEqual(new typeChecker(['a', 'b', 'c']).limitLen(4).val(), ['a', 'b', 'c']);
        })

        it(`传入['', '', ''], limit(4), 返回['', '', '']`, function () {
            assert.deepStrictEqual(new typeChecker(['', '', '']).limitLen(4).val(), ['', '', '']);
        })

        it(`传入[undefined, undefined, undefined], limit(4), 返回[undefined, undefined, undefined]`, function () {
            assert.deepStrictEqual(new typeChecker([undefined, undefined, undefined]).limitLen(4).val(), [undefined, undefined, undefined]);
        })

        it(`传入[null, null, null], limit(4), 返回[null, null, null]`, function () {
            assert.deepStrictEqual(new typeChecker([null, null, null]).limitLen(4).val(), [null, null, null]);
        })

        it(`传入['', null, undefined, 1, true, false, {}], limit(10), 返回['', null, undefined, 1, true, false, {}]`, function () {
            assert.deepStrictEqual(new typeChecker(['', null, undefined, 1, true, false, {}]).limitLen(10).val(), ['', null, undefined, 1, true, false, {}]);
        })
    })
})

describe('Undefined', () => {
    describe('isUndefined()', () => {
        it(`传入undefined, 返回undefined`, function () {
            assert.deepStrictEqual(new typeChecker(undefined).isUndefined().val(), undefined);
        })

        it(`传入1, 报错`, function () {
            assert.throws(new typeChecker(1).isUndefined, Error);
        })

        it(`传入'a', 报错`, function () {
            assert.throws(new typeChecker('a').isUndefined, Error);
        })

        it(`传入'', 报错`, function () {
            assert.throws(new typeChecker('').isUndefined, Error);
        })

        it(`传入null, 报错`, function () {
            assert.throws(new typeChecker(null).isUndefined, Error);
        })

        it(`传入{}, 报错`, function () {
            assert.throws(new typeChecker({}).isUndefined, Error);
        })

        it(`传入{a:123}, 报错`, function () {
            assert.throws(new typeChecker({a:123}).isUndefined, Error);
        })

        it(`传入true, 报错`, function () {
            assert.throws(new typeChecker(true).isUndefined, Error);
        })

        it(`传入false, 报错`, function () {
            assert.throws(new typeChecker(false).isUndefined, Error);
        })
    })

    describe('notUndefined()', () => {
        it(`传入undefined, 报错`, function () {
            assert.throws(new typeChecker(undefined).notUndefined, Error);
        })

        it(`传入1, 返回1`, function () {
            assert.strictEqual(new typeChecker(1).notUndefined().val(), 1);
        })

        it(`传入'a', 返回'a'`, function () {
            assert.strictEqual(new typeChecker('a').notUndefined().val(), 'a');
        })

        it(`传入'', 返回''`, function () {
            assert.strictEqual(new typeChecker('').notUndefined().val(), '');
        })

        it(`传入{}, 返回{}`, function () {
            assert.deepStrictEqual(new typeChecker({}).notUndefined().val(), {});
        })

        it(`传入{a: undefined}, 返回{a: undefined}`, function () {
            assert.deepStrictEqual(new typeChecker({a: undefined}).notUndefined().val(), {a: undefined});
        })

        it(`传入{a: 123}, 返回{a: 123}`, function () {
            assert.deepStrictEqual(new typeChecker({a: 123}).notUndefined().val(), {a: 123});
        })

        it(`传入null, 返回null`, function () {
            assert.strictEqual(new typeChecker(null).notUndefined().val(), null);
        })

        it(`传入[], 返回[]`, function () {
            assert.deepStrictEqual(new typeChecker([]).notUndefined().val(), []);
        })

        it(`传入[undefined], 返回[undefined]`, function () {
            assert.deepStrictEqual(new typeChecker([undefined]).notUndefined().val(), [undefined]);
        })
    })
})

describe(`Null`, () => {
    describe(`isNull()`, () => {
        it(`传入null, 返回null`, function () {
            assert.deepStrictEqual(new typeChecker(null).isNull().val(), null);
        })

        it(`传入1, 报错`, function () {
            assert.throws(new typeChecker(1).isNull, Error);
        })

        it(`传入'a', 报错`, function () {
            assert.throws(new typeChecker('a').isNull, Error);
        })

        it(`传入'', 报错`, function () {
            assert.throws(new typeChecker('').isNull, Error);
        })

        it(`传入undefined, 报错`, function () {
            assert.throws(new typeChecker(undefined).isNull, Error);
        })

        it(`传入{}, 报错`, function () {
            assert.throws(new typeChecker({}).isNull, Error);
        })

        it(`传入{}, 报错`, function () {
            assert.throws(new typeChecker({}).isNull, Error);
        })

        it(`传入{a: 123}, 报错`, function () {
            assert.throws(new typeChecker({a: 123}).isNull, Error);
        })

        it(`传入[], 报错`, function () {
            assert.throws(new typeChecker([]).isNull, Error);
        })

        it(`传入[null], 报错`, function () {
            assert.throws(new typeChecker([null]).isNull, Error);
        })

        it(`传入[undefined], 报错`, function () {
            assert.throws(new typeChecker([undefined]).isNull, Error);
        })

        it(`传入['','',''], 报错`, function () {
            assert.throws(new typeChecker(['','','']).isNull, Error);
        })

        it(`传入[1,2,3], 报错`, function () {
            assert.throws(new typeChecker([1,2,3]).isNull, Error);
        })

        it(`传入{a: null}, 报错`, function () {
            assert.throws(new typeChecker({a: null}).isNull, Error);
        })

        it(`传入true, 报错`, function () {
            assert.throws(new typeChecker(true).isNull, Error);
        })

        it(`传入false, 报错`, function () {
            assert.throws(new typeChecker(false).isNull, Error);
        })
    })
})