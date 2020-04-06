# flow基础入门
JavaScript是一个弱类型的解释性语言，无法在编译环节进行静态类型校验，如果想JS也具备静态类型检查功能。那就得使用到Flow,Flow由Facebook推出，[官网链接,请点击](https://flow.org/)。Flow与微软的TypeScript有些类似，但TypeScript其实像是另一门新语言，而Flow可以理解为一个工具，像vue2、react等都是基于Flow开发，所以很有必要了解一下Flow。

## 安装flow
```js
    npm i flow-bin -g
```
## 初始化
```js
flow init
//它会在当前目录下生成一个.flowconfig文件，内容如下
//.flowconfig
[ignore]

[include]

[libs]

[lints]

[options]

[strict]
```
## 如何使用flow
需要添加flow注释，凡加Flow注释的文件，以下称flow文件，flow文件就是将// @flow或 /* @flow */加到js文件的最顶部。只有flow文件，flow进程才会在后台监视这些文件，当有类型检查时，有错误它就会报错
准备第1个js文件: 内容如下
```js
// @flow
function square(n:number): number {
    return n * n;
}

square('2')
//执行 flow check 报错如下
Error ---------------------------------------------------------------------------- a.js:12:8

Cannot call `square` with `'2'` bound to `n` because string [1] is incompatible with number [2].

   a.js:6:8
   6| square('2')
             ^^^ [1]
References:
   a.js:2:19
   2| function square(n:number): number {
                        ^^^^^^ [2]
Found 1 error
//将square('2')改为square(2)再flow check看下
Found 0 errors
```
## 删除flow类型标注
function square(n:number): number {中的类型标注，如:number，含有这样的js文件，事实上运行起来会报错的，不论是在nodejs还是浏览器中，现在在nodejs中运行测试下
```js
$ node a.js
F:\youshengyouse\del\a.js:2
function square(n:number): number {
                 ^

SyntaxError: Unexpected token :
    at new Script (vm.js:79:7)
    at createScript (vm.js:251:10)
    at Object.runInThisContext (vm.js:303:10)
    at Module._compile (internal/modules/cjs/loader.js:657:28)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
    at startup (internal/bootstrap/node.js:283:19)
```
将两个:number去掉再测试下，不会报错。所以说flow文件是两个过程，编程时加上类型检查，最后成品代码中，得将所有的类型约束要去掉，去掉这个过程肯定不能人工操作，有相应的程序处理。目前有两个方法去掉类型注解，一是包flow-remove-types，二是在babel中去掉
### flow-remove-types
```js
//安装包
npm install --save-dev flow-remove-types
//配置script flow-remove
"scripts": {
    "flow-remove": "flow-remove-types src/ -d lib/"
},
//运行
npm run flow-remove
//发现对应的lib中的文件已经删除对应的类型检查
//flow/main.js
function square(n){
  return n * n;
}
square(2);
```
### @babel/preset-flow
```js
//下载对应的包
npm i  @babel/cli @babel/core @babel/preset-flow -D
//配置.babelrc
{
    "presets": ["@babel/preset-flow"]
}
//配置script
"scripts": {
     "node":"babel-node ./src/flow/test.js"
},
//之后就可以正常运行
npm run node 
```

## 在vs code中配置类型,自动类型检查
在VS Code中搜索flow，发现有vscode-flow-ide、Flow-Language-Support两个插件，在这里以vscode-flow-ide为例
先安装vscode-flow-ide
条件：
- 项目根目录有配置文件.flowconfig
- nodejs添加到了环境变量path中
- 全局或项目内安装了flow,推荐全局安装flow-bin

### 配置(默认就行)
VS Code左下角管理/设置/User Settings/Extensions/Flow-IDE Configurations(只有启用后才能配置，否则找不到这项)，下面是文字版，实际上在面板中就可以设置

- flowide.enable: 启用/关闭
- flowide.pathToFlow: Absolute path to the Flow executable. Set it only if the default behaviour of the extension doesn't work out for you. The extension will try first to read it from local node_modules/flow-bin or globally if not otherwise set here.
- flowide.useCodeSnippetsOnFunctionSuggest - Add the function paramters when selecting a function to autocomple.
重启vs Code，就会发现可以报错了，现在可以去掉顶部的// @flow及传递不合要求的参数测试下。

## 注意
重启vs Code，就会发现可以报错了，现在可以去掉顶部的// @flow及传递不合要求的参数测试下。
如果在problem窗口有错误，[ts]'types' can only be used in a .ts file. 8010，请在扩展中找到typescript，找到"javascript.validate.enable": false


