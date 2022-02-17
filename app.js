const express = require("express");
const app = express();
const { getTopics, getArticle, patchArticleById } = require("./controllers.js");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);
app.patch("/api/articles/:article_id", patchArticleById);

/// Error handling >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> to do:  handle custom errors in seperate error-handling file

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
}); //catches all when an invalid path name is requested

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02")
    res.status(400).send({ msg: "bad request - page not found" });
  else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error" }); // for broken code
});

module.exports = app;
