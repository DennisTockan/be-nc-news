const db = require("../db/connection");

exports.selectAllArticles = (topic, sort_by = "created_at", order = "DESC") => {
  let query =
    "SELECT articles.title, articles.topic, articles.author, articles.article_id, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id ";
  const queryValues = []; //SQL Injection

  const sort_by_values = [
    "topic",
    "title",
    "author",
    "body",
    "created_at",
    "votes",
    "article_img_url",
    "article_id",
  ];
  const order_values = ["DESC", "ASC"];

  if (topic) {
    queryValues.push(topic);
    query += `WHERE topic LIKE $1 `;
  }
  if (!sort_by_values.includes(sort_by)) {
    return Promise.reject({ status: 400, message: "Invalid Sort Query" });
  }
  if (!order_values.includes(order)) {
    return Promise.reject({ status: 400, message: "Invalid Order Query" });
  }

  query += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;
  return db.query(query, queryValues).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({
        status: 404,
        message: "Not Found",
      });
    }
    return rows;
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
    } else {
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
