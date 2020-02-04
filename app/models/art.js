const {flatten} = require('lodash')

const {Op} = require('sequelize')

const {Movie,Sentence,Music} = require('./classic')
const {Book} = require('./book')
class Art {
    constructor(art_id,type){
        this.art_id = art_id
        this.type = type
    }
     async getDetail(uid){ // art 实体中保存了 点赞的次数
        const {Favor} = require('./favor')
        const art = await Art.getData(this.art_id,this.type)
        if(!art){
            throw new global.errs.NotFound()
        }
        const like = await Favor.userLikeIt(this.art_id,this.type,uid)
        return {
            art,
            like_status:like
        }
    }
    static async getData(art_id,type,useScope=true) { 
    //    {
    //     MOVIE:100,
    //     MUSIC:200,
    //     SENTENCE:300,
    //     BOOK:400
    //    }
     // 根据 art_id type 来区分是 music movie sentence
     let art = null
     const  finder = {
         where :{
             id:art_id
         }
     }
     const scope = useScope?'bh':null
     switch(type){
         case 100:
             art = await Movie.scope(scope).findOne(finder)
             break
         case 200:
             art = await Music.scope(scope).findOne(finder)
             break
         case 300:
             art = await Sentence.scope(scope).findOne(finder)
             break
         case 400:
             art = await Book.scope(scope).findOne(finder)
             if(!art){
                 art = await Book.create({
                     id:art_id
                 })
             }
             break
         default:
             break              
     }
     return art
    }
  static  async getList(artInfoList){ // artInfoList 所有该用户点赞的 分类
        // [{uid:1,art_id:4,type:3}]
        const artInfoObj = {
            100:[],
            200:[],
            300:[]
        }
        for(let artInfo of artInfoList){
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        for(let key in artInfoObj){
            const ids = artInfoObj[key]
            if(!ids.length){
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids,key))
        }
    }
    static async _getListByType(ids,key){
        // const arts = await Art.findAll({
        //     where:{
        //         id:{
        //             [Op.in]:ids
        //         }
        //     }
        // })
        let arts = []
        const finder = {
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        }
        const scope = 'bh'
        switch(type){
            case 100:
                arts = await Movie.scope(scope).findAll(finder)
                break
             case 200:
                 arts = await Music.scope(scope).findAll(finder)
                 break
             case 300:
                arts = await Sentence.scope(scope).findAll(finder)
                break
             default:
                 break   

        }
        return arts
    }
}

module.exports = {
    Art
}