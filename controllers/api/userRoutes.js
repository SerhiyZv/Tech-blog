const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        req.session.save(() => {
            
            req.session.loggedIn = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        res.status(500).json({ message: 'Sign up failed. Please try again!' })
    }
})

// Log in User
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
          where: {
            email: req.body.email,
          },
        });

        // email is not matched in database return message
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }

        // Checks password in database
        const validPassword = await dbUserData.checkPassword(req.body.password);

        // If password is not matched return message
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }

        // If email and password have passed, user is logged in
        req.session.save(() => {
          req.session.loggedIn = true;

          res
            .status(200)
            .json({ user: userData, message: 'You are now logged in!' });
        });
      } catch (err) {
        res.status(500).json(err);
      }
})

// Log out User
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;