# webpack(此文档现有内容基于webpack4)
webpack is a module bundler(模块打包⼯工具)
Webpack是⼀一个打包模块化JavaScript的⼯工具，它会从⼊入⼝口模块出发， 识别出源码中的模块化导⼊入语句句，递归地找出⼊入⼝口⽂文件的所有依赖，将⼊入 ⼝口和其所有的依赖打包到⼀一个单独的⽂文件中

## 基本概念
- chunk 代码块。一个代码块可以由多个模块组成，一个入口是一个chunk，一个chunk可能有很多依赖
- bundle 资源文件 一个chunk对应一个bundle
- webpack 默认只支持j s,json文件
- loader 执行顺序是从右到左，从下到上
## 安装
```shell
npm install -D webpack
#安装webpack4 需要额外安装webpack-cli
npm install -D webpack-cli
```
## 执行构建
```shell
npx webpack
```
## webpack.config.js 
### 默认配置
```js
const path = require("path");
module.exports = {
    // 必填  webpack执⾏行行构建⼊入⼝口
    entry: "./src/index.js",
    output: {
        //将所有依赖的模块合并输出到main.js
        filename: "main.js",
        //输出⽂文件的存放路路径，必须是绝对路路径
        path: path.resolve(__dirname, "./dist")
    }
};
```
### entry
值有三种：字符串，数组，对象形式
> 对象形式可以实现多入口功能，多入口对应着多出口 ，文件名称用占位符[name].js
> 数组：不能解决多入口问题，只是拼接成一个j s

### 占位符问题：
- hash :整个项目的hash值，每构建一次就会有一个hash，只要有项目文件改变，hash就会变
- chunkhash:根据不同入口（entry）进行依赖解析，构建对应的chunk,生成相应的hash,只有组成entry的模块没有内容变化，则对应的hash不变，很好的利用了浏览器缓存
>(补充：相对于多入口而言（entry对象形式），不同入口文件及他们的依赖文件是有不同的chunkhash的，当其中一个依赖文件修改的时候，打包后，依赖于这个依赖文件的入口文件chunkhash变化，这个入口文件依赖的其他文件chunkhash也会变化，没有依赖关系的chunkhash不变)

- contenthash：和单个文件的内容有关，指定文件的内容发生改变，就会改变contenthash
>（上面chunkhash问题：当css配置文件名为chunkhash的时候，js文件变化，这个文件引入了css文件，则打包后该css文件的chunkhash也会变化，所以css文件的名称不能用chunkhash，用contenthash，根据文件内容决定hash是否变化，不取决于依赖文件）

- name
- id
> [name]-[hash:6].js 表示ha sh长度为6位，多长20位

### mode
构建模式 none production development
> production 代码会压缩，进行一些优化
> development 代码不会被压缩
> 
### dev-tool
source-map 文档中

## loader
### 配置打包css
- css-loader 把css模块内容放到j s模块中去
- s tyle-loader 从j s中提取c s s,在html中创建style标签，把css内容放到该标签中去
```js
 {
                test:/\.css$/,
                //注意前后顺序，执行的时候，是先执行css-loader 再执行style-loader
                use:["style-loader","css-loader"]
            }
```
### postcss-loader 为样式自动加上后缀
postcss-loader 为样式自动加上前缀，解决c s s3兼容问题，postcss.config.js文件配置postcss
- 安装
```shell
npm i  postcss-loader autoprefixer -D
```
```js
//webpack.config.js
 {
                test:/\.css$/,
                use:["style-loader","css-loader","postcss-loader"]
            }
```
```js
//postcss.config.js
let autoprefixer = require("autoprefixer")
module.exports = {
    plugins: [
        require("autoprefixer")(
            {
                overrideBrowserslist: ["last 2 versions", ">1%"]
            })
    ]
};
```
### file-loader
当我们需要模块，仅仅是从源代码挪移到打包目录下，就可以使用file-loader来处理，例如txt,svg,excel,图片等
- 安装
```shell
npm install file-loader -D
```
```webpack.config.js
 {
                test:/\.jpg|png|jpe?g|gif$/,
                use:[
                    {
                        loader:"file-loader",
                        options:{
                        //ext为文件后缀名
                            name:'[name].[ext]',
                            //打包后文件存放位置
                            outputPath:"./images/"
                        }
                    }
                ]
            }

```
### url-loader
 url-loader 包含file-loader file-loader能实现的功能url-loader都能实现，推荐使用url-loader，因为多一个limit参数
limit:2*1024 单位是字节，小于设置的这个值，图片转化为base64 推荐小体积图片转成base64

- 安装
```shell
npm install url-loader -D
```
```js
{
                        loader:"url-loader",
                        options:{
                            //打包后文件名称 占位符
                            name:'[name].[ext]',
                            //打包后文件输出路径
                            outputPath:"./images/",
                            //当文件大小小于设定的这个值的时候会将文件转成base64,大于这个设置值的时候就会正常将图片挪移到打包目录下
                            limit:5*1024 //单位是字节
                        }
                    }
```


## plugin
### html-webpack-plugin 默认支持ejs模版语法
> 读取源代码中某个html文件，自动生成到打包后目录中，并 把打包生成的js模块引⼊到该html中。
> 参数：
> filename 输出文件名，也可以带目录
> title 生成页面的title 配合页面中设置 <title><%=htmlWebpackPlugin.options.title %></title>
> template 模板文件路径
> mi nify 压缩

- 安装
```shell
npm install html-webpack-plugin -D
```
- 配置
```js
   plugins:[
   //默认配置，读取src/index.html 输出到dist目录下
        new HtmlWebpackPlugin()
    ]
    //自定义配置
       plugins:[
        new HtmlWebpackPlugin({
        	//输出页的title
            title:"首页",
            //输出文件名，也可以带目录
            filename:"html/main.html"
        })
    ]
```
###  clean-webpack-plugin
> 自动清理di s t文件夹
- 安装
```shell
npm install --save-dev clean-webpack-plugin
```
```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
...
plugins: [    new CleanWebpackPlugin() ]
```


###  mini-css-extract-plugin
将css提取到单独的文件中
- 安装
```shell
npm install mini-css-extract-plugin -D
```
- 配置
```js
{
                test:/\.css$/,
                use:[
                  //不用style-loader用MiniCssExtractPlugin
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader","postcss-loader"
                ]
            },
            
            
//plugins
   new MiniCssExtractPlugin(
            {
                filename: "./css/[name]-[contenthash:6].css"
            }
            )
```
### proxy
跨域问题
```js
proxy: {  
	"/api": {        target: "http://localhost:9092"      } 
    }

```

###本地mock server

### HMR 热模块替换(待整理)
若使用了mini-css-extract-plugin的话，对HMR有影响，一般开发环境下建议不使用这个plugin ，使用style-plugin

hotOnly: 即使HMR没有生效，浏览器也不要自动刷新

css HMR

js HMR


## babel（待整理）
exclude://node_modules //排除

polyfill 垫片 ES6+的ECMA规范库，引进来处理promise,async等语法
要按需加载，否则打包后的文件太大useBuiltIns:"usage"按需加载
runtime是转换，polyfill不是转换，是相当于自己实现了promise，放到打包文件中

是否挂载在widow上？是否自创建Promise?

polyfill方式会影响全局对象



output里面的publicPath表示的是打包生成的index.html文件里面引用资源的前缀；
devServer里面的publicPath表示的是打包生成的静态文件所在的位置（若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值）；





## WebpackDevServers 
每次改完代码都需要重新打包⼀一次，打开浏览器器，刷新⼀一次，很麻 烦,我们可以安装使⽤用webpackdevserver来改善这块的体验,基于express 启动服务，将资源放到内存中，不放到dist中，浏览器从内存中获得资源文件，对应we b pa c k中配置 de vServer:contextBase 目录路径 port端口 open. 是否自动打开浏览器
- 安装
```shell
 npm install webpack-dev-server -D 
```
- 配置
```js
//webpack.config.js
 devServer: {
        // contentBase: "./dist",
        open: true,
        port: 8081
    },
```
```json
//package.json
"server": "webpack serve"
```

## 优化
### 优化开发体验
> 提升效率
> 优化构建速度
#### 优化loader
> 通过include(包含),exclude(排除)配置项来缩小loader的处理范围
```js
            {
                test:/\.css$/,
                include:[path.resolve(__dirname,"./src")],//在include配置的文件夹中找css文件
                use:[
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader","postcss-loader"
                ]
            },
```

#### 优化resolve.modules配置
resolve.modules用于配置webpack去哪些目录下寻找第三方模块，默认是['node_modules']
```js
 resolve:{
 //上哪里找第三方模块
        modules:[path.resolve(__dirname,"./node_modules")],
   }
```

