const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.js");
const commentController = require("../controllers/comments.js");

// CREATE A NEW POST
router.post("/post", postController.insertPost);

// DELETE EXISTING POST
router.delete("/post/:id", postController.deletePost);

//GET ALL EXISTING POSTS
router.get("/posts", postController.getPosts);

// UPDATE EXISTING POST WITH TITLE AND CONTENT
router.put("/post/:id", postController.updatePost);

// CREATE A NEW COMMENT TO A SPECIFIC POST
router.post("/post/:id/comment", commentController.insertComment);

// UPDATE A EXISTING COMMENT TO A SPECIFIC POST
router.put("/comment/:id", commentController.updateComment);

// DELETE A EXISTING COMMENT TO A SPECIFIC POST
router.delete("/comment/:id", commentController.deleteComment);

module.exports = router;
