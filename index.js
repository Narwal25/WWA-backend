const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const swaggerConfig = require('./swagger');

const app = express();

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

// MongoDB connection
require('./db/conn');

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
    cookie: {
      maxAge: 1000 * 60 * 50,
      httpOnly: true,
      secure: false,
    },
  })
);

swaggerConfig(app);

app.use(require('./routes/auth'));
app.use(require('./routes/adminauth'));
app.use(require('./routes/bookings'));


app.get('/', (req, res) => {
  res.send('Welcome to Wednesdays Wicked Adventurs!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
