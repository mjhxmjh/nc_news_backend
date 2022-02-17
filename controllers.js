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
  const { article_id } = req.params;
  getArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

// exports.getArticle = (req, res, next) => {
//   const { article_id } = req.params;
//   Promise.all([getArticleById(article_id), checkIfArticleExists(article_id)])
//     .then((article) => {
//       res.status(200).send({ article });
//     })
//     .catch(next);
// };

// exports.checkForArticle = (req, res, next) => {
//   const { article_id } = req.params;
//   checkIfArticleExists(article_id)
//     .then(({}) => {
//       res.status(404).send({ msg: "path not found" });
//     })
//     .catch(next);
// };
