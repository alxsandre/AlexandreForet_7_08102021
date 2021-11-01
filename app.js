const express = require('express');
const app = express();

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

const sequelize = new Sequelize('grouporama', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: 'database',
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

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const postRoutes = require('./routes/post');
app.use('/api/post', postRoutes);

module.exports = app;