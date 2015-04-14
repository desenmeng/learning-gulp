# learning-gulp

## 文章记录使用Gulp的一般套路

这个套路解决以下问题
* MD5使用的rev
* 静态文件打包使用webpack
* JS压缩使用uglify
* CSS压缩使用cssshrink
* *(可选)*CDN使用七牛，所以有个可选的负责上传的gulp插件
* concat是Gulp标配，不解释

## 使用方式
> npm install
成功之后执行测试命令：
> gulp watch
发布命令
> gulp publish
