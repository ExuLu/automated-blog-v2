const express = require('express');
const articleRouter = require('./routes/articleRoute');

const app = express();

app.use('/api/articles', articleRouter);

module.exports = app;
