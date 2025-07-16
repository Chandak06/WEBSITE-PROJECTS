const express = require("express");
const app = express();
const userModel = require("./models/user.js");
const postModel = require("./models/post.js");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const post = require("./models/post.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  await user.populate("posts");
  res.render("profile", { user });
});

app.post("/delete/:postid", isLoggedIn, async (req, res) => {
  const postId = req.params.postid;
  await postModel.findByIdAndDelete(postId);

  const user = await userModel.findOne({ email: req.user.email });
  user.posts = user.posts.filter((pid) => pid.toString() !== postId);
  await user.save();

  res.redirect("/profile");
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  const post = await postModel.findById(req.params.id).populate("user");
  post.likes.push(req.user.userid);
  await post.save()
});

app.post("/post", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content: content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("login");
});

app.post("/register", async (req, res) => {
  let { email, password, username, name, age } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).json({ message: "user already registered" });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });
      const token = jwt.sign({ email: email, userid: user._id }, "shhhh");
      res.cookie("token", token);
      res.send("resgitered!");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) res.status(500).json({ message: "something went wrong" });

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: email, userid: user._id }, "shhhh");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "shhhh");
    req.user = data;
  }

  next();
}

app.listen(3000, () => {
  console.log("Server is running!");
});
