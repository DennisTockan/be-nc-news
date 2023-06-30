const db = require("../db/connection");

exports.selectAllArticles = () => {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;"
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          message: "Not Found",
        });
      }
return rows

    });
};


exports.selectPatchArticleIdsArticle = async (article_id, inc_votes) => {
  const checkArticleIdExists = async (article_id) => {
    const dbArticleId = await db.query(
      `SELECT * FROM articles WHERE article_id = $1;`,
      [article_id]
    );

    if (dbArticleId.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Article Id not found" });
    } 
    else {
      const numOfVotes = dbArticleId.rows[0].votes;
      const insertQuery = `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`;
      return db
        .query(insertQuery, [inc_votes + numOfVotes, article_id])
        .then(({ rows }) => {
          return rows;
        });
    }
  };

  const articleIdExists = await checkArticleIdExists(article_id);
  return articleIdExists;
};