const express = require("express");

const cookieSession = require("cookie-session");

const bodyParser = require("body-parser");

const environment = process.env.NODE_ENV || "development";
const knexConfig = require("./knexfile")[environment];
const knex = require("knex")(knexConfig);

// const knexLogger  = require('knex-logger');

// app.use(knexLogger(knex));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cookieSession({
    secret: "userID"
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// <---------------NOTES ON KNEX ----------->
// SELECTING EVERYTHING
// app.get('/pokemons', function(req, res){
//   knex.select().from('pokemon').then(function(result){
//     res.send(result);
//   });
// });

// SELECTING ID = 1

// app.get('/usersid', function(req, res){
//   knex.select().from('users').where('id',1). then(function(usersid){
//     res.send(usersid);
//   });
// });

// INSERT ROW and send stuff
// app.post('/pokemons', function(req, res){
//   knex('pokemon').insert({
//     name: 'Added Pokemon',
//     pokedex_num: 2,
//     health: 100,
//     attack: 40,
//     type: 'fire',
//     rarity: 'common',
//     imgurl: 'http://'
//   })
//   .then(function(){
//     knex.select().from('pokemon')
//       .then(function(pokemons){
//         res.send(pokemons);
//       });
//   });
// });

// REFACTORED CODE
// GET

/* app.get('/pokemons/:id', function(req, res){
  knex.select()
    .from('pokemon')
    .where('id', req.params.id)
    .then(function(result){
      res.send(result);
});
    });
*/
// UPDATE --> NOTE: it adds to the end of the line

/* app.put('/pokemons/:id', function(req, res){
  console.log(req.body);
  knex('pokemon').where('id', req.params.id)
              .update({
                name: req.body.name
              })
              .then(function(){
                knex.select()
                .from('pokemon')
                .then(function(result){
                  res.send(result);
                  });
              })
});
*/

// DELETE
/* app.delete('/pokemons/:id', function(req, res){
  knex('wildgame').where('id', req.params.id).del().then(function(){
    knex.select()
    .from('wildgame')
    .then(function(result){
      res.send(result)
    })
  });
})
*/
// <!------------ END OF NOTES ON KNEX ------------->

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (request, response) => {
  let usrID = request.session.userid;
  if (usrID !== undefined) {
    response.redirect("/profile");
  } else {
    response.render("login");
  }
});

app.get("/profile", (request, response) => {
  response.render("profile");
  /* knex('users').select().then((result) => {
    response.status(200).json(result);
  }); */
});

app.post("/login", (request, response) => {
  const password = request.body.pass;
  knex("users")
    .select("password")
    .where({ username: request.body.username })
    .then(result => {
      if (result.length > 0) {
        if (password === result[0].password) {
          request.session["userid"] = request.body.username;
          response.redirect("/profile");
        }
      } else {
        response.send("Please log in with correct username and password");
      }
    });
  });
  app.post("/logout", (request, response) => {
    request.session = null;
    response.redirect("/login");
  });
app.get("/register", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    response.redirect("/profiles");
  } else {
    response.render("register");
  }
});

app.get("/rank", (request, response) => {

  let user = request.session.userid;
  if (user !== undefined){
  knex.select('user1_name', 'user2_name', 'multi_winner').from('multigame').where('user1_name', user).then(data => {
  let gameDetails = data[0];
  knex('multigame').count('multi_winner').where('multi_winner',user).then(count => {
    let numWins = count[0].count;
    console.log(counter);
    console.log(dat);
  });
});

  }
});

app.get("/multi/:gameid", (request, response) => {
  const usrID = request.session.userid;
  if (usrID === undefined) {
    response.redirect("/login");
  }
});

app.post("/multi/:gameid", (request, response) => {
  knex("multigame")
    .where(
      "id",
      gameid
        .whereNot("user1_name", request.session.userid)
        .andWhereNot("user2_name", request.session.userid)
    )
    .then(function(result) {
      console.log("result");
      knex("multigame")
        .update({
          multi_attacker: result
        })
        .then(result => {
          response.status(200);
        });
      response.render("multi/:gameid");
    });
});

app.get("/multi/attacker", (request, response) => {
  knex("multigame")
    .where("multi_attacker", request.session.userid)
    .then(function(result) {
      // response.send
      console.log(result === request.session.userid);
    });
});

app.get("/wild", (request, response) => {
  // renders the GAME PAGE FOR WILD
  response.render("wild");
});

app.post("/register", (request, response) => {
  if (
    request.body.username !== "" &&
    request.body.email !== "" &&
    request.body.pass !== ""
  ) {
    let rand = Math.round(Math.random() * 2);
    let array = [1, 4, 7];
    let num = array[rand];

    knex("users")
      .insert({
        username: request.body.username,
        email: request.body.email,
        password: request.body.pass,
        pokedex_num: num
      })
      .then(result => {
        response.status(200);
      });
    request.session["userid"] = request.body.username;
    response.redirect("/profile");
  } else {
    response.send("Please enter a valid username, email, and password");
  }
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
