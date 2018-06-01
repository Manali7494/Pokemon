


const express = require("express");
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const bodyParser = require("body-parser");
const app = express();


const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

app.use(knexLogger(knex));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// SELECTING EVERYTHING
app.get('/pokemons', function(req, res){
  knex.select().from('pokemon').then(function(pokemon){
    res.send(pokemon);
  });
});
// SELECTING ID = 1
app.get('/usersid',function(req,res){
  knex.select().from('users').where('id',1). then(function(usersid){
    res.send(usersid);
  });
});


// INSERT ROW and send stuff
/*app.post('/pokemons', function(req, res){
  knex('pokemon').insert({
    name: 'Added Pokemon',
    pokedex_num: 2,
    health: 100,
    attack: 40,
    type: 'fire',
    rarity: 'common',
    imgurl: 'http://'
  })
  .then(function(){
    knex.select().from('pokemon')
      .then(function(pokemons){
        res.send(pokemons);
      });
  });
});*/

// REFACTORED CODE
// GET

app.get('/pokemons/:id', function(req, res){
  knex.select()
    .from('pokemon')
    .where('id', req.params.id)
    .then(function(result){
      res.send(result);
});
    });

// UPDATE --> NOTE: it adds to the end of the line

app.put('/pokemons/:id', function(req, res){
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


// DELETE
app.delete('/pokemons/:id', function(req, res){
  knex('wildgame').where('id', req.params.id).del().then(function(){
    knex.select()
    .from('wildgame')
    .then(function(result){
      res.send(result)
    })

  });
})

// OTHER STUFF
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
