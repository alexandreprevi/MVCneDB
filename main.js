const express = require("express");
var Datastore = require("nedb");
const { v4: uuidv4 } = require("uuid");

const app = express();

bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db = {};
db.posts = new Datastore({ filename: __dirname + "/db/posts.db" });
db.comments = new Datastore({ filename: __dirname + "/db/comments.db" });

// You need to load each database (here we do it asynchronously)
db.posts.loadDatabase();
db.comments.loadDatabase();

// CREATE A NEW POST
app.post("/post", (req, res) => {
  const { title, content } = req.body;
  db.posts.insert({ title, content }, (err, result) => {
    if (err) res.status(500).send(err);
    if (!content) res.status(400).end("Content is missing");
    if (!title) res.status(400).end("Title is missing");
    res.status(200).json({ inserted: result });
  });
});

// CREATE A NEW COMMENT TO A SPECIFIC POST
app.post("/post/:id/comment", (req, res) => {
  const postID = req.params.id;
  const { user, message, timestamp } = req.body;
  db.comments.insert(
    { _id: uuidv4(), user, message, timestamp, postId: postID },
    (err, result) => {
      if (err) res.status(500).send(err);
      res
        .status(200)
        .json({ message: "Number of created comments: " + result });
    }
  );
});

// DELETE A EXISTING COMMENT TO A SPECIFIC POST
app.delete("/comment/:id", (req, res) => {
  const commentId = req.params.id;

  db.comments.remove({ _id: commentId }, {}, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).json({ message: "Number of deleted comments: " + result });
  });
});

// UPDATE A EXISTING COMMENT TO A SPECIFIC POST
app.put("/comment/:id", (req, res) => {
  const commentId = req.params.id;
  const { user, message, timestamp } = req.body;

  db.comments.update(
    { _id: commentId },
    {
      $set: {
        user: user,
        message: message,
        timestamp: timestamp,
      },
    },
    {},
    (err, result) => {
      if (err) res.status(500).send(err);
      res
        .status(200)
        .json({ message: "Number of updated comments: " + result });
    }
  );
});

// UPDATE EXISTING POST WITH TITLE AND CONTENT
app.put("/post/:id", (req, res) => {
  const postID = req.params.id;
  const { title, content } = req.body;
  db.posts.update({ _id: postID }, { title, content }, {}, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).json({ message: "Number of updated posts: " + result });
  });
});

// DELETE EXISTING POST
app.delete("/post/:id", (req, res) => {
  const postID = req.params.id;
  db.posts.remove({ _id: postID }, {}, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).json({ message: "Number of deleted posts: " + result });
  });
});

// GET ALL EXISTING POSTS
app.get("/posts", (req, res) => {
  db.posts.find({}, (err, result) => {
    if (err) res.status(500).send(err);
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
