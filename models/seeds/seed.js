const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id
        });
    }

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: user[Math.floor(Math.random() * user.length)].id,
            post_id: Math.floor(Math.random() * pastData.length)
        })
    }
};

seedDatabase();