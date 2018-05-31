let j = 0;
$("#polling").on("click", function(event) {
  if (j === 2) {
    j = 0;
  }
  j += 1;
  AsyncPolling(function(end) {
    $("#message").text("I'm thinking!");

    if (j >= 2) {
      $("#message").text("Your turn!");
      end();
      return this.stop();
    }
    end(console.log("ENDED THE STUFF"));
  }, 1000).run();
});
