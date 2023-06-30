const { selectArticleIdComments, selectPostArticleIdComments } = require('../models/article_id_comments.model')

exports.getArticleIdComments = (req, res, next) => {
    const {article_id} = req.params
    
selectArticleIdComments(article_id)
.then((comments) => {
    res.status(200).send({comments});
})
.catch((err) => 
next(err))
}

exports.postArticleIdComment = (req, res, next) => {
    const {article_id} = req.params;
    const newComment = req.body
    selectPostArticleIdComments(article_id, newComment).then((comment)=> {
  res.status(201).send({comment})
    }).catch((err) => {
      next(err)
    })
  };


