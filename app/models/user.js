const bcrypt = require('bcryptjs')
const {sequelize} = require('@core/db')
const {Sequelize,Model} = require('sequelize')

class User extends Model {
    static async verifyEmailPassword(email,plainPassword){
       // user 将为 user表 的第一个条目  || null
       const user = await User.findOne({
           where:{
               email
           }
       })
       if(!user){
         throw new global.errs.AuthFailed('账号不存在')
       }
    //    console.log('user:',user)
       const correct  = bcrypt.compareSync(plainPassword,user.password)
       if(!correct){
           throw new global.errs.AuthFailed('密码不正确')
       }
       return user
    }
}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email:{
        type:Sequelize.STRING(128),
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        set(val){ // 用户密码加密
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password',psw)
        }
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize,
    tableName:'user'
})

module.exports = {
    User
}