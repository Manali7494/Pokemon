$.get("/myusername", function(myuser) {
  $.get("/currentgame", function(game) {
    const gameid = game[0].id;
    const attacker = game[0].multi_attacker;
    const user1 = game[0].user1_name;
    const user2 = game[0].user2_name;
    const user1hp = game[0].user1_poke_health;
    const user2hp = game[0].user2_poke_health;
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
    if (opponent !== attacker) {
      $(".hide-btns").css("visibility","visible");
    }

    
    // window.location
    function refresh(){
      return window.location = window.location;
    }
    if(opponent === attacker){
    setTimeout(refresh,2000)
  }
    $(".current-left").click(function(event) {
      $.post("/currentgame", { multi_attacker: opponent });
      location.reload();
    });
  });
});
