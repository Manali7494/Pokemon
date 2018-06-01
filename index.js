const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");
// const cookieSession = require("cookie-session");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
// app.use(
//   cookieSession({
//     secret: "userID"
//   })
// );

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.redirect("/login");
  });

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/stats", (req, res) => {
  res.render("stats");
});

app.get("/rank", (req, res) => {
  res.render("rank");
});

app.get("/wild", (req, res) => {
  res.render("wild");
});

app.get("/multi", (req, res) => {
  res.render("multi");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
