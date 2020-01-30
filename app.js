require('module-alias/register')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const path = require('path')

const InitManager = require('@core/init')

const static = require('koa-static')

const app = new Koa()

app.use(bodyParser())

app.use(static(path.join(__dirname,'./static')))

InitManager.initCore(app)

app.listen(3001,()=>{
    console.log('service is listen 3001')
})