const {
  selectAllArticles,
  selectPostArticleIdComments,
} = require("../models/articles.model");

exports.getAllArticles = (_, res, next) => {
  selectAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticleIdComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  selectPostArticleIdComments(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
