const {sequelize} = require('@core/db')
const axios = require('axios')
const util = require('util')
const {Sequelize,Model} = require('sequelize')

class Book extends Model {

}

Book.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    fav_nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
},{
    sequelize,
    tableName:'book'
})

module.exports = {
    Book
}