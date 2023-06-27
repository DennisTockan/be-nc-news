const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controllers");
const { getArticleById } = require("./controllers/articles.contollers")
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServersErrors,
} = require("./errors");

app.get("/api/topics", getAllTopics);


app.get("/api/articles/:article_id", getArticleById)


app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServersErrors);

module.exports = app;
