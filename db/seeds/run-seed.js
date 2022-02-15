const testData = require("../data/test-data/index.js"); // importing from test-data/index.js
const seed = require("./seed.js"); // importing the seed function from the seed.js file
const db = require("../connection.js"); // import connection to database

//------------------------------------------------------------------------------------------------------------------------------------

seed(testData)
  .then(() => {
    console.log("success :)");
    return db.end();
  })
  .catch((err) => {
    console.log(err);
  }); // this invokes the seed function and passes in the testData variable which consists of an
//  array of objects with data that can be populated in to the database via the seed function.
