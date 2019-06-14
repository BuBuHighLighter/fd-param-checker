const lan = require('./zh_CN.json');

/**
 * 检查传来参数是否符合规定
 * 1.number
 *  1.1 是number型
 *  1.2 不是number型
 *  1.3 是float型
 *  1.4 不是float型
 * 2.string
 * 3.undefined
 * 4.null
 * 5.boolean
 */
class typeChecker {
    // 构造函数
    constructor(target) {
        this.target = target;
    }
    /**
     * number操作
     */
    // 检查是否是number,还需要是安全数
    isNumber() {
        if (typeof this.target !== 'number' || Object.prototype.toString.call(this.target) !== '[object Number]')
            throw new Error(lan.isNumber.notNumber);

        if (!Number.isSafeInteger(this.target))
            throw new Error(lan.isNumber.notSafeNumber);
        return this;
    }

    // 不为number
    notNumber() {
        if (typeof this.target === 'number' || Object.prototype.toString.call(this.target) === '[object Number]')
            throw new Error(lan.isNumber.isNumber);
        return this;
    }

    /**
     * string操作
     */
    // 检查是否是string
    isString() {
        if (typeof this.target !== 'string' || Object.prototype.toString.call(this.target) !== '[object String]')
            throw new Error('not string');
        return this;
    }

    // 不为string
    notString() {
        if (typeof this.target === 'string' || Object.prototype.toString.call(this.target) === '[object String]')
            throw new Error('is string');
        return this;
    }

    // 检查字符串长度(这里还需要判断一下array的长度，之后再加)
    limitLen(max, min = 0) {
        if (typeof max === 'undefined' || typeof max === 'null' || max === undefined || max === null)
            throw new Error('require param max');

        if (typeof max !== 'number' || Object.prototype.toString.call(max) === '[object Number]')
            max = Number(max);

        if (typeof min !== 'number' || Object.prototype.toString.call(min) === '[object Number]')
            min = Number(min);

        if (isNaN(min))
            throw new Error('illegal param min');

        if (isNaN(max))
            throw new Error('illegal param max');

        max = parseInt(max);
        min = parseInt(min);

        if (max < min)
            throw new Error('illegal params');

        if (typeof this.target === 'number' && Object.prototype.toString.call(this.target) === '[object Number]') {
            // 如果是number类型的转为字符串类型进行判断
            let len = String(this.target).length;
            if (len < min || len > max)
                throw new Error('length is illegal');
        }
        else if ( (typeof this.target === 'string' && Object.prototype.toString.call(this.target) === '[object String]') ||
                (typeof this.target === 'object' && Object.prototype.toString.call(this.target) === '[object Array]') ) {
            // 如果是string或者array类型的直接进行判断（这里字符串如果是生僻字的字符串是否长度会有不一样，还有汉字也算一个长度单位）
            let len = this.target.length;
            if (len < min || len > max)
                throw new Error('length is illegal');
        }
        // 其他类型的变量直接跳过这里
        // if( !Object.keys(this.target).includes('length') && !Object.getOwnPropertyNames(this.target).includes('length'))
        //     throw new Error('do not have property length');

        return this;
    }

    /**
     * undefined操作
     */
    // 检查是否是undefined
    isUndefined() {
        if (typeof this.target !== 'undefined' || this.target !== undefined || Object.prototype.toString.call(this.target) !== '[object Undefined]')
            throw new Error('not undefined');
        return this;
    }

    // 不为undefined
    notUndefined() {
        if (typeof this.target === 'undefined' || this.target === undefined || Object.prototype.toString.call(this.target) === '[object Undefined]')
            throw new Error('is undefined');
        return this;
    }

    /**
     * null操作
     */
    // 检查是否是null
    isNull() {
        if (typeof this.target !== 'object' || this.target !== null || Object.prototype.toString.call(this.target) !== '[object Null]')
            throw new Error('not null');
        return this;
    }

    // 不为null
    notNull() {
        if (typeof this.target === 'null' || this.target === null || Object.prototype.toString.call(this.target) === '[object Null]')
            throw new Error('is null');
        return this;
    }

    /**
     * boolean操作
     */
    // 检查是否是boolean
    isBoolean() {
        if (typeof this.target !== 'boolean' || (this.target !== true && this.target !== false) || Object.prototype.toString.call(this.target) !== '[object Boolean]')
            throw new Error('not boolean');
        return this;
    }

    // 不为boolean
    notBoolean() {
        if (typeof this.target === 'boolean' || this.target === true || this.target === false || Object.prototype.toString.call(this.target) === '[object Boolean]')
            throw new Error('is boolean');
        return this;
    }

    /**
     * Array
     */
    isArray() {
        if (typeof this.target !== 'object')
            throw new Error(lan.isArray.notObject);
        if (Object.prototype.toString.call(this.target) !== '[object Array]')
            throw new Error(lan.isArray.notArray);
        return this;
    }

    /**
     * 其他
     */
    // 完成后只返回target的操作
    val() {
        return this.target;
    }

}

module.exports = typeChecker