const {sequelize} = require('@core/db')
const {Sequelize,Model,Op} = require('sequelize')

const {Art} = require('./art')

class Favor extends Model{
   static async userLikeIt(art_id,type,uid){
        const favor = await Favor.findOne({
            where:{
              uid,
              art_id,
              type  
            }
        })
        return favor?true:false
   }
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