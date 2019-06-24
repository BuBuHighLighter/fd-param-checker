## 简介 (Introduce)

fd-param-checker是一个用于参数检测的工具包，致力于快速完成参数检测条件的约束
## 安装 (Install)

```bash
$ npm install fd-param-checker
```

## 使用 (Usage)

#### 引入模块
```js
const checker = require('fd-param-checker');
```

#### 链式操作
使用```new checker()```构造一个参数检查对象，之后调用对应检查方法。

**注意**

链式操作末尾必须使用```done()```方法进行收尾操作。

#### only约束

```only*```限制**仅**为某一类型。
```js
function func(argv) {
    let param = new checker(argv).onlyNumber().done();      // 约束参数argv仅为Number类型，返回值保存到param对象中
}
```

**only\*包含的约束**
| 方法名          | 参数 | 说明 |
| --------------- | ---- | ---- |
| onlyNumber()    | -    | -    |
| onlyString()    | -    | -    |
| onlyUndefined() | -    | -    |
| onlyNull()      | -    | -    |
| onlyBoolean()   | -    | -    |
| onlyArray()     | -    | -    |


#### is约束

```is*```声明**可以**为某一类型。
```js
function func(argv) {
    let param = new checker(argv).isNumber().done()      // 约束参数argv可以为Number类型（不为Number类型则会抛出异常）
}
```
约束变量时可以使用多个is*方法进行约束，表示该变量可以是多个约束条件中的一个。
```js
function func(argv) {
    let param = new checker(argv).isNumber().isString().dome()      // 约束参数argv可以为Number或者String类型
}
```

**is\*包含的约束**
| 方法名        | 参数 | 说明                                      |
| ------------- | ---- | ----------------------------------------- |
| isNumber()    | -    | -                                         |
| isString()    | -    | -                                         |
| isUndefined() | -    | -                                         |
| isNull()      | -    | -                                         |
| isBoolean()   | -    | -                                         |
| isArray()     | -    | -                                         |
| isEmpty()     | -    | empty包括：```, undefined, null, [], {}`` |

**注意**
1.isEmpty()允许变量可以是“空”变量，包括：```'', undefined, null, [], {} ```。

#### not约束

```not*```声明排除某一类型。
```js
function func(argv) {
    let param = new checker(argv).notBoolean().notUndefined().notNull().done();         // 约束参数argv不能为Boolean,Undefined,Null类型
}
```

**not\*包含的约束**
| 方法名         | 参数 | 说明                                      |
| -------------- | ---- | ----------------------------------------- |
| notNumber()    | -    | -                                         |
| notString()    | -    | -                                         |
| notUndefined() | -    | -                                         |
| notNull()      | -    | -                                         |
| notBoolean()   | -    | -                                         |
| notArray()     | -    | -                                         |
| notEmpty()     | -    | empty包括：```, undefined, null, [], {}`` |

#### limitLen约束

```limitLen()```限制参数长度。注意：```limitLen()```方法仅对Number(隐式转换为String，检查Number的字符长度)、String、Array类型有效。

```js
    function func(argv) {
        let param = new checker(argv).isNumber().isString().isArray().limitLen(9).done();       // 约束参数可以是Number,String,Array类型，且长度为[0,9]
    }
```
limitLen参数列表

```js
function limitLen(max, min=0) {
    /* 内部实现代码 */
}
```

| 参数名 | 必须 | 默认值 |
| ------ | ---- | ------ |
| max    | 是   | -      |
| min    | 否   | 0      |

#### limitNum约束
```limitNum()```约束Number类型的数值范围。

**注意**

1.因为涉及到安全数的概念，所以如果数值超过安全数范围(Number.MIN_SAFE_INTEGER~Number.MAX_SAFE_INTEGER)的话，则会失去比较意义。

2.该取值范围为闭区间，如果目标值等于参数也是属于允许范围的。

```js
function func(argv) {
    let param = new checker(argv).limitNum(9, 5).done();
}
```

limitNum参数列表
```js
function limitNum(max, min) {
    /* 内部实现代码 */
}
```

|参数名|必须|默认值|
|-|-|-|
|max|是|-|
|min|是|-|

#### 错误处理
如果参数不满足约束条件，则会在链式操作中抛出异常。目前的错误处理只能在链式操作之外使用```try...catch```。

```js
function func(argv) {
    let param;
    try {
        param = new checker(argv).isNumber().isString().limitLen(5).done();
    }
    catch(e) {
        console.error(e);
    }
}
```
