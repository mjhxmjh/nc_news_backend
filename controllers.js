const {
  fetchTopics,
  getArticleById,
  patchArticleVoteCount,
  fetchUser,
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

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes: newVote } = req.body;
  patchArticleVoteCount(newVote, article_id)
    .then((articleUpdate) => {
      res.status(200).send({ articleUpdate });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  fetchUser()
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};
