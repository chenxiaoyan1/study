# CommonJS,AMD和CMD
> 首先：CommonJS,AMD,CMD都是js的模块规范

## 背景
node.js的模块系统是参照CommonJS 规范实现的，CommonJS 主要是为了js在后端的表现制定的，他是同步加载模块的，，他不适合前端
，为了适合前端，AMD(异步模块定义)和CMD模范出现，他们都是异步加载的，主要是为了前端js的表现制定规范；RequireJS实现了AMD规范，
sea.js实现了CMD规范；之后ES2015发布之后又出现了新的模块引入方式ES6 module，ES6加载模块并没有指定同步或异步，
如何加载ES6定义的模块取决于代码的运行环境
## CommonJS和ES6模块的差异
- CommonJS 模块输出是一个值的拷贝，也就是说一旦输出一个值，模块内部的变化影响不到这个值；
ES6模块输出是值的引用
- CommonJS 模块是运行时加载，ES6模块是编译时执行
- CommonJS 模块的require（）是同步加载模块，es6模块的import是异步加载
- CommonJS 模块顶层的this指向当前模块，ES6模块顶层的this指向undefined
## CommonJS规范
### require.js
> require.js怎么使用参照https://www.cnblogs.com/chenguangliang/p/5856701.html

## es6 import export 模块方式
- es6模块不会缓存运行结果，而是动态的去加载的模块中取值，读出的变量不可以重新赋值（对象可以改变属性，但是不可以重新赋值）

- import引入模块会在编译时就处理，所以import和export只能放在
模块的顶层，不能在代码块中（比如if，或函数中，因为编译时是不会去分析if语句的）

- 这样有利于编译器提高效率，但是导致无法在运行时加载模块，因此ES2020提案
引入了import（）函数，支持动态加载模块，import()返回一个Promise对象，
在代码运行的时候，什么时候运行到import（），什么时候再去加载这个指定的模块，
import()和node 的require方法类似，只不过import()是异步记载，require是同步加载
import()的使用场景：
- 按需加载
```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
//，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

```
- 条件加载
```js

if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```
-动态的模块路径

循环引用问题
看一下这个文章：https://es6.ruanyifeng.com/#docs/module-loader
https://juejin.cn/post/6920773247948554248#heading-6