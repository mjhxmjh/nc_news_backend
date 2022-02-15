// file for working on whilst waiting for pull. After pulling to main, copy and paste these in to the relevant sections of the project

const { response } = require("./app");
const app = require("./app");

// CREATE A PARAMETRIC ENDPOINT

// GET /api/articles/:article_id

// Responds with:

//     an article object, which should have the following properties:

//         author - which is the username from the users table
//         title
//         article_id
//         body
//         topic
//         created_at
//         votes

// in app.js >>>>>



// in controllers.js >>>>>>>>>


// in models.js >>>>>>>>>>



// in app.test.js >>>>>>>>>>

describe("GET api/articles/:article_id", () => {
  describe("responds with an object", () => {});
});

// error handling for this route (GET /api/articles/:article_id )
// >>>>
// Bad article_id (e.g. /dog) -- invalid path (404)
// Well formed article_id that doesn't exist in the database (e.g. /999999) -- article ID is non-existent (400?)
