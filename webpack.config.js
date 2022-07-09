// 引入path包，帮助拼接路径
const path = require('path')
// 引入html-webpack-plugin
const HWP = require('html-webpack-plugin')
// 引入clean-webpack-plugin
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
    // 入口文件
    entry:'./src/index.ts',
    // 打包文件地址以及文件名
    output:{
        // 地址
        path:path.resolve(__dirname,'dist'),
        // 文件名
        filename:"bundle.js",
       
        environment:{
             // 告诉webpack不要使用箭头函数
            arrowFunction:false,
            // 不使用const
            // const:false
        }
    },
    mode:"production",
    // 要使用的模块
    module:{
        rules:[
            {
                // 处理ts文件
                test:/\.ts$/,
                // 要使用的loader
                use:[
                    {
                        // 指定加载器
                        loader:"babel-loader",
                        // 配置babel
                        options:{
                            // 设置预定义的环境
                            presets:[
                                [   
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        targets:{
                                            // 要兼容的目标浏览器
                                            "chrome":'58',
                                            "ie":'11'
                                        },
                                        // 指定corejs版本
                                        "corejs":"3",
                                        // 要使用corejs的方式
                                        "useBuiltIns":'usage', // 按需加载
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader",
                ],
                // 排除文件
                exclude:/node_modules/
            },
            {
                // 处理less文件
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        // 兼容性处理npm i -D postcss postcss-loader postcss-preset-env    
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                // 插件
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:"last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins:[
        new HWP(
            // @ts-ignore
            options={
                // 自定义title
                title:"打包demo",
                // 模版
                template:'./src/index.html'
            }
        ),
        new CleanWebpackPlugin()
    ],
    resolve:{
        extensions:['.ts','.js']
    }
}