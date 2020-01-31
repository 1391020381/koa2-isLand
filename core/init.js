const requireDirectory = require('require-directory')
const path = require('path')
const Router = require('koa-router')
class InitManager {
    static initCore(app){
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException() 
        InitManager.loadConfig()
    }
    static loadConfig(path=''){
        console.log(__dirname,process.cwd())
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
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