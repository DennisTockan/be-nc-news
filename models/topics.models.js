const db = require("../db/connection");

exports.selectAllTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    if (rows.length < 1) {
      return Promise.reject({
        status: 404,
        message: "No topics found",
      });
    }
    return rows;
  });
};
