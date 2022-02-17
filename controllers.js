const {
  fetchTopics,
  getArticleById,
  patchArticleVoteCount,
} = require("./models.js");

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

// exports.patchArticleById = (req, res, next) => {
//   const { article_id } = req.params;
//   patchArticleVoteCount(article_id)
//     .then((article) => {
//       res.status();
//     })
//     .catch(next);
// };