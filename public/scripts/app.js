/*$(document).ready(function(){
$("#statsTable").hide();

$.get("/multigame", function(data){
  $("#stats").click(function(){
    $("#central").hide();
    $("#statsTable").show();
  });
});*/


$(document).ready(function(){
  $("#statsTable").hide();
  $.get("/pokemon", function(pokeList){
    $.get("/user", function(userInfo){
      var pokeNum = userInfo[0].pokedex_num;
      for (var pokemon of pokeList){
        if (pokemon.pokedex_num === pokeNum){
          var imgPic = pokemon.imgurl;
          $("#pokePic").attr("src", imgPic);
        }
        }
    });
  });

var index = 0;
  $.get("/multistats", function(array){
    $.get("/myusername", function(username){
    $("#stats").click(function(){
    for (var i of array){
    index += 1;
    if (index <= array.length){
    $("#tableS").append(`<tr> <th> ${index} </th> <th>${i.user1_name} </th> <th> ${i.user2_name}</th> <th> ${i.multi_winner}</tr>`);
    }
    }
        $("#central").hide();
    $("#statsTable").show();
    });

    });
  });

    $.get("/gamesSorted",function(array){
    $.get("/myusername", function(username){
      $("#stats").click(function(){
        array.forEach(function(element, index){
          if (username === element.username){
            rank = index + 1;
          }
        });
        $('.numWins').text(`Your rank is: ${rank}`);
    });

    });
    });



});