const app = require("./app");

//run file to start server - install nodemon -
//---------------------------------------------------------

app.listen(9090, (err) => {
  console.log(err || "Listening on 9090...");
});

//---------------------------------------------------------
