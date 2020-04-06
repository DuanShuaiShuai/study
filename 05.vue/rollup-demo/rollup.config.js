import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import flow from 'rollup-plugin-flow-no-whitespace';
import replace from 'rollup-plugin-replace'
let version='1.0.1'
export default {
    //入口
  input: 'src/demo01/main.js',
  //产出
  output: {
      //文件名
    file: './dist/bundle.js',
    // 代码格式  commonjs 服务端执行的代码
    format: 'cjs',
    name:'libry',
    globals:{
      jquery:'$'
      // path:'path',
      // fs:'fs'
    },
    banner: '/* my-library version ' + version + ' */',// 打出来包的头部注释和声明
    footer: '/* follow me on Twitter! @rich_harris */',//打出来包的尾部部注释和声明
    intro: 'var ENVIRONMENT = "production";',
    sourcemap:true,
    // interop:true
  },
  // external: [ 'path','fs' ],
  external: [ 'jquery' ],
  plugins:[
      replace({
        __DEV__: true
      }),
      flow(),
      resolve(),
      commonjs(),
      json(),
      buble()
  ]
};