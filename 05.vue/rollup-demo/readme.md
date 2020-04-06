# 入门
## 打包第一个bundle
```js
//使用 Rollup 最简单的方法是通过 Command Line Interface （或 CLI）。先全局安装 Rollup （之后会介绍如何在项目中进行安装，更便于打包，但现在不用担心这个问题）。在命令行中输入以下内容：
npm install rollup --global
//现在可以运行 rollup 命令了。试试吧~
rollup
//我们来创建一个简单的项目：
mkdir -p src/demo01/main.js
cd src/demo01/main.js
//首先，我们需要个 入口。将以下代码粘贴到新建的文件 src/demo01/main.js 中：
import foo from './foo.js';
var a= 1
setTimeout(()=>{
    console.log('啊哈哈')
},200)
export default function () {
  console.log(foo);
}
//之后创建入口文件引用的 foo.js 模块：
export default 'hello world!';
//cmder中执行 格式：cjs:commonjs
rollup src/main.js  -o bundle.js  -f cjs
```
## 使用配置文件
上面的方式还不错，但是如果添加更多的选项，这种命令行的方式就显得麻烦了。为此，我们可以创建配置文件来囊括所需的选项。配置文件由 JavaScript 写成，比 CLI 更加灵活。在项目中创建一个名为 rollup.config.js 的文件，增加如下代码：
```js
// rollup.config.js
export default {
    //入口
  input: 'src/demo01/main.js',
  //产出
  output: {
      //文件名
    file: 'bundle.js',
    // 代码格式  commonjs 服务端执行的代码
    format: 'cjs'
  }
};
```
cmder 中执行 rollup -c
```js

rollup -c
// -c  默认以rollup.config.js 为配置文件  当然你也可以通过一下配置类指定不同环境的配置文件
rollup --config rollup.config.dev.js
rollup --config rollup.config.prod.js

//生成的bundle.js
'use strict';
var foo = 'hello world!';
setTimeout(()=>{
    console.log('啊哈哈');
},200);
function main () {
  console.log(foo);
}
module.exports = main;
```
## 使用插件 
目前为止，我们通过相对路径，将一个入口文件和一个模块创建成了一个简单的 bundle。随着构建更复杂的 bundle，通常需要更大的灵活性——引入 npm 安装的模块、通过 Babel 编译代码、和 JSON 文件打交道等。此教程中，我们将使用 rollup-plugin-json，令 Rollup 从 JSON 文件中读取数据。将 rollup-plugin-json 安装为开发依赖：
```js
npm install --save-dev rollup-plugin-json
//我们用的是 --save-dev 而不是 --save，因为代码实际执行时不依赖这个插件——只是在打包时使用。
```
更新 src/main.js 文件
```js
import foo from './foo.js';
import { version } from '../../package.json';
var a= 1
setTimeout(()=>{
    console.log(`啊哈哈${'version'+version}`)
},200)
export default function () {
  console.log(foo);
}
```
rollup.config.js引入插件
```js
import json from 'rollup-plugin-json';
export default {
    //入口
  input: 'src/demo01/main.js',
  //产出
  output: {
      //文件名
    file: 'bundle.js',
    // 代码格式  commonjs 服务端执行的代码
    format: 'cjs'
  },
  plugins:[
      json()
  ]
};
```
为了使用方便在packjson中配置build
```js
"scripts": {
    "build":"rollup -c"
},
```
npm run build 执行 Rollup。结果如下：
```js
'use strict';

var foo = 'hello world!';

var version = "1.0.0";

setTimeout(()=>{
    console.log(`啊哈哈${'version'+version}`);
},200);


function main () {
  console.log(foo);
}

module.exports = main;
```

### 常用的插件列表
- rollup-plugin-json 处理json
```js
import json from 'rollup-plugin-json';
plugins:[
  json()
]
```
- rollup-plugin-node-resolve  rollup无法识别node_modules中的包，需要安装这个插件支持，合并外部模块代码
- rollup-plugin-commonjs 支持CommonJS模块 node_modules中的包大部分都是commonjs格式的，要在rollup中使用必须先转为ES6语法，为此需要安装插件 rollup-plugin-commonjs 将非ES6语法的包转为ES6可用
- rollup-plugin-buble 将ES6+代码编译为ES2015 rollup 的 babel 插件，ES6转ES5
- rollup-plugin-flow-no-whitespace  正确去掉flow的类型检查代码
- rollup-plugin-alias 正确去掉flow的类型检查代码
- rollup-plugin-uglify   // 压缩包
- rollup-plugin-replace  插件的用途是在打包时动态替换代码中的内容

```js 
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble'
import alias from 'rollup-plugin-alias'
import uglify from 'rollup-plugin-uglify'     
import flow from 'rollup-plugin-flow-no-whitespace'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import path from 'path'
const pathResolve = p => path.resolve(__dirname, p)
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js'
    format: 'cjs'
  },
  plugins: [ 
    flow(),
    resolve(),
    commonjs(),
    buble(),
    alias({
      '@': pathResolve('src')
    }),
    uglify() ,
    replace({
      __SAM__: true
    }),
    terser({
      output: {
        ascii_only: true // 仅输出ascii字符
      },
      compress: {
        pure_funcs: ['console.log'] // 去掉console.log函数
      }
    })
  ]
};
```
## 命令行
### 配置文件
Rollup的配置文件是可选的，但是使用配置文件的作用很强大，而且很方便，因此我们推荐你使用<br>
配置文件是一个ES6模块，它对外暴露一个对象，这个对象包含了一些Rollup需要的一些选项。通常，我们把这个配置文件叫做rollup.config.js，它通常位于项目的根目录 
[参考链接](https://www.rollupjs.com/guide/big-list-of-options/)

```js
// rollup.config.js
export default {
  // 核心选项
  // 必须 String 打包入口
  input,
  // 外链引用 不打入主包的库 通常配合globals使用
  external,
  plugins,

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file,    // 必须 要写入的文件名
    // 必须 
    // String 生成包的格式。 下列之一:
    // amd – 异步模块定义，用于像RequireJS这样的模块加载器
    // cjs – CommonJS，适用于 Node 和 Browserify/Webpack
    // esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
    // iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    // umd – 通用模块定义，以amd，cjs 和 iife 为一体
    // system - SystemJS 加载器格式
    format,  
    // 生成的包名 可以通过global[name]访问
    name,
    globals,

    // 额外选项 而允许您（例如）从CDN加载依赖关系
    paths,
    // banner: '/* my-library version ' + version + ' */', 打出来包的头部注释和声明
    banner,
    //footer: '/* follow me on Twitter! @rich_harris */',打出来包的尾部部注释和声明
    footer,
    //在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
    intro,
    //在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
    outro,
    // 如果 true，将创建一个单独的sourcemap文件。如果 inline，sourcemap将作为数据URI附加到生成的output文件中 开发时候打开 定位错误
    sourcemap,
    //生成的包的位置。如果这是一个绝对路径，sourcemap中的所有源代码路径都将相对于它
    sourcemapFile,
    //Boolean 是否添加'interop块'。默认情况下（interop：true），为了安全起见，如果需要区分默认和命名导出，则Rollup会将任何外部依赖项“default”导出到一个单独的变量。这通常只适用于您的外部依赖关系（例如与Babel）（如果您确定不需要它），则可以使用“interop：false”来节省几个字节(以下这一行)。 建议打开
    // function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
    interop,

    // 高危选项
    exports,
    amd,
    indent
    strict
  },
};
```

### 命令行的参数

