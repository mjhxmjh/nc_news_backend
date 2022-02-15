const { fetchTopics, getArticleById } = require("./models.js");

// ------------------------------------------------------------------------------------------------------------------------------

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticle = (req, res, next) => {
  const { articleId } = request.params;
  getArticleById(articleId)
    .then((article) => {
      response.send(200).send({ article });
    })
    .catch(next);
};
