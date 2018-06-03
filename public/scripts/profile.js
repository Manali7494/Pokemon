

/*function createElement(data) {
  const pokedexNum = data.something;
  const tregavatar =  data.something;
  const thandle =  data.something;
  const ttext =  data.something;

  // Inject values to premade template

  const $cards = $(
    `<div class="current-left">
      <img class="element" src="images/grass.png" alt="element">
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/`,
    +pokedexNum+
      `.png" alt="Pokemon">
      <h3>
              <div class="hp">HP:100</div>
              <div class="attack">AP:20</div>
      </h3>
  </div>`
  );
  return $cards;
}



createElement(data);
$("#form-input input").click(function(event) {
  event.preventDefault();

  // Check for spaces and return value string.length after they are removed
  function checkSpaces(text) {
    const array = text.toString();
    let result = "";
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === " ") {
        result += "";
      } else result += array[i];
    }
    return result.length;
  }

  const char = +$("textarea").val().length;
  const textVal = $("textarea").val();

  if (char === 0 || checkSpaces(textVal) === 0) {
    $("#error2").fadeOut(0);
    $("#error1").fadeOut(100);
    return $("#error1").fadeIn(100);
  }

  $("#error1").fadeOut(0);

  if (char > 140) {
    $("#error2").fadeOut(100);
    return $("#error2").fadeIn(100);
  }

  $("#error2").fadeOut(0);

  const sdata = $("#form-input").serialize();

  $.ajax({
    type: "POST",
    cache: false,
    url: "/tweets",
    data: sdata,
    success(data) {
      renderTweets(data);
    }
  });

  $("#success").fadeIn(100);
  $("textarea").val("");
  $(".counter").text(140);
  $("#success").fadeOut(2500);
});

$("#compose").on("click", function() {
  $(".new-tweet").slideToggle(70);
  $("textarea").focus();
});

const input = document.getElementById("myInput");
*/