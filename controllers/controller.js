const postModel = require("../models/posts");
const commentModel = require("../models/comments");

exports.getPosts = (req, res) => {
  postModel.getPost();

  db.posts.find({}, (err, result) => {
    if (err) res.status(500).send(err);
    res.send(result);
  });
};

exports.insertPost = (req, res) => {
  const { title, content } = req.body;
  db.posts.insert({ title, content }, (err, result) => {
    if (err) res.status(500).send(err);
    if (!content) res.status(400).end("Content is missing");
    if (!title) res.status(400).end("Title is missing");
    res.status(200).json({ inserted: result });
  });
};

exports.deletePost = (req, res) => {
  const postID = req.params.id;
  db.posts.remove({ _id: postID }, {}, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).json({ message: "Number of deleted posts: " + result });
  });
};

exports.updatePost = (req, res) => {
  const postID = req.params.id;
  const { title, content } = req.body;
  db.posts.update({ _id: postID }, { title, content }, {}, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).json({ message: "Number of updated posts: " + result });
  });
};

exports.insertComment = (req, res) => {
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
};

exports.updateComment = (req, res) => {
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
};

exports.deleteComment = (req, res) => {
  const commentId = req.params.id;

  db.comments.remove({ _id: commentId }, {}, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).json({ message: "Number of deleted comments: " + result });
  });
};
