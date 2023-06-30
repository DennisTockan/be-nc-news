const db = require("../db/connection");

exports.selectArticleIdComments = async (article_id) => {
  const checkExists = async (article_id) => {
    const dbOutput = await db.query(
      `SELECT * FROM articles WHERE article_id = $1;`,
      [article_id]
    );
    if (dbOutput.rows.length === 0){
      return Promise.reject({ status: 404, message: "Not Found" });
    }
  };

const doesArticleIdExist = await checkExists(article_id);
  if (doesArticleIdExist) {
    return doesArticleIdExist;
  }
  const result = await db.query(
    `SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC`,
    [article_id]
  );
  const { rows } = result;
  return rows;
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
    .catch(() => {
      next(err);
    });
};