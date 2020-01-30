const requireDirectory = require('require-directory')
const path = require('path')
const Router = require('koa-router')

class InitManager {
    static initCore(app){
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException() // 把
    }
    static loadConfig(path=''){
        const config = path || process.cwd() + '/config/config.js'
        const config = require(config)
        global.config
    }
    static initLoadRouters(){
        // path config
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module,apiDirectory,{
            visit:whenLoadModule
        })
        function whenLoadModule(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes())
            }
        }
    }
    static loadHttpException (){
        const errors = require('./http-exception')
        global.errors = errors
    }
}

module.exports = InitManager