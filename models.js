const db = require("/Users/matt/northcoders/projects/be-nc-news/db/connection.js");
// const seed = require("./db/seeds/seed.js");

//------------------------------------------------------------------------------------------------------------------------------

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};

exports.getArticleById = (req) => {
  return db.query("SELECT * FROM users WHERE article_id = $1;", [
    req.params.article_id,
  ]);
};
