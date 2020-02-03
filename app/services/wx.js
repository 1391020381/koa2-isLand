const util = require('util')
const axios = require('axios')

const {User} = require('@models/user')
const {generateToken} = require('@core/util')
const {Auth} = require('@middlewares/auth')

class WXManager {
    static async codeToToken(code){
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)
            const result = await axios.get(url)
            if(result.status !== 200){
                throw new global.errs.AuthFailed('openId获取失败')
            }
            // console.log('result:',result.data)
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if(errcode){
            throw new global.errs.AuthFailed('openId获取失败:'+ errmsg)
        }
        let user = await User.getUserByOpenid(result.data.openid)
        // console.log('查找user:',user)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
            console.log('注册user:',user)
        }
       // console.log('Auth.USER:',Auth,Auth.USER)
        return generateToken(user.id,Auth.USER)
    }
}

module.exports = {
    WXManager
}