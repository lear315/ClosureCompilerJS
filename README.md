A Tool for Google Closure Compiler with laya or other JS engine, with a lovely and simple API.
See <https://womenzhai.cn/project> for all the documentation.

# 全局安装closure-compiler

npm i -g google-closure-compiler

# 安装环境

npm i

# 定制tsickle

由于目前tsickle不支持get set语法的转义,所以需要手动修改添加支持
文件位置 node_modules\tsickle\out\src\externs.js
将hack/externs.js替换覆盖掉原版即可

# 准备

src/bundle.js 是需要进行压缩混淆的文件

libs 文件夹下放置的是项目引用到的d.ts声明文件,在混淆时,在代码中这些函数和变量不会被改变.如果使用了新的d.ts,需要更新它们

externs/ignore_externs.js 是手动配置忽略混淆的函数和变量的文件

bin 文件夹下是输出压缩混淆的文件的地方

# 使用说明

npm run build

# 注意事项

1.枚举类型enum,要严格按照规范做const声明

因为枚举不是常量枚举，没有使用const关键字修饰时,TypeScript在编译的时候,枚举会被编译成IIFE这种在声明同时立即调用的形式
,导致混淆内联失败.
另外编译器配置同样不要开启preserveConstEnums选项,isolatedModules选项它们会导致同样的问题

```
export enum YourEnumType {
    None = 0,
    OneThing = 1,
    OtherThing = 2
}

// Ts编译成js后IIFE形式

var YourEnumType;
(function (YourEnumType) {
    YourEnumType[YourEnumType["None"] = 0] = "None";
    YourEnumType[YourEnumType["OneThing"] = 1] = "OneThing";
    YourEnumType[YourEnumType["OtherThing"] = 2] = "OtherThing";
})(YourEnumType = exports.YourEnumType || (exports.YourEnumType = {}));

// 你应该
export const enum YourEnumType {
    None = 0,
    OneThing = 1,
    OtherThing = 2
}
```

2. 混淆内联失败时,请检查是否显式的创建新的属性被混淆后在外部调用非混淆

```
var a = 1;
var b = 2;

var obj = {a, b}

// 在外部调用非混淆时,应该修改为

var obj = {"a": a, "b": b}

```

3. 如果你像我一样,在Ts中使用了函数的装饰器
你可以使用buildprepare编译命令,保证装饰器属性获取正常
```
npm run buildprepare
```

4. 第一次使用GCC,肯定有各种的混淆内联问题,这是正常的,要耐心解决.都是有解的,不用放弃.