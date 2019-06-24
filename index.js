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
        this.shouldType = [];                       // 应该的类型
        this.onlyType = null;                       // 只允许类型
        this.notType = [];                          // 不允许类型
        this.target = target;                       // 对象变量
        this.errStack = [];                         // 错误栈
    }

    done() {
        if (this.onlyType !== null) {
            // 判断onlyType是否一致
            if (Object.prototype.toString.call(this.target) !== `[object ${this.onlyType}]`)
                this.errStack.push(new Error(`唯一类型 ${this.onlyType} 错误`));
        }

        // 构造不允许的列表
        if (this.notType.length !== 0) {
            for (let i = 0; i < this.notType.length; i++) {
                this.notType[i] = `[object ${this.notType[i]}]`;
            }
        }

        // 构造允许的列表
        if (this.shouldType.length !== 0) {
            for (let i = 0; i < this.shouldType.length; i++) {
                this.shouldType[i] = `[object ${this.shouldType[i]}]`;
            }
        }

        if (this.notType.length !== 0 && this.notType.includes(Object.prototype.toString.call(this.target)))
            this.errStack.push(new Error(lan.done.notAllowedType));

        if (this.shouldType.length !== 0 && !this.shouldType.includes(Object.prototype.toString.call(this.target)))
            this.errStack.push(new Error(lan.done.wrongType));


        // 如果是Number类型的，需要判断是否是安全数
        if (Object.prototype.toString.call(this.target) === '[object Number]') {
            if (!Number.isSafeInteger(this.target))
                this.errStack.push(new Error(lan.done.notSafeNum));
        }
        if (this.errStack.length === 0)
            return this.target;
        else if (this.errStack.length !== 0)
            throw this.errStack[0];
    }

    /**
     * number类型
     */
    // 检查是否是number,还需要是安全数
    onlyNumber() {
        this.onlyType = 'Number';
        return this;
    }

    // 不为number
    notNumber() {
        this.notType.push('Number');
        return this;
    }

    // 可以是number
    isNumber() {
        this.shouldType.push('Number');
        return this;
    }

    // 限制number大小（在安全数范围内的小数依然不好判断）
    limitNum(max, min) {
        if (Object.prototype.toString.call(this.target) !== '[object Number]')
            this.target = Number(this.target);
        if (isNaN(this.target))
            return this;

        if (Object.prototype.toString.call(min) !== '[object Number]')
            min = Number(min);
        if (Object.prototype.toString.call(max) !== '[object Number]')
            max = Number(max);

        if (isNaN(min) || !Number.isSafeInteger(max))
            max = Number.MAX_SAFE_INTEGER;
        if (isNaN(max) || !Number.isSafeInteger(min))
            min = Number.MIN_SAFE_INTEGER;

        if (max < min) {
            let tmp = max;
            max = min;
            min = tmp;
        }

        if (!Number.isSafeInteger(this.target))
            this.errStack.push(new Error(lan.limitNum.notSafeNum));

        if (this.target < min || this.target > max)
            this.errStack.push(new Error(lan.limitNum.IllegalNum));

        return this;
    }

    /**
     * String类型
     */
    // 检查是否是string
    onlyString() {
        this.onlyType = 'String';
        return this;
    }

    // 不为string
    notString() {
        this.notType.push('String');
        return this;
    }

    // 可以是string
    isString() {
        this.shouldType.push('String');
        return this;
    }

    // 检查字符串长度(这里还需要判断一下array的长度，之后再加)
    limitLen(max, min = 0) {
        if (typeof max === 'undefined' || typeof max === 'null' || max === undefined || max === null)
            this.errStack.push(new Error(lan.limitLen.wrongArgv));

        if (typeof max !== 'number' || Object.prototype.toString.call(max) === '[object Number]')
            max = Number(max);

        if (typeof min !== 'number' || Object.prototype.toString.call(min) === '[object Number]')
            min = Number(min);

        if (isNaN(min))
            this.errStack.push(new Error(lan.limitLen.invalidArgvMin));

        if (isNaN(max))
            this.errStack.push(new Error(lan.limitLen.invalidArgvMax));

        max = parseInt(max);
        min = parseInt(min);

        if (max < min)
            this.errStack.push(new Error(lan.limitLen.illegalArgv));

        if (typeof this.target === 'number' && Object.prototype.toString.call(this.target) === '[object Number]') {
            // 如果是number类型的转为字符串类型进行判断
            let len = String(this.target).length;
            if (len < min || len > max)
                this.errStack.push(new Error('变量长度错误'));
        }
        else if ((typeof this.target === 'string' && Object.prototype.toString.call(this.target) === '[object String]') ||
            (typeof this.target === 'object' && Object.prototype.toString.call(this.target) === '[object Array]')) {
            // 如果是string或者array类型的直接进行判断（这里字符串如果是生僻字的字符串是否长度会有不一样，还有汉字也算一个长度单位）
            let len = this.target.length;
            if (len < min || len > max)
                this.errStack.push(new Error('变量长度错误'));
        }
        return this;
    }

    /**
     * Undefined类型
     */
    // 检查是否是undefined
    onlyUndefined() {
        this.onlyType = 'Undefined';
        return this;
    }

    // 不为undefined
    notUndefined() {
        this.notType.push('Undefined');
        return this;
    }

    // 可以是undefined
    isUndefined() {
        this.shouldType.push('Undefined');
        return this;
    }

    /**
     * Null类型
     */
    // 检查是否是null
    onlyNull() {
        this.onlyType = 'Null';
        return this;
    }

    // 不为null
    notNull() {
        this.notType.push('Null');
        return this;
    }

    // 可以是null
    isNull() {
        this.shouldType.push('Null');
        return this;
    }

    /**
     * Boolean类型
     */
    // 检查是否是boolean
    onlyBoolean() {
        this.onlyType = 'Boolean';
        return this;
    }

    // 不为boolean
    notBoolean() {
        this.notType.push('Boolean');
        return this;
    }

    // 可以是boolean
    isBoolean() {
        this.shouldType.push('Boolean');
        return this;
    }

    /**
     * Array类型
     */
    onlyArray() {
        this.onlyType = 'Array';
        return this;
    }

    // 不为Array
    notArray() {
        this.notType.push('Array');
        return this;
    }

    // 可以是Array
    isArray() {
        this.shouldType.push('Array');
        return this;
    }

    // 可以为empty
    isEmpty() {
        if (this.target !== '' &&
            this.target !== undefined &&
            this.target !== null &&
            !(Object.prototype.toString.call(this.target) === '[object Object]' && JSON.stringify(this.target) === JSON.stringify({})) &&
            !(Object.prototype.toString.call(this.target) === '[object Array]' && JSON.stringify(this.target) === JSON.stringify([])))
            this.errStack.push(new Error(`变量不为empty`));
        return this;
    }

    // 不为empty
    notEmpty() {
        if (this.target === '' ||
            this.target === undefined ||
            this.target === null ||
            (Object.prototype.toString.call(this.target) === '[object Object]' && JSON.stringify(this.target) === JSON.stringify({})) ||
            (Object.prototype.toString.call(this.target) === '[object Array]' && JSON.stringify(this.target) === JSON.stringify([])))
            this.errStack.push(new Error(`变量为empty`));
        return this;
    }


}

module.exports = typeChecker