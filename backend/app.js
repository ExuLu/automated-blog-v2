const express = require('express');
const articleRouter = require('./routes/articleRoute');

const app = express();

app.route('/api/articles', articleRouter);

module.exports = app;
