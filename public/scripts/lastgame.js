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

      });
    });

  