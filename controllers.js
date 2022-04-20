const fs = require("fs");
const articles = require("./db/data/development-data/articles.js");
const {
  fetchTopics,
  fetchArticleById,
  patchArticleVoteCount,
  fetchUsers,
  fetchArticles,
  fetchArticlesByTopic,
  fetchArticleComments,
  saveArticleComment,
  deleteComment,
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
  fetchArticleById(article_id)
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

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  let sort = (req.query.sort_by ??= "created_at");
  let order = (req.query.order ??= "desc");
  if (req.query.topic) {
    fetchArticlesByTopic(sort, order, req.query.topic).then((articles) => {
      res.status(200).send({ articles });
    });
  } else {
    fetchArticles(sort, order)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  }
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  saveArticleComment(article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.getDescriptions = (req, res) => {
  fs.readFile("./endpoints.json", (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
};
