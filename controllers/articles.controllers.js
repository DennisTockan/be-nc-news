
const { selectAllArticles } = require("../models/articles.model");

exports.getAllArticles = (_, res, next) => {
  selectAllArticles().then((articles) => {
    res.status(200).send({articles});
  }).catch((err) => {
        next(err);
      });
};



