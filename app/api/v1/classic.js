const Router = require('koa-router')


const router = new Router({
    prefix:'/v1/classic'
})

router.get('/latest',async(ctx,next)=>{
    ctx.body = 'latest'
})

module.exports = router