$(document).ready(function () {

    $("#action-input").val("");
    var topics = ["Grumpy Cat", "Funny Cat", "Kitten", "Cat Lady", "Pizza Cat", "Persian Cat", "Hello Kitty", "Crookshanks", "Lil Bub", "Puss N Boots"];

    function createGifButton(topic) {
        var gifButton = $('<button/>',
            {
                text: topic,
                class: "action btn btn-primary",
                attr: ("data-topic", topic),
                click: function () { displayGifs(topic); }
            });
        $("#gifButtons").append(gifButton);
    }


    function displayGifs(topic) {
        var giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=396a7668baf34fc280e68459ac97694a&q=" + topic + "&limit=10&offset=0&rating=G&lang=en";
        console.log(giphyUrl);
        $.ajax({
            url: giphyUrl,
            method: 'GET'
        })
            .done(function (response) {
                console.log(response);
                $("#gifsView").empty();
                var results = response.data;
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    for (var i in topics) {
        createGifButton(topics[i]);
    }

    function checkForExistingButton(userInput) {
        for (var i in topics) {
            if (topics[i].toLowerCase() === userInput) {
                return true;
            }
        }
    }


    $("#addButton").on("click", function () {
        var userInput = $("#action-input").val().trim().toLowerCase();
        if (userInput == "") {
            alert("Please enter in a gif topic.")
        }
        else if (checkForExistingButton(userInput)) {
            alert("A button for that gif already exists.")
        }
        else {
            topics.push(userInput);
            createGifButton(userInput);
            $("#action-input").val("");
        }
    });

    $("#removeButton").on("click", function () {
        if (topics.length > 10) {
            topics.pop();
            $("#gifButtons").empty();
            for (var i in topics) {
                createGifButton(topics[i]);
            }
        } else {
            alert("Cannot remove default gif topics.")
        }
    });

    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});