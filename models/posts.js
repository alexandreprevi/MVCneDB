module.exports = {
  getPosts: function () {
    db.posts.find({});
  },

  insertPost: function () {
    db.posts.insert({});
  },

  deletePost: function () {
    db.posts.delete({});
  },

  updatePost: function () {
    db.posts.update({});
  },
};
