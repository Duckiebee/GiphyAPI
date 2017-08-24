$(document).ready(function() {

var topics = ["Grumpy Cat", "Fat Cat", "Bald Cat", "Taco Kitty", "Pizza Kitty", "Persian Cat", "Hello Kitty", "Crookshanks", "Lil Bub", "Puss N Boots"];
var userTopics = [];

function createGifButton(topic){
    var gifButton = $('<button/>',
        {
            text: topic,
            class: "action btn btn-primary",
            attr: ("data-topic", topic),
            click: function () { displayGifs(topic); }
        });
    $("#gifButtons").append(gifButton);
}

function createUserGif(){
    $("#addButton").on("click", function(){
    var userInput = $("#action-input").val().trim();
    if (userInput == ""){
        alert("Please enter in a gif topic.")
      return;
    }
    userTopics.push(userInput);
    createGifButton(userInput);
    return;
    });
}
// Function to remove last action button
    // Doesnt work properly yet removes all of the added buttons
    // rather than just the last
function removeLastButton(){
    $("#removeButton").on("click", function(){
        if (userTopics.length > 0) {
            userTopics.pop();
        }
    return;
    });
}
// Function that displays all of the gifs
function displayGifs(topic){
    var giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=396a7668baf34fc280e68459ac97694a&q=" + topic + "&limit=10&offset=0&rating=G&lang=en";
    console.log(giphyUrl); // displays the constructed url
    $.ajax({
        url: giphyUrl,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); // console test to make sure something returns
        $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
        var results = response.data; //shows results of gifs
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}

for(var i in topics) {
    createGifButton(topics[i]);
}
 // displays list of topics already created
createUserGif();
removeLastButton();

$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});