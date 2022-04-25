const cors = require("cors");
const express = require("express");
const {
  getTopics,
  getArticle,
  patchArticleById,
  getUsers,
  getArticles,
  getArticleComments,
  postArticleComment,
  getEndpoints,
  deleteComment,
} = require("./controllers.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);
app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postArticleComment);

app.delete("/api/comments/:comment_id", deleteComment);

/// Error handling >>>

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
}); //catches all when an invalid path name is requested

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

// psql custom errors
app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502")
    res.status(400).send({ msg: "bad request" });
  else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error" }); // for broken code/internal routing errors
});

module.exports = app;
