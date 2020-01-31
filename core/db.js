const {Sequelize,Model} = require('sequelize')

const {unset,clone,isArray}  = require('lodash')

const {dbName,host,port,user,password} = require('@config/config').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging:true,
    timezone:'+8:00',
    define:{
        // create_time update_time delete_time
        timestamps:true,
        paranoid:true, // 不删除数据库条目,但将新添加的属性 deletedAt设置为当前的日期  （删除完成时）
        createdAt:'created_at',
        updatedAt:'update_at',
        underscored:true,// 自动设置所有属性的字段参数为下划线命名方式
        scopes:{
            bt:{
                attributes: {
                    exclude: ['updatedAt', 'deletedAt', 'createdAt']
                  }  
            }
        }
    }
})

sequelize.sync({
    // force:true // 自动删除原来的表 重新创建新的表
})

Model.prototype.toJSON = function(){
    let data = clone(this.dataValues)
    unset(data,'updatedAt')
    unset(data,'createdAt')
    unset(data,'deletedAt')
    for(key in data){
        if(key === 'image'){
            if(!data[key].startWith('http')){
                data[key] = global.config.host + data[key]
            }
        }
    }
    return data
}
module.exports = {
    sequelize
}