const path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //用来指定当前构建环境
    mode:"development",
    // entry:"./src/index.js",
    // entry:["./src/index.js","./src/page.js"],
    entry:{
        index:"./src/index.js",
        page:"./src/page.js"
    },
    output:{
        filename:"[name]-[chunkhash:6].js",
        path:path.join(__dirname,"./dist/")
    },
    //去哪里找第三方模块
    resolve:{
        modules:[path.resolve(__dirname,"./node_modules")]
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
            filename:"index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: "./css/[name]-[contenthash:6].css",
                chunkFilename: "[id].css"
            }
            )
    ]
}

