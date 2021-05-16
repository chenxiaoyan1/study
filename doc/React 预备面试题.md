# React 预备面试题
- 说一下你对React的理解
	- 解题思路：
		- 是什么？
		- 能干什么
		- 如何干的
		- 干的怎么样，优缺点
	- React时什么
	Re act是一个用于构建用户界面的JavaScript库
	- React能干什么？
	可以通过组件化的方式构建快速响应的大型we b应用程序
	- React是如何干的
		- 声明式，只需要告诉程序我们需要什么，其他交给程序做
		- 组件化
		- 一次学习，到处编写
		 可以使用React开发web,android,ios和命令行程序
     reactNative使用react创建a n droid,ios的原生应用
  - React 干的 怎么样
  	- 优点
  	开发团队和社区强大
  	一次学习，随处编写
  	api比较简洁
  	- 缺点
  	没有官方系统解决方案，选型成本高
  	过于灵活，不容易写出高质量的应用
- 为什么React会引入jsx?
j s x是一个Javascript的语法扩展，是React.createElement的语法糖
使用了j s x后，代码结构清晰简洁，可读性强；结构，样式和事件能够实现高内聚低耦合，方便重用和组合；不用引入其他新的概念，只写JavaScript
- 说一下Virtual DOM 的理解
	- 虚拟DOM是一个描述真实DOM 的纯js对象，和平台无关，跨平台
	- React.createElement函数返回的就是一个虚拟DOM
	- 优缺点：
	优点：处理了浏览器兼容性问题，避免用户操作真实DOM，避免麻烦和出错
	     内容经过了xss处理，可以防范xss攻击
	     容易实现跨平台开发android,ios应用
	     更新的时候可以实现差异化更新，减少更新DOM的操作
	缺点：虚拟DOM需要消耗额外的内存
	     首次渲染其实并不一定更快
	
- 函数组件和类组件的相同点和不同点
	- 相同点
		
		- 他们都可以接收属性返回React元素
	- 不同点
		- 编程思想不同：类组件需要创建实例，是基于面向对象的方式编程，而函数式组件不需要创建实例，接收输入，返回输出，是基于函数式编程的思想
		- 内存占用：类组件需要创建并保存实例(如果实例删除了，就不能更新了，因为this没有了)，会占用一定的内存，函数组件不需要创建实例，可以节约内存占用
		```js
		//类组件的渲染
		let classComponent = new ClassComponent()//更新的时候用，这个实例不会被销毁
		let classComponentVDOM = classComponent.render()
		//函数式组件的渲染
		let functionComponentVDOM = FunctionComponent(props)
		```
		- 捕获特性：函数组件具有值捕获特性（因为闭包）
		- 可测试性：函数组件更方便编写单元测试
		- 状态：类组件有自己的实例，可以定义状态，而且可以修改状态更新组件，函数组件以前没有状态，现在可以使用useState使用状态
		- 生命周期：类组件有自己的生命周期，函数组件以前没有生命周期，现在可以使用useEffect实现类似生命周期的功能
		- 逻辑复用：类组件可以通过高阶组件实现逻辑复用，函数组件可以通过自定义hooks实现逻辑复用
		- 跳过更新：类组件可以通过shouldComponentUpdate和PureComponent来跳过更新，函数组件可以通过React.memo来跳过更新
		**手写shouldComponentUpdate???  **
		- 发展前景：未来函数组件会成为主流，因为他更好的屏蔽this问题，规范和复用逻辑，更好的适合时间切片和并发渲染
