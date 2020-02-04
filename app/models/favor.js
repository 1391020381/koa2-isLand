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
   static async getMyClassicFavors(uid){
       const arts = await Favor.findAll({
           where:{
               uid,
               type:{
                   [Op.not]:400
               }
           }
       })
       if(!arts){
           throw new global.errs.NotFound()
       }
       return await Art.getList(arts)
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