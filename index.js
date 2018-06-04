const express = require("express");

const cookieSession = require("cookie-session");

const bodyParser = require("body-parser");

const environment = process.env.NODE_ENV || "development";
const knexConfig = require("./knexfile")[environment];
const knex = require("knex")(knexConfig);

// const knexLogger  = require('knex-logger');

// app.use(knexLogger(knex));
function result() {
  return Math.round(Math.random() * 100) + 7900;
}

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

app.get("/join", (request, response) => {
  // check if there are any games with empty spots

  knex
    .select("id", "user1_name", "user2_name", "multi_winner")
    .from("multigame")
    .where("user2_name", "")
    .orWhere("user2_name", request.session.userid)
    .andWhere("multi_winner", "")
    .orWhere("user1_name", request.session.userid)
    .andWhere("multi_winner", "")
    .then(function(result) {
      console.log("Current player:" + request.session.userid);

      // get user table info for pknum and username
      knex("users")
        .where({ username: request.session.userid })
        .then(function(data) {
          let usrnm = data[0].username;
          let pknum = data[0].pokedex_num;

          // if there is a game and it is not finished

          if (result.length !== 0) {
            let gameid = result[0].id;
            const plyr1 = result[0].user1_name;
            const me = request.session.userid;

            // run this to set every winner to a value... yes I'm a juvenile.

            // knex("multigame")
            // .update({
            //   multi_winner: "poopbomb"

            // })
            // .then(something => {
            //   response.status(200);
            // });

            // if player1 isn't me than add me and my pokemon to player 2

            if (plyr1 !== me) {
              knex("multigame")
                .where({ id: gameid })
                .update({
                  user2_name: usrnm,
                  user2_pokedex_num: pknum
                })
                .then(something => {
                  response.status(200);
                });
              console.log("player 2 going to game " + gameid);
              return response.redirect("/multi");
            }

            // if player1 is me than take me to the game

            if (plyr1 === me) {
              console.log("player 1 going to game " + gameid);
              return response.redirect("/multi");
            }
          }

          // if no games than create a game with me as user 1 and attacker

          if (result.length === 0) {
            knex("multigame")
              .insert({
                user1_name: usrnm,
                user1_pokedex_num: pknum,
                user1_poke_health: 100,
                user2_name: "",
                user2_pokedex_num: 999,
                user2_poke_health: 100,
                multi_winner: "",
                multi_attacker: usrnm
              })
              .then(result => {
                response.status(200);
              });
            console.log("I create a game");
            return response.redirect("/join");
          }
        });
    });
});

app.get("/multi", (request, response) => {
  response.render("multi");
});

//  >>>>>>>>>>>>>>>>>>>>>>>>>> DATABASE ROUTES <<<<<<<<<<<<<<<<<<

//  >>>>>>>>>>>>>>>>>  GET POKEMON database <<<<<<<<<<<<<<<<<<//

app.get("/pokemon", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    knex
      .select()
      .from("pokemon")
      .then(function(result) {
        console.log("accessing pokemon database");
        return response.send(result);
      });
  } else {
    response.redirect("/login");
  }
});

//  >>>>>>>>>>>>>>>>> GET CURRENT users name <<<<<<<<<<<<<<<<<<//

app.get("/myusername", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    return response.send(usrID);
  }
  response.redirect("/login");
});

//  >>>>>>>>>>>>>>>>> GET multigame stats per user <<<<<<<<<<<<<<<<<<//

app.get("/multistats", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    knex
      .select("id", "user1_name", "user2_name", "multi_winner")
      .from("multigame")
      .where("user2_name", request.session.userid)
      .andWhereNot("multi_winner", "")
      .orWhere("user1_name", request.session.userid)
      .andWhereNot("multi_winner", "")
      .then(function(result) {
        console.log("accessing multigame database");
        return response.send(result);
      });
  } else {
    response.redirect("/login");
  }
});

app.get("/multirank", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    knex
      .select("multi_winner as username")
      .from("multigame")
      .whereNot("multi_winner", "")
      .count("multi_winner as wins")
      .groupBy("multi_winner")
      .then(function(result) {
        console.log("accessing multigame database");
        return response.send(result);
      });
  } else {
    response.redirect("/login");
  }
});

//  >>>>>>>>>>>>>>>>> GET currentgame <<<<<<<<<<<<<<<<<<//
app.get("/lastgame", (request, response) => {
response.render("lastgame");
});

app.get("/last", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    knex
      .select()
      .from("multigame")
      .where("user1_name", usrID).andWhereNot("multi_winner","")
      .orWhere("user2_name", usrID).andWhereNot("multi_winner","")
      .orderBy("id","desc")
      .then(function(result) {
        console.log(result[0]);
        response.send(result[0]);
      });
  } else {
    response.redirect("/login");
  }
});



app.get("/currentgame", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    knex
      .select()
      .from("multigame")
      .where("user1_name", usrID)
      .andWhere("multi_winner", "")
      .orWhere("user2_name", usrID)
      .andWhere("multi_winner", "")
      .then(function(result) {
        console.log("accessing multigame database");
        return response.send(result);
      });
  } else {
    response.redirect("/login");
  }
});



app.post("/currentgame", (request, response) => {
  const usrID = request.session.userid;
  knex("multigame")
    .where("user1_name", usrID)
    .andWhere("multi_winner", "")
    .orWhere("user2_name", usrID)
    .andWhere("multi_winner", "")
    .update(request.body)    
    .then(function(res) {
      
    });
    
});
//  >>>>>>>>>>>>>>>>> GET multigame <<<<<<<<<<<<<<<<<<//

app.get("/multigame", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    knex
      .select()
      .from("multigame")
      .then(function(result) {
        console.log("accessing multigame database");
        return response.send(result);
      });
  } else {
    response.redirect("/login");
  }
});

//  >>>>>>>>>>>>>>>>> GET ALL of current users information (password) <<<<<<<<<<<<<<<<<<//

app.get("/user", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    knex
      .select()
      .from("users")
      .where("username", usrID)
      .then(function(result) {
        console.log("accessing user database");
        return response.send(result);
      });
  } else {
    response.redirect("/login");
  }
});

app.get("/gamesSorted", (request, response) => {
  const usrID = request.session.userid;
  if (usrID !== undefined) {
    knex
      .select('username', 'wins').from('users').orderBy('wins', 'desc')
      .then(function(result) {
        return response.send(result);
      });
  } else {
    response.redirect("/login");
  }
});
//  >>>>>>>>>>>>>>>>> DATABASE ROUTES ABOVE <<<<<<<<<<<<<<<<<<

// app.get("/wild", (request, response) => {
//   // renders the GAME PAGE FOR WILD
//   response.render("/wild");
// });

app.post("/register", (request, response) => {
  if (
    request.body.username !== "" &&
    request.body.email !== "" &&
    request.body.pass !== "") {
    let rand = Math.round(Math.random() * 2);
    let array = [1, 4, 7];
    let num = array[rand];

    knex.select('username').from("users").where("username",request.body.username).then(result => {
      if (result.length === 0){
            knex("users")
            .insert({
                username: request.body.username,
                email: request.body.email,
                password: request.body.pass,
                pokedex_num: num}).then(result => {
                response.status(200);
                });
      request.session["userid"] = request.body.username;
      response.redirect("/profile");
      }
      else if (result.length > 0) {
        response.send("Please select another username");
      }
    });
  }
  else {
    response.send("Please enter a valid username, email, and password");
  }
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
