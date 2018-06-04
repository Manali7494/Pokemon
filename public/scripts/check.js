$.get("/myusername", function(myuser) {
  $.get("/currentgame", function(game) {
    if(game.length === 0){
      window.location.replace("/lastgame");
    }
    const gameid = game[0].id;
    const attacker = game[0].multi_attacker;
    const user1 = game[0].user1_name;
    const user2 = game[0].user2_name;
    const user1hp = game[0].user1_poke_health;
    const user2hp = game[0].user2_poke_health;
    const winner = game[0].multi_winner;
    
    if(user1hp <= 0){
      $.post("/currentgame", { multi_winner: user2 });
      window.location.replace("/lastgame");
    }
    if(user2hp <= 0){
      $.post("/currentgame", { multi_winner: user1 });
      window.location.replace("/lastgame");
    }
      


    let center;
    if (attacker === myuser) {
      center = "your turn";
    } else {
      center = attacker + "'s turn!";
    }
    $("#your-turn").text("It's " + center);

    let opponent;
    if (user1 !== myuser) {
      opponent = user1;
    } else {
      opponent = user2;
    }
    if (myuser === attacker && opponent !== "") {
      $(".hide-btns").css("visibility", "visible");
    }
    let myhp;
    let opphp;
    if (user1 !== myuser) {
      myhp = game[0].user2_poke_health;
      opphp = game[0].user1_poke_health;
    } else {
      myhp = game[0].user1_poke_health;
      opphp = game[0].user2_poke_health;
    }
    $(".active .hp").text("HP: " + myhp);
    $(".opponent .hp").text("HP: " + opphp);
    // window.location
    function refresh() {
      window.location = window.location;
    }
    if (winner === "") {
      setTimeout(refresh, 2000);
    }
    const attack = Math.random() * 20 + 10;

    $(".current-right").click(function(event) {
      $.post("/currentgame", { multi_winner: opponent });
      window.location.replace("/lastgame");
    });

    $(".current-left").click(function(event) {
      let newhp = Math.round(opphp - attack);

      if (user1 === myuser) {
        $.post("/currentgame", {
          user2_poke_health: newhp,
          multi_attacker: opponent
        });
      } else {
        $.post("/currentgame", {
          user1_poke_health: newhp,
          multi_attacker: opponent
        });
      }
      location.reload();
    });
  });
});
