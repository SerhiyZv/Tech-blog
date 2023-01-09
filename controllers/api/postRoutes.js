const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            text: req.body.text,
            post_date: req.body.post_date,
            user_id: req.session.user_id
        })

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// Update existing post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        // If no post found matching post and user IDs return Message
        if (!postData) {
            res.status(404).json({ message: "No post found with that ID" });
            
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err)
    }
})

// Delete existing post
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        // If no post found matching post and user IDs return message
        if (!postData) {
            res.status(404).json({ message: "No post found with that ID" });
            
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;