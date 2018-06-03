
$("#checkgame").on("click", function(event) {
  let gameexists= '';
  
  $.ajax({
    url: "/pending",
    success(data) {
        gameexists = data;
    }
  });
  console.log(gameexists)
if(gameexists === true){
    

}


  AsyncPolling(function(end) {
    if (gameexists === true) {
    //   $("#message").text("Your turn!");
      end();
      return this.stop();
    }
    end(console.log("still checking"));
  }, 1000).run();
});
