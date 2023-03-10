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
          order: [
            ["post_date", "DESC"]
          ]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// Show blog post with ID
router.get("/post/:id", async (req, res) => {
     // IDs should only be numbers
     if (!/^[0-9]+$/.test(req.params.id)) {
        res.status(400).json("Error: Improper URL");

        return;
    }

    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    order: [
                        ["comment_date", "ASC"]
                    ],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })

        const post = postData.get({ plain: true });

        res.render("post", { 
            ...post,
            loggedIn: req.session.loggedIn
         });
    } catch (err) {
        res.status(500).json(err);
    }
})


// Show dashboard
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userId
            },
            order: [
                ["post_date", "DESC"]
            ],
        })

        const posts = postData.map(post => post.get({ plain: true }));

        res.render("dashboard", { 
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// Show blog post drafting page
router.get("/dashboard/new-post", withAuth, (req, res) => {
    try {
        res.render("write", {
            existingPost: false
        });
    } catch (err){
        res.status(500).json(err);
    }
})

// Show blog post updating/deleting page
router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
    // IDs should only be numbers
    if (!/^[0-9]+$/.test(req.params.id)) {
        res.status(400).json("Error: Improper URL");

        // Stop execution
        return;
    }
    try {
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain: true });

        res.render("write", {
             ...post,
             existingPost: true,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// Show login page
router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

// Show sign up page
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
})

module.exports = router;