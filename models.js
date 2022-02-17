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

// exports.patchArticleVoteCount = (article_id) => {
//   return db.query("SELECT * FROM articles WHERE article_id = $1;", [
//     // need to insert in to database
//     article_id,
//   ]);
// };

// NOTES >>>
// PATCH /api/articles/:article_id
// Request body accepts:
// an object in the form { inc_votes: newVote } newVote will indicate how much the votes property in the database should be updated by
// e.g. { inc_votes : 1 } would increment the current article's vote property by 1
// { inc_votes : -100 } would decrement the current article's vote property by 100

// Responds with:
//  the updated article
