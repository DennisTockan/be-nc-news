const { selectArticleIdComments } = require('../models/article_id_comments.controllers')

exports.getArticleIdComments = (req, res, next) => {
selectArticleIdComments();
}