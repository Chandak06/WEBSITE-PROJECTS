const express = require("express");
const app = express();
const userModel = require("./modules/user.js");
const postModel = require("./modules/post.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("login");
});

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.redirect("/login");

  try {
    const data = jwt.verify(token, "yo");
    req.user = data;
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

app.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel.findById(req.user.userid).populate("posts");
  res.render("profile", { user });
});

app.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(500).json({ message: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(500).json({ message: "Incorrect Password" });

    const token = jwt.sign({ email: email, userid: user._id }, "yo");

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
});

app.post("/register", async (req, res) => {
  let { name, username, age, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).json({ message: "User already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    username,
    age,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ email: email, userid: newUser._id }, "yo");
  res.cookie("token", token);
  res.status(200).json({ message: "User registered successfully!" });
});

app.post("/post", isLoggedIn, async (req, res) => {
  const { content } = req.body;

  const post = await postModel.create({
    user: req.user.userid,
    content,
  });

  const user = await userModel.findById(req.user.userid).populate("posts");
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.post("/delete/:id", isLoggedIn, async (req, res) => {
  const postId = req.params.id;
  await postModel.findByIdAndDelete(postId);

  await userModel.findByIdAndUpdate(req.user.userid, {
    $pull: { posts: postId },
  });
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  const post = await postModel.findById(req.params.id);

  if (!post) return res.redirect("/profile");

  res.render("edit", { post });
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;

  await postModel.findByIdAndUpdate(postId, { content });

  res.redirect("/profile");
});

app.post("/like/:id",isLoggedIn,async (req,res)=>{
    const post= await postModel.findById(req.params.id);

    if(!post) return res.redirect("/profile");

    const userId=req.user.userid;
    if (!post.likes) post.likes = [];
    
    if(post.likes.includes(userId)){
        post.likes.pull(userId);
    }else{
        post.likes.push(userId);
    }
    await post.save();

    res.redirect("/profile");
})

app.listen(3000, () => {
  console.log("Server Up!");
});
