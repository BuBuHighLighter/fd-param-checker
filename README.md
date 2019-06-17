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

**示例1**

```only*```限制仅为某一类型。
```js
function func(argv) {
    let param = new checker(argv).onlyNumber().done();      // 约束参数argv仅为Number类型，返回值保存到param对象中
}
```

**示例2**

```is*```声明可以为某一类型。
```js
function func(argv) {
    let param = new checker(argv).isNumber().isString().done()      // 约束参数argv可以为Number或者String类型
}
```

**示例3**

```not*```声明排除某一类型。
```js
function func(argv) {
    let param = new checker(argv).notBoolean().notUndefined().notNull().done();         // 约束参数argv不能为Boolean,Undefined,Null类型
}
```

**示例4**

```limitLen()```限制参数长度。注意：```limitLen()```方法仅对Number(隐式转换为String)、String、Array类型有效。

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

|参数名|必须|默认值|
|-|-|-|
|max|是|-|
|min|否|0|

**示例5**
```isEmpty()```限制参数仅可为“空参数”中某一种。“空参数”定义如下表：

|#|内容|说明|
|-|-|-|
|1|''|空字符串|
|2|undefined|Undefined类型|
|3|null|Null类型|
|4|{}|空对象|
|5|[]|空数组|

```js
function func(argv) {
    let param = new checker(argv).isEmpty().done();
}
```

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
