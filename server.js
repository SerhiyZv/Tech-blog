const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const router = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/date');


const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

const { SECRET } = process.env;

const sess = {
  secret: SECRET,
  cookie: {
      // 15 minutes in milliseconds
      maxAge: 900000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const hbs = exphbs.create({ helpers });

app.use(function forceLiveDomain(req, res, next) {
  if (req.get('Host').includes("herokuapp") || req.get('Host').includes("www.")) {
    return res.redirect(301, `https://serhiytechblog.com${req.path}`);
  }
  return next();
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on PORT ${PORT}'));
});