//jshint esversion:6

require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
// // const bcrypt = require('bcrypt');
// const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

// Intialising Session
app.use(session({
  secret: 'My secret text.',
  resave: false,
  saveUninitialized: true
}));

// Intialising passport and impliment continue login sessoin
app.use(passport.initialize());
app.use(passport.session());

// Connecting with MongoDB
mongoose.connect("mongodb://localhost:27017/usersDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// Configeration of passport local strategy, serialize and deserialize of model for passport session support
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Get function for home, login, registration, secrets, logout
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/secrets", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
})

app.get("/logout", function(req,res){
  req.logout(function(){
    res.redirect('/');
  });
});


// Post function for login and registration
app.post("/register", function(req, res) {
  // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     const email = req.body.username;
  //     const password = hash
  //
  //     const newUser = new User({
  //       email: email,
  //       password: password
  //     });
  //     newUser.save(function(err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.render("secrets");
  //       }
  //     });
  //   }
  // });

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate('local')
      (req, res, function(){
        res.redirect("/secrets");
      });
    }
  });
});


app.post("/login", function(req, res) {
  // const email = req.body.username;
  // const password = req.body.password;
  //
  // User.findOne({
  //   email: email
  // }, function(err, foundUser) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (foundUser) {
  //       bcrypt.compare(password, foundUser.password, function(err, result) {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           if (result === true) {
  //             res.render("secrets");
  //           }
  //         }
  //       });
  //     }
  //   }
  // });

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      passport.authenticate('local')
      (req, res, function(){
        res.redirect("/secrets");
      });
    }
  });
});



app.listen(3000, function() {
  console.log("Succesfully conected to Port 3000");
});
