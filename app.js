const express = require("express");
const app = express();
const cors = require("cors");
const { getAllTopics } = require("./controllers/topics.controllers");
const { getAllApiEndpoints } = require("./controllers/api.controllers");
const {
  getAllArticles,
  patchArticleIdsArticle,
  getArticleById
} = require("./controllers/articles.controllers");
const {
  getArticleIdComments,
  postArticleIdComment,
} = require("./controllers/article_id_comments.controllers");
const { deletedComment } = require("./controllers/comment.controller");

const { getAllUsers } = require("./controllers/users.controllers");

const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServersErrors,
} = require("./errors");
app.use(express.json()); // body parser for POST / PUT / PATCH

app.use(cors());

app.get("/api/topics", getAllTopics);

app.get("/api/", getAllApiEndpoints);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles/:article_id/comments", getArticleIdComments);

app.patch("/api/articles/:article_id", patchArticleIdsArticle);

app.post("/api/articles/:article_id/comments", postArticleIdComment);

app.delete("/api/comments/:comment_id", deletedComment);

app.get("/api/users", getAllUsers);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServersErrors);

module.exports = app;
