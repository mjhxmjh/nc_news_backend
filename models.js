const res = require("express/lib/response");
const db = require("/Users/matt/northcoders/projects/be-nc-news/db/connection.js");

//------------------------------------------------------------------------------------------------------------------------------

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};

exports.getArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "path not found",
        });
      }
      return rows[0];
    });
};

exports.patchArticleVoteCount = (newVote, article_id) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [newVote, article_id]
    )
    .then((result) => {
      const article = result.rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "path not found",
        });
      }
      return result.rows[0];
    });
};

exports.fetchUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => {
    return result.rows;
  });
};

exports.fetchArticles = () => {
  return db
    .query(
      "SELECT article_id, author, created_at, title, topic, votes FROM articles ORDER BY created_at DESC;"
    )
    .then((result) => {
      return result.rows;
    });
};

//continue with comments endpoint and then hosting

