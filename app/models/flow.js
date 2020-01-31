const {sequelize} = require('@core/db')
const {Sequelize,Model} = require('sequelize')

class Flow extends Model {

}

Flow.init({ // 抽象表 art.js 只是个业务表
    index:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
},{
    sequelize,
    tableName:'flow'
})

module.exports = {
    Flow
}