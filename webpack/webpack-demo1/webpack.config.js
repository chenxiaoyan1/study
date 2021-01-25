const path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
    //用来指定当前构建环境
    mode:"development",
    entry:"./src/index.js",
    // entry:["./src/index.js","./src/page.js"],
    // entry:{
    //     index:"./src/index.js",
    //     page:"./src/page.js"
    // },
    output:{
        filename:"[name]-[chunkhash:6].js",
        path:path.join(__dirname,"./dist/")
    },
    //去哪里找第三方模块
    resolve:{
        modules:[path.resolve(__dirname,"./node_modules")],
        alias:{
            react:path.resolve(__dirname,"./node_modules/react/umd/react.production.min.js"),
            "react-dom":path.resolve(__dirname,"./node_modules/react-dom/umd/react-dom.production.min.js"),
        }
    },
    //不打包某文件，使用cdn方式引入
    // externals:{
    //     'react':"React",
    //     "react-dom":"ReactDOM"
    // },
    //代码分割
    optimization: {
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为⼀一个单独的⽂文件 },
            minChunks:1,
            cacheGroups:{
                react:{
                    test:/react-dom/,
                    name:"react-dom",

                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    // 是否重用（单独打包）已经载入的包
                    reuseExistingChunk: true,
                }
            }
        },
    },
    // devtool:"source-map",
    devServer: {
        // contentBase: "./dist",
        open: true,
        port: 8081
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                include:[path.resolve(__dirname,"./src")],
                use:[
                        {
                            loader:"babel-loader",
                            options:{

                            }
                        }
                ]
            },
            {
                test:/\.css$/,
                include:[path.resolve(__dirname,"./src")],
                use:[
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader","postcss-loader"
                ]
            },
            // {
            //     test:/\.jpg|png|jpe?g|gif$/,
            //     use:[
            //         {
            //             loader:"file-loader",
            //             options:{
            //                 name:'[name].[ext]',
            //                 outputPath:"./images/"
            //             }
            //         }
            //     ]
            // }
            {
                test:/\.jpg|png|jpe?g|gif$/,
                include:[path.resolve(__dirname,"./src")],
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            //打包后文件名称 占位符
                            name:'[name].[ext]',
                            //打包后文件输出路径
                            outputPath:"./images/",
                            //当文件大小小于设定的这个值的时候会将文件转成base64
                            limit:3*1024 //单位是字节
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"首页",
            filename:"index.html",
            template:"./src/index.html",
            minify:{
                // 压缩HTML⽂文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩白符与换⾏行行符
                minifyCSS: true // 压缩内联css
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: "./css/[name]-[contenthash:6].css",
                chunkFilename: "[id].css"
            }
            ),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require("cssnano"), //引⼊入cssnano配置压缩选项 cssProcessorOptions: {
            discardComments: { removeAll: true }
        }
        )
    ]
}

