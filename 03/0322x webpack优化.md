
### 优化 loader

- 优化 loader 搜索范围（部分不在）
``` javascript
rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        loader: 'babel-loader',
        // 只在 src 文件夹下查找
        include: [resolve('src')],
        // 不会去查找的路径
        exclude: /node_modules/
      }
]
```

- 使用缓存 cacheDirectory=true
``` javascript
loader: 'babel-loader?cacheDirectory=true'
// 
options: {
  cacheDirectory: true
}
```

### HappyPack

- 开启多线程 

``` javascript
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // id 后面的内容对应下面
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个线程
    threads: 4
  })
]
```


### DllPlugin

指定类库提前打包

``` javascript
// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]-[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和 output.library 一致
      name: '[name]-[hash]',
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.join(__dirname, 'dist', '[name]-manifest.json')
    })
  ]
}
```


### 代码压缩

在 Webpack3 中，我们一般使用 UglifyJS 来压缩代码，但是这个是单线程运行的，为了加快效率，我们可以使用 webpack-parallel-uglify-plugin 来并行运行 UglifyJS，从而提高效率。

在 Webpack4 中，我们就不需要以上这些操作了，只需要将 mode 设置为 production 就可以默认开启以上功能。


### 一些小优化点  
- resolve.alias 别名的方式映射一个路径，让 webpack 能够更快找到路径
- module.noParse 如果确定一个文件下没有其他依赖，使用 webpack 不扫描该文件，对一些大型库很有帮助


## 减少文件体积

### 按需加载  
- 每个路由单独打包为一个文件
- 按需加载需要的模块


### Scope Hoisting

- concatenateModules: true

对于引用只有一次的块，代码合并到一个块中，坚守包裹开销和打码量


### Tree Shaking

- 根据 import / export 删除

未使用的引用不会打入到包中



### splitChunk


### runtimeChunk

- 将 webpack runtime 打包为一个文件，默认每个文件一份[dog]

``` javascript
    runtimeChunk: "single"
    // 等价于
    runtimeChunk: {
      name: "manifest"
    }

```


### 分析包大小组成

[BundleAnalyzerPlugin](https://www.npmjs.com/package/webpack-bundle-analyzer)