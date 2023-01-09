const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
        // Get all posts and join with user data
        const postData = await Post.findAll({
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
})

// Show blog post with ID
router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment
                }
            ]
        })

        const post = postData.get({ plain: true });

        res.render("post", { post });
    } catch (err) {
        res.status(500).json(err);
    }
})

// Show dashboard
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        })

        const posts = postData.map(post => post.get({ plain: true }));

        res.render("dashboard", { posts });
    } catch (err) {
        res.status(500).json(err);
    }
})

// Show blog post drafting page
router.get("/dashboard/new-post", withAuth, (req, res) => {
    try {
        res.render("write");
    } catch {
        res.status(500).json(err);
    }
})

// Show blog post updating/deleting page
router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne(req.params.id);

        const post = postData.get({ plain: true });

        res.render("write", { post });
    } catch (err) {
        res.status(500).json(err);
    }
})

// Show login page
router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;