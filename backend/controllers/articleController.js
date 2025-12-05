exports.getAllArticles = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(err.status).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
};

exports.getArticleById = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(err.status).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
};
