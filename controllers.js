const articles = require("./db/data/development-data/articles.js");
const {
  fetchTopics,
  getArticleById,
  patchArticleVoteCount,
  fetchUsers,
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

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      console.log(users[0].username);
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  fetchArticles().then((articles) => {
    res.status.send(200).send({ articles });
  });
};

// GET /api/articles
// Responds with:

//     an articles array of article objects, each of which should have the following properties:
//         author which is the username from the users table
//         title
//         article_id
//         topic
//         created_at
//         votes
//     the articles should be sorted by date in descending order.
