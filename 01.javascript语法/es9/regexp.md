## dotAll  s就是这个模式

```js
console.log(/foo.bar/.test('foo\nbar')) //false
console.log(/foo.bar/.test('foozbar')) //true
console.log(/foo.bar/us.test('foo\nbar')) //true
o
const re=/foo.bar/
console.log(re.dotAll)  //判断是否开启dotall模式
```


```js
console.log('2019-06-07'.math(/(\d{4})-(\d{2})-(\d{2})/))
const t='2019-06-07'.math(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/)
console.log(t[1])  // 2019
console.log(t[2])  //  06
console.log(t[3])  //  07
console.log(t.groups.year)  //  2019
console.log(t.groups.month)  //  06
console.log(t.groups.day)  //  07
```


## 断言
```js
//先行断言  从前向后断言
let test='hello world'
//hello 后面是world
console.log(test.match(/hello(?=\sworld)/))
//world前面是hello
console.log(test.match(/(?<=hello\s)world/))
```