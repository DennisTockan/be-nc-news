const { selectArticleIdComments } = require('../models/article_id_comments.model')

exports.getArticleIdComments = (req, res, next) => {
    const {article_id} = req.params
selectArticleIdComments(article_id)
.then((comments) => {
    res.status(200).send({comments});
})
.catch((err) => 
next(err))
}