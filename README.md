# pipeline-template-react

> 页面可视化搭建框架的页面模板 -- 基于 [react](https://github.com/facebook/react)

## 用法

### 初始化

```bash
# 初始化项目(安装依赖包)
npm i
```

### 本地测试
```
npm start
```


### 生成模板
* 生成后台渲染所需代码
```
$ npm run server
```
打包结果在`server`目录中。

* 验证后台端渲染可用

后台渲染对代码写法是有一些要求的, 比如不允许使用 window/document 这种浏览器特有对象.
所以可以本地执行后台渲染来验证后台渲染是否正常.

```
$ npm run render
```

* 生成模板压缩包
```
$ npm run server
$ npm run template
```

打包结果为`pipeline-template.zip`, 提交模板时, 提交该 zip 文件.

### 个性化页面独立发布
拉取一个独立分支或一份独立源码, 然后

```
$ npm run build
```

打包结果在`dist`目录中。

## 后台渲染脚本
路径 `server/node.js`

用于在 node 后台渲染出带 DOM 元素的 `index.html`.

### 渲染发布版本 `默认`
```
$ node server/node.js release
```

### 渲染页面预览版本
> 嵌入了模板生成页面的调试脚本
```
$ node server/node.js preview
```

## EOF
