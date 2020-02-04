const Router = require('koa-router')
const {Flow} = require('@models/flow')
const {Art} = require('@models/art')
const {Favor} = require('@models/favor')
// const {  
//     PositiveIntegerValidator,
//     ClassicValidator} = require('@validator')
const {Auth} = require('@middlewares/auth')
const router = new Router({
    prefix:'/v1/classic'
})

router.get('/latest',new Auth().m,async(ctx,next)=>{
       // art 中的具体模型可以查询到 该实体有多少赞   
    // favor 记录某个人对某个 art实体是否点赞
    const flow = await Flow.findOne({
        order:[
            ['index','DESC']
        ]
    })
    const art = await Art.getData(flow.art_id,flow.type)
    const likeLatest = await Favor.userLikeIt(flow.art_id,flow.type,flow.id)
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likeLatest)
    ctx.body = art
})

module.exports = router