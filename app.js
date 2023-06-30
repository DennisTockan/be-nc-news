const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controllers");
const { getAllApiEndpoints } = require("./controllers/api.controllers");
const {
  getAllArticles,
  postArticleIdComment,
} = require("./controllers/articles.controllers");

const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServersErrors,
} = require("./errors");

app.use(express.json()); // body parser for POST / PUT / PATCH

app.get("/api/topics", getAllTopics);

app.get("/api/", getAllApiEndpoints);

app.get("/api/articles", getAllArticles);

app.post("/api/articles/:article_id/comments", postArticleIdComment);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServersErrors);

module.exports = app;