#### 优化resolve.alias配置
> resolve.alias通过配置别名来将原导入路径映射成一个新的导入路径
> 默认情况下，webpack会从⼊入⼝口⽂文件./node_modules/bin/react/index开始递归解析和处理理依赖 的⽂文件。我们可以直接指定⽂文件，避免这处的耗时。
cjs
采⽤用commonJS规范的模块化代码
umd
已经打包好的完整代码，没有采⽤用模块化，可以直接执⾏行行

```js
 resolve:{
        alias:{
            react:path.resolve(__dirname,"./node_modules/react/umd/react.production.min.js"),
            "react-dom":path.resolve(__dirname,"./node_modules/react-dom/umd/react-dom.production.min.js"),
        }
    },
```

#### resolves.resolve配置
导⼊入语句句没带⽂文件后缀时，webpack会⾃自动带上后缀后，去尝试查找⽂文件是否存
在。建议都带上后缀
```js
resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json'],
  },
```


#### externals 不打包某文件，使用cdn方式引入
- 开发的时候正常import即可，配置externals设置不打包某文件，使用c d n方式引入，最后体积会小
```js
externals: {
//jquery通过script引⼊入之后，全局中即有了了 jQuery 变量量 
'jquery': 'jQuery'
}
```

```html
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
```

#### 压缩css
```shell
npm install cssnano -D
npm i optimize-css-assets-webpack-plugin -D

```
```js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
new OptimizeCSSAssetsPlugin({
cssProcessor: require("cssnano"), //引⼊入cssnano配置压缩选项 cssProcessorOptions: {
    discardComments: { removeAll: true }
  }
})
```

#### 压缩html
- 借助html-webpack-plugin
```js
 
new htmlWebpackPlugin({ title: "京东商城",
	template: "./index.html", filename: "index.html", minify: {
	// 压缩HTML⽂文件
	removeComments: true, // 移除HTML中的注释 
	collapseWhitespace: true, // 删除空⽩白符与换⾏行行符 
	minifyCSS: true // 压缩内联css
} }),
```
###优化输出质量
> 优化要输出到线上的代码，减少用户能感知的加载时间
> 提升代码性能


## 代码分割
> 单页面应用，打包完成后，所有页面只生成一个bundle.js，代码体积大，不利于下载，没有合理利用浏览器资源
> 如果多个页面都引入了一些公共模块，将公共模块单独抽离出来，单独打包，公共代码只需要下载一次就缓存起来了，避免了重新下载
```js
 
optimization: {
   splitChunks: {
chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为⼀一个单独的⽂文件 },
},
```

```js
 
optimization: {
    splitChunks: {
			chunks: 'async',//对同步 initial，异步 async，所有的模块有效all 
			minSize: 30000,//最⼩小尺⼨寸，当模块大于30k才会进行单独打包
			maxSize: 0,//需要单独打包的模块需要按照这个尺寸再次拆包, 0不拆包 推荐用0
			minChunks: 1,//单个模块被引用的次数，超过这个值的时候才会单独打包 
      maxAsyncRequests: 5,//最大异步请求数，默认5 
			maxInitialRequests: 3,//最大初始化请求书，入口文件同步请求，默认3 
			automaticNameDelimiter: '-',//打包分割符号
			name: true,//打包后的名称，除了了布尔值，还可以接收一个函数function 
			cacheGroups: {//缓存组
				vendors: {
					test: /[\\/]node_modules[\\/]/, 
					name:"vendor", // 要缓存的 分隔出来的 chunk 名称 					
					priority: -10//缓存组优先级 数字越大，优先级越高；同时满足多个test匹配的时候，priority值越大，越优先
				},
        react-dom:{
					chunks: "initial", // 必须三选⼀一: "initial" | "all" | "async"(默认就是
					test: /react-dom/, // 正则规则验证，如果符合就提取 chunk,
          name:"react-dom",
					minSize: 30000,
        	minChunks: 1,
      },
			default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true//可设置是否重用该chunk
			} 
        }
		}
  }
```



## 摇树--待整理
css 摇树
js摇树 不需要依赖其他插件，webpack自带



预取prefetch/预加载preload
prefetch  像是没有在用户第一视觉中展示的，需要事件点击后的资源，以异步的方式引入这个模块，在浏览器线程空闲的的时候会提前加载这个prefetch的模块，在真正用到这个模块的时候，会看不到空白
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
做法：魔法注释
预加载：preload  和上面的区别是preload是并行的

happyPack 慎用，项目较少的时候，开启happypack和多线程都是需要时间的，有时候反而构建时间变多了


# 区分环境---待整理

- npm方式
- 外部环境变量方式
- cross-env方式

cross-env 抹平windows平台和linux平台的路径差异




