exports.articleData = require("./articles.js");
exports.commentData = require("./comments.js");
exports.topicData = require("./topics.js");
exports.userData = require("./users.js");

// The job of index.js in each of the data folders is to export out all the data from that folder,
// currently stored in separate files. This is so that, when you need access to the data elsewhere,
// you can write one convenient require statement - to the index file, rather than having to require each file individually.
// Think of it like a index of a book - a place to refer to! Make sure the index file exports an object with values of the data
//  from that folder with the keys:

//   topicData
//   articleData
//   userData
//   commentData
