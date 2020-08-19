module.exports = {
  insertComment: function () {
    return db.comments.insert({});
  },

  updateComment: function () {
    return db.comments.update();
  },

  deleteComment: function () {
    return db.comments.delete();
  },
};
