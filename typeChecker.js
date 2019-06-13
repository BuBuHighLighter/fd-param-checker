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
        if(typeof this.target !== 'number')
            throw new Error(lan.isNumber.notNumber);
        
        if(!Number.isSafeInteger(this.target))
            throw new Error(lan.isNumber.notSafeNumber);
        return this;
    }

    // 不为number
    notNumber() {
        if(typeof this.target === 'number')
            throw new Error(lan.isNumber.isNumber);
        return this;
    }

    /**
     * string操作
     */
    // 检查是否是string
    isString() {
        if(typeof this.target !== 'string')
            throw new Error('not string');
        return this;
    }

    // 不为string
    notString() {
        if(typeof this.target === 'string')
            throw new Error('is string');
        return this;
    }

    // 检查字符串长度
    limitLen(max, min=0) {
        if(typeof max === 'undefined' || typeof max === 'null' || max === undefined || max === null) 
            throw new Error('require param max');

        if(typeof max !== 'number')
            max = Number(max);

        if(typeof min !== 'number')
            min = Number(min);

        if(isNaN(min))
            throw new Error('illegal param min');

        if(isNaN(max))
            throw new Error('illegal param max');

        if(max < min)
            throw new Error('illegal params');

        if(typeof this.target === 'number') {
            // 如果是number类型的转为字符串类型进行判断
            let len = String(this.target).length;
            if(len < min || len > max)
                throw new Error('length is illegal');
        }
        else if(typeof this.target === 'string') {
            // 如果是string类型的直接进行判断（这里字符串如果是生僻字的字符串是否长度会有不一样，还有汉字也算一个长度单位）
            let len = this.target.length;
            if(len < min || len > max)
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
        if(typeof this.target !== 'undefined' || this.target !== undefined)
            throw new Error('not undefined');
        return this;
    }

    // 不为undefined
    notUndefined() {
        if(typeof this.target === 'undefined' || this.target === undefined)
            throw new Error('is undefined');
        return this;
    }

    /**
     * null操作
     */
    // 检查是否是null
    isNull() {
        if(typeof this.target !== 'null' || this.target !== null)
            throw new Error('not null');
        return this;
    }

    // 不为null
    notNull() {
        if(typeof this.target === 'null' || this.target === null)
            throw new Error('is null');
        return this;
    }

    /**
     * boolean操作
     */
    // 检查是否是boolean
    isBoolean() {
        if(typeof this.target !== 'boolean' || (this.target !== true && this.target !== false))
            throw new Error('not boolean');
        return this;
    }

    // 不为boolean
    notBoolean() {
        if(typeof this.target === 'boolean' || this.target === true || this.target === false)
            throw new Error('is boolean');
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