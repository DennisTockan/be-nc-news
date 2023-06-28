const { selectArticleIdComments } = require('../models/article_id_comments.controllers')

exports.getArticleIdComments = (req, res, next) => {
    const {article_id} = req.params
selectArticleIdComments(article_id)
.then((comment) => {
    res.status(200).send({comment});
    console.log(comment, 'comment')
})
.catch((err) => 
next(err))
}