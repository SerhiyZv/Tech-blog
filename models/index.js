// Import models
const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

// Define Post relationship to User
Post.hasOne(User, {
    foreignKey: "user_id"
});

User.belongsTo(Post, {
    foreignKey: "user_id"
});

// Define Post relationship to Comment
Post.hasMany(Comment, {
    foreignKey: "post_id",
    // Deleting post deletes any associated comments
    onDelete: "CASCADE"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

// Define Comment relationship to User
Comment.hasOne(User, {
    foreignKey: "user_id"
});

User.belongsTo(Comment, {
    foreignKey: "user_id"
});

module.exports = { User, Post, Comment };