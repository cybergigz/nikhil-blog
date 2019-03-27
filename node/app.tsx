const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require('passport-local');

const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require('./routes/auth.tsx');

require('dotenv').config();

mongoose.connect("mongodb://localhost:27017/ustxdb", {
  useCreateIndex: true,
  useNewUrlParser: true
});



app.set('x-powered-by', false);
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use("/api", authRoutes);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'))

module.exports = app;
