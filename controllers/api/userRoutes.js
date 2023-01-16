const router = require('express').Router();
const { User } = require('../../models');

// POst the username is unique
router.post('/signup-username', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        name: req.body.name
      }
    });

    // Check if username is not matched in database
    if (userData === null) {
      res.status(200).json({ message: "Username is unique" });
      return;
    } else {
      res.status(500).json({ message: "Username is not unique" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
})

// POst the email is unique
router.post('/signup-email', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    // If email is not matched in database
    if (!userData) {
      res.status(200).json({ message: "Email is unique" });
      return;
    } else {
      res.status(500).json({ message: "Email is not unique" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
})

// Create new user
router.post('/signup-create', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        req.session.save( async () => {
            
            req.session.userId = await userData.id;
            req.session.loggedIn = true;

            res.status(200).json({
              user: userData,
            });
        })
    } catch (err) {
        res.status(500).json({ message: 'Sign up failed. Please try again!' });
        console.error(err);
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
        const validPassword = await userData.checkPassword(req.body.password);

        // If password is not matched return message
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }

        // If email and password have passed, user is logged in
          req.session.save( async () => {
          req.session.userId = await userData.id;
          req.session.loggedIn = true;

          res
            .status(200)
            .json({ 
              user: userData, 
              message: 'You are now logged in!'
            });
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

// Check if user is signed in before showing comment fields
router.post('/signed-in', (req, res) => {
  if (req.session.loggedIn) {
      res.status(200).json("Success");
  } else {
      res.status(500).json("Failure");
  }
})

module.exports = router;