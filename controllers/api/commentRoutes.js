const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new comment
router.post('/new', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            text: req.body.text,
            comment_date: req.body.comment_date,
            user_id: req.session.userId,
            // Should be able to access from client
            post_id: req.body.post_id
        })

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;