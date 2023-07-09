
const { selectAllArticles, selectPatchArticleIdsArticle } = require("../models/articles.model");

exports.getAllArticles = (req, res, next) => {
  const {topic , sort_by, order} = req.query;
  
    selectAllArticles(topic, sort_by, order)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
  };

exports.patchArticleIdsArticle = (req, res, next) => {
  const {article_id} = req.params;
  const {inc_votes} = req.body;
  selectPatchArticleIdsArticle(article_id, inc_votes).then((data) => {
    res.status(200).send({article: data[0]})
  }).catch((err) => {
    next(err)
  })
}
