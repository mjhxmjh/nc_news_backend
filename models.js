const res = require("express/lib/response");
const db = require("/Users/matt/northcoders/projects/be-nc-news/db/connection.js");

//------------------------------------------------------------------------------------------------------------------------------

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      "SELECT articles.*, Count(comments.body) as comment_count FROM articles LEFT JOIN comments ON comments.article_id=articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;",
      [article_id]
    )
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

exports.fetchArticles = (sort, order) => {
  let baseQuery = `SELECT articles.*, Count(comments.body) as comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id GROUP BY articles.article_id ORDER BY ${sort} `;
  if (order == "desc") {
    baseQuery += " desc;";
  } else {
    baseQuery += " asc;";
  }
  return db.query(baseQuery).then((result) => {
    return result.rows;
  });
};

exports.fetchArticlesByTopic = (sort, order, topic) => {
  let baseQuery = `SELECT articles.*, COUNT(comments.body) as comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id WHERE articles.topic=$1 GROUP BY articles.article_id ORDER BY ${sort} `;
  if (order == "desc") {
    baseQuery += " desc;";
  } else {
    baseQuery += " asc;";
  }
  return db.query(baseQuery, [topic]).then((result) => {
    return result.rows;
  });
};

exports.fetchArticleComments = (article_id) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1;", [article_id])
    .then((result) => {
      return result.rows;
    });
};

exports.saveArticleComment = (article_id, comment) => {
  return db
    .query(
      "INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *",
      [comment.username, comment.body, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.deleteComment = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comments.comment_id = $1", [comment_id])
    .then(() => {
      return;
    });
};
