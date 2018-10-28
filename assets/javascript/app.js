$(document).ready(function () {

  var topics = ["mike meyers", "anne hathaway", "julie andrews", "robin williams",
    "meryl streep", "emily blunt", "stanley tucci", "hugh jackman", "zac efron", "michelle williams", "anna kendrick", "rebel wilson", "elizabeth banks", "adam devine", "tom hanks", "johnny depp", "morgan freeman", "ryan gosling", "dwayne johnson", "al pacino", "george clooney", "ryan reynolds", "ed norton", "kaley cuoco", "johnny galecki", "judd apatow"];


  // create buttons for topics array
  gifButtons = function () {

    $("#gifButtonLibrary").empty();

    for (i = 0; i < topics.length; i++) {
      var gifBtn = GifButton(topics[i]);
      $("#gifButtonLibrary").append(gifBtn);
    }
  }

  // function to display to giphy api
  displayGifs = function () {

    $("#gifDisplay").html('Loading...');
    var offset = Math.floor(Math.random() * 51);
    var gifName = $(this).attr("giphy");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=kw2aHO9QWEEmk2n1qQ8YYAvarpcTOXjj&rating=r&sort=relevant&offset=" + offset + "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      $("#gifDisplay").html('');
      var results = response.data;

      for (i = 0; i < results.length; i++) {
        var gifImage = GifDisplay(response.data[i]);
        $("#gifDisplay").prepend(gifImage);
      }

    });

  }

  // add new buttons (array)

  $("#gifSubmit").on("click", function (event) {

    event.preventDefault();

    var newButton = $("#newGifButtons").val();
    topics.push(newButton);
    gifButtons();
    $("#inputForm").children("input").val("");
  });


  function GifButton(btn) {
    var gifBtn = $("<button>");
    gifBtn.addClass("btn btn-light gifButton");
    gifBtn.attr("giphy", btn);
    gifBtn.text(btn);
    gifBtn.on('click', displayGifs);
    return gifBtn;
  }

  function GifDisplay(gif) {
    var playGif = gif.images.fixed_height.url;
    var pauseGif = gif.images.fixed_height_still.url;
    var gifRating = gif.rating;
    var playstate = false;

    var gifElement = $("<div class='gif'></div>")
    var gifImage = $("<img></img>");
    var rating = $("<p>rating: " + gifRating + "</p>");

    gifElement.append(gifImage);
    gifImage.addClass("gifImage");
    gifElement.append(rating);
    gifImage.attr("src", pauseGif);

    // click to toggle play / pause 
    gifImage.on('click', function () {
      if (!playstate) {
        gifImage.attr("src", playGif);
      } else {
        gifImage.attr("src", pauseGif);
      }
      playstate = !playstate
    })

    return gifElement
  }


  gifButtons();


});