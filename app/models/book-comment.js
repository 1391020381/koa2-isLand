const {sequelize} = require('@core/db')

const {Sequelize,Model}  = require('sequelize')

class Comment extends Model {

}

Comment.init({
    content:Sequelize.STRING(12),
    nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    book_id:Sequelize.INTEGER
},{
    sequelize,
    tableName:'comment'
})

module.exports = {
    Comment
}
