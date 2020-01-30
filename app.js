require('module-alias/register')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const path = require('path')

const InitManager = require('@core/init')
const catchError = require('@middlewares/exception.js')
const static = require('koa-static')

const app = new Koa()
app.use(catchError)  // 要理解 koa 中间件机制  取 app.use注册 中间件 递归调用
app.use(bodyParser())

app.use(static(path.join(__dirname,'./static')))

InitManager.initCore(app)

app.listen(3001,()=>{
    console.log(`service is listen http://127.0.0.1:3001`)
})