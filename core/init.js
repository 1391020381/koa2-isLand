const requireDirectory = require('require-directory')
const path = require('path')
const Router = require('koa-router')

class InitManager {
    static initCore(app){
        InitManager.app = app
        InitManager.initLoadRouters()
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
}

module.exports = InitManager