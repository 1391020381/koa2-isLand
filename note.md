# koa
* 中间件总是返回promise

# module-alias
* Create aliases of directories and register custom module paths in NodeJS like a boss!

# require-directory

```
// 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径，第三个参数：每次加载一个参数执行的函数
const modules = require-directory(module,'./api',{visit:whenModuleLoad})



```