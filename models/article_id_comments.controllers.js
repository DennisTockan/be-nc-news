const db = require("../db/connection");

exports.selectArticleIdComments = (article_id) => {
if (article_id !== Number){
    return Promise.reject({status: 400, message: "Bad Request"})
}
return db.query(`SELECT * FROM comments WHERE article_id = $1`, [article_id])
.then(({rows}) => {
    console.log(rows, '<-- rows')
    return rows
})
}