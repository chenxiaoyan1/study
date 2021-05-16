# vue.config.js
> node.js代码,最终会被vue-cli解析，项目本身的配置或webpack的配置
```js
const path = require('path')

//获得绝对路径
function resolve(dir){
	return path.join(__dirname,dir)
}
module.exports = {
	publicPath:'/project_name',
	devServer:{
		port:"8080"
	},
	//webpack的配置
	configureWebpack:{
	//可以在index.html中通过<%= webpackConfig.name %>获得该name的值
		name:"目录系统"
	},
	//链式配置
	chainWebpack(config){
	//1、修改当前项目默认svg配置：排除icons目录
		config.module.rule('svg')
			.exclude.add(resolve('./src/icons'))
		//2、新加一个rule:添加icons里面svg
		config.module.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('./src/icons')).end()//这里add后上下文变了，要回退到上级
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
				.options({symbolId:'icon-[name]'})
	}
}
```

# svg
```html
<svg>
	<use xlink:href="#icon-denglong" />
</svg>
```
# 权限控制
- 项目的路由权限是怎样控制的
	- 登录
	> 填写用户名密码后向服务端请求验证，服务端会返回一个token ,将token存储到cookie中
	> 方式一 前端路由权限控制：路由表里meta里配置roles项。通过router.beforeEach全局路由拦截每一个路由判断是否有token,没有则登陆，有则继续判断，判断vuex store中role是否存在，若存在则next,若不存在则将token传递给服务器调用getInfo接口获得用户信息，根据role判断出有权限的路由，通过router.addRoutes动态挂载路由
	> 方式二 后端直接返回路由：路由表里meta里不用配置roles项，通过router.beforeEach全局路由拦截每一个路由判断是否有token,没有则登陆，有则直接调用后台接口返回有权限的路由，然后router.addRoutes动态挂载路由
- 按钮权限
	> 可以通过自定义一个指令，判断role是否符合条件，不符合，则removeChild(el)
	> 或者用v-if来判断是否符合条件，不符合条件，就不渲染