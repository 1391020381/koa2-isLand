const bcrpt = require('bcryptjs')
const Router = require('koa-router')

const {success} = require('@lib/helper.js')

const {RegisterValidator} = require('@validator/validator.js')


const {User} = require('@models/user')

const router = new Router({
    prefix:'/v1/user'
})

router.post('/register',async(ctx,next)=>{
    ctx.body = 'register'
})


module.exports = router