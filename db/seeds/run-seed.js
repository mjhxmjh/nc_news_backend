const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = require("/Users/matt/northcoders/projects/be-nc-news/db/connection.js");

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
