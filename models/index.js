// Import models
const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

// Define Post relationship to User
User.hasMany(Post, {
    foreignKey: "user_id"
});

Post.belongsTo(User, {
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
User.hasMany(Comment, {
    foreignKey: "user_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { User, Post, Comment };