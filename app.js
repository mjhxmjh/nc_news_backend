const express = require("express");
const app = express();
const { getTopics } = require("./controllers.js");

app.use(express.json());

app.get("/api/topics", getTopics);

/// Error handling >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
}); //catches all when an invalid path name is requested

app.use((err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ msg: "bad request" });
  else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error" });
});

module.exports = app;
