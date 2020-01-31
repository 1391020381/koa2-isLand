const {sequelize} = require('@core/db')
const {Sequelize,Model,Op} = require('sequelize')

const {Art} = require('./art')

class Favor extends Model{

}


Favor.init({
    uid:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
},{
    sequelize,
    tableName:'favor'
})

module.exports  = {
    Favor
}