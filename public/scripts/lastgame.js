$.get("/users", function(usersdata) {
  $.get("/user", function(userdata) {
    $.get("/myusername", function(myuser) {
      $.get("/last", function(game) {
        const gameid = game.id;
        const attacker = game.multi_attacker;
        const user1 = game.user1_name;
        const user2 = game.user2_name;
        const user1hp = game.user1_poke_health;
        const user2hp = game.user2_poke_health;
        const winner = game.multi_winner;

        $("#gameover").css("visibility", "visible");
        $("#gameover h2").text(winner + " Wins");

        let myhp;
        let opphp;

        if (user1 !== myuser) {
          myhp = game.user2_poke_health;
          opphp = game.user1_poke_health;
        } else {
          myhp = game.user1_poke_health;
          opphp = game.user2_poke_health;
        }
        $(".active .hp").text("HP: " + myhp);
        $(".opponent .hp").text("HP: " + opphp);

        const pokedexnumber = userdata[0].pokedex_num.toString();
        let zeros;
        if (pokedexnumber.length === 1) {
          zeros = "00";
        }
        if (pokedexnumber.length === 2) {
          zeros = "0";
        }
        if (pokedexnumber.length === 3) {
          zeros = "";
        }

        // alert(zeros)

        $("#mypoke").attr(
          "src",
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
            zeros +
            pokedexnumber +
            ".png"
        );

        let opponent;
        if (user1 !== myuser) {
          opponent = user1;
        } else {
          opponent = user2;
        }
        let opppokedexnumber = "";

        for (let i = 0; i < usersdata.length; i += 1) {
          if (usersdata[i].username === opponent) {
            opppokedexnumber = usersdata[i].pokedex_num.toString();
          }
        }

        let oppzeros;
        if (opppokedexnumber.length === 1) {
          oppzeros = "00";
        }
        if (opppokedexnumber.length === 2) {
          oppzeros = "0";
        }
        if (opppokedexnumber.length === 3) {
          oppzeros = "";
        }

        $("#opppoke").attr(
          "src",
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
            oppzeros +
            opppokedexnumber +
            ".png"
        );
      });
    });
  });
});
