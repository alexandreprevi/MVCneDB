const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

bodyParser = require("body-parser");

// database
var Datastore = require("nedb-promise");
db = {};
db.posts = new Datastore({ filename: __dirname + "/database/posts.db" });
db.comments = new Datastore({ filename: __dirname + "/database/comments.db" });

exports.db = db;

// You need to load each database (here we do it asynchronously)
db.posts.loadDatabase();
db.comments.loadDatabase();

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router
const router = require("./routes/routes");
app.use("/", router);

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
