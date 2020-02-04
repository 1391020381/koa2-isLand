const Router = require('koa-router')
const {Flow} = require('@models/flow')
const {Art} = require('@models/art')
const {Favor} = require('@models/favor')
const {  
    PositiveIntegerValidator,
    ClassicValidator} = require('@validator/validator')
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
    const likeLatest = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likeLatest)
    ctx.body = art
})
router.get('/:index/next',new Auth().m,async(ctx,next)=>{
    // 在 获取最新的期刊接口里面 返回了 最新一期的 期刊数 index
    // 别名
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where:{
            index:index+1
        }
    })
    if(!flow){
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id,flow.type)
    const likeNext = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likeNext)
    ctx.body = art
})

router.get('/:index/previous',new Auth().m,async (ctx,next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:'index' // 别名
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where:{
            index:index-1
        }
    })
    if(!flow){
        throw new global.errs.NotFound
    }
    const art   = await Art.getData(flow.art_id,flow.type)
    const likePrevious = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likePrevious)
    ctx.body = art
})
router.get('/:type/:id',new Auth().m,async (ctx,next)=>{
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const artDetail = await new Art(id,type).getDetail(ctx.auth.id)
    artDetail.art.setDataValue('like_status',artDetail.like_status)
    ctx.body = artDetail.art
})
router.get('/:type/:id/favor',new Auth().m,async(ctx,next)=>{
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const artDetail = await new Art(id,type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status',artDetail.like_status)
    ctx.body = {
        fav_nums:artDetail.art.fav_nums,
        like_status:artDetail.like_status
    }
})
module.exports = router