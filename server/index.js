const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;
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

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
    
  });