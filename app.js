const express = require('express')
const app = express();
const {getAllTopics} = require('./controllers/topics.controllers');
const { handlePsqlErrors, handleCustomErrors } = require('./errors');

app.get("/api/topics", getAllTopics);


app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;