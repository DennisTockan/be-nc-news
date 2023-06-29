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
