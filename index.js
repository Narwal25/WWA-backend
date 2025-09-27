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
const API_PREFIX = process.env.API_PREFIX || '';
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

// MongoDB connection
require('./db/conn');

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed'), false);
    }
  }
}));
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

app.use(API_PREFIX, require('./routes/auth'));
app.use(API_PREFIX, require('./routes/adminauth'));
app.use(API_PREFIX, require('./routes/bookings'));


app.get('/', (req, res) => {
  res.send('Welcome to Wednesdays Wicked Adventurs!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
