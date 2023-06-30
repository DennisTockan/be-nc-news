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
      return rows;
    });
};

exports.selectPostArticleIdComments = async (article_id, newComment) => {
  const { username, body } = newComment;
  if (!body.length) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  const checkUsernameAndIdExists = async (article_id, username) => {
    const dbUsername = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (dbUsername.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Username not found" });
    }

    const dbArticle_Id = await db.query(
      `SELECT * FROM articles WHERE article_id = $1`,
      [article_id]
    );

    if (dbArticle_Id.rows.length === 0) {
      return Promise.reject({ status: 404, message: "There is no article" });
    }
  };

  const articleAndUsernameValid = await checkUsernameAndIdExists(
    article_id,
    username
  );
  if (articleAndUsernameValid) {
    return checkUsernameAndIdExists(article_id, newComment);
  }
  const insertQuery = `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`;

  return db
    .query(insertQuery, [article_id, username, body])
    .then(({ rows }) => {
      return rows[0];
    })
};
