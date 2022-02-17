const db = require("/Users/matt/northcoders/projects/be-nc-news/db/connection.js");
// const seed = require("./db/seeds/seed.js");

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
