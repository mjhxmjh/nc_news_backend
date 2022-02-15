const db = require("/Users/matt/northcoders/projects/be-nc-news/db/connection.js");
// const seed = require("./db/seeds/seed.js");

//------------------------------------------------------------------------------------------------------------------------------

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};
