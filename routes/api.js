const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

// CREATE A NEW POST
router.post("/post", controller.insertPost);

// DELETE EXISTING POST
router.delete("/post/:id", controller.deletePost);

// CREATE A NEW COMMENT TO A SPECIFIC POST
router.post("/post/:id/comment", controller.insertComment);

// UPDATE A EXISTING COMMENT TO A SPECIFIC POST
router.put("/comment/:id", controller.updateComment);

// DELETE A EXISTING COMMENT TO A SPECIFIC POST
router.delete("/comment/:id", controller.deleteComment);

//GET ALL EXISTING POSTS
router.get("/posts", controller.getPosts);

// UPDATE EXISTING POST WITH TITLE AND CONTENT
router.put("/post/:id", controller.updatePost);

module.exports = router;
