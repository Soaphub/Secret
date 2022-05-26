//jshint esversion:6

require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption")

const app = express();

app.use(express.static("public"));
app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Connecting with MongoDB
mongoose.connect("mongodb://localhost:27017/usersDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const User =  mongoose.model("User",userSchema);


// Get function for home, login and registration
app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});


// Post function for login and registration
app.post("/register", function(req, res){
  const email = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    email: email,
    password: password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets");
    }
  });
});

app.post("/login", function(req, res){
  const email = req.body.username;
  const password = req.body.password;

  User.findOne({email: email}, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("secrets");
        }
      }
    }
  });
});

app.listen(3000, function(){
  console.log("Succesfully conected to Port 3000");
});