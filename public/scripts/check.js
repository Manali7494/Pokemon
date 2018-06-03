



$("#attack").on("click", function(event) {
  let myturn= '';
  
  $.ajax({
    url: "/multi/attack",
    success(data) {
      myturn = data;
    }
  });
  
  console.log(attacker)
  AsyncPolling(function(end) {
    $("#message").text(`The attacker is `,+attacker);

    if (myturn === true) {
      $("#message").text("Your turn!");
      end();
      return this.stop();
    }
    end(console.log("ENDED THE STUFF"));
  }, 1000).run();
});
