const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

const helmet = require('helmet');
app.use(helmet());

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));

app.use('/images', express.static(path.join(__dirname, 'images')));

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const postRoutes = require('./routes/post');
app.use('/api/post', postRoutes);

const commentRoutes = require('./routes/comment');
app.use('/api/comment', commentRoutes);

const likeRoutes = require('./routes/like');
app.use('/api/like', likeRoutes);

module.exports = app;