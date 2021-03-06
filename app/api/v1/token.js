const Router = require('koa-router')

const {TokenValidator,NotEmptyValidator} = require('@validator/validator.js')
const {generateToken} = require('@core/util')
const {LoginType} = require('@lib/enum')
const {User} = require('@models/user')
const {Auth} = require('@middlewares/auth.js')
const {WXManager} = require('@services/wx.js')

const router = new Router({
    prefix:'/v1/token'
})

router.post('/login',async(ctx,next)=>{
    const v = await new TokenValidator().validate(ctx)
    let token
    let type = v.get('body.type')
 //   console.log(type,LoginType.USER_MINI_PROGRAM) 
                            // 
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token  = await emailLogin(v.get('body.account'),v.get('body.secret'))
            break
        case LoginType.USER_MINI_PROGRAM:  // USER_MINI_PROGRAM
             token  = await WXManager.codeToToken(v.get('body.account'))
             break
        default:
            break
    }
    ctx.body = {
        token
    }
})

router.post('/verify',async (ctx,next)=>{
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        is_valid:result
    }
})
async function emailLogin(account,secret){  // 登录
     // TokenValidator 校验了 emailLogin的参数情况
     // emailLogin 需要校验 账号和密码是否 匹配
     const user = await User.verifyEmailPassword(account,secret)
    return generateToken(user.id,Auth.USER)
}

module.exports = router
