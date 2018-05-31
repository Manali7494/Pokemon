var express = require("express");

var app = express();

var PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");
// const cookieSession = require("cookie-session");

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   cookieSession({
//     secret: "userID"
//   })
// );

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    // const templateVars = {
    //   urls: urlDatabase,
    //   user_id: req.session.user_id,
    //   email: req.session.email
    // };
    res.render("index");
  });