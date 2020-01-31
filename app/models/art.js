const {flatten} = require('lodash')

const {Op} = require('sequelize')

const {Movie,Sentence,Music} = require('./classic')

class Art {
    constructor(art_id,type){
        this.art_id = art_id
        this.type = type
    }
    
}

module.exports = {
    Art
}