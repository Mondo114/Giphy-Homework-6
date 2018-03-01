// Giphy API Key: UHNEeOFZZ6PCFV9VqkbEAn8xewWmr1nq

$(document).ready(function () {

    // create array of shows here
    var tvshowArray = ["simpsons", "firefly", "futurama", "arrested development", "broad city"];


    $(document).on("click", "button", function (event) {
        event.preventDefault();
        var tvshow = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            tvshow + "&api_key=UHNEeOFZZ6PCFV9VqkbEAn8xewWmr1nq&limit=12";

        $.ajax({
            url: queryURL,
            method: "get"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var tvshowDiv = $("<div>").addClass("col-sm-3");
                var p = $("<p>");
                p.text(results[i].rating);
                var tvshowImage = $("<img>");
                tvshowImage.addClass("pause");
                tvshowImage.attr({
                    "src": results[i].images.fixed_height.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "animate"
                });
                tvshowDiv.prepend(p, tvshowImage);
                $("#gifs-appear-here").prepend(tvshowDiv);
            }

        });

    });


    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-container").empty();

        // Looping through the array of movies
        for (var i = 0; i < tvshowArray.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("movie-btn");
            // Adding a data-attribute
            a.attr("data-name", tvshowArray[i]);
            // Providing the initial button text
            a.text(tvshowArray[i]);
            // Adding the button to the buttons-view div
            $("#button-container").append(a);
        }
    }


    $("#add-tvshow").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newShow = $("#tv-input").val().trim();

        // Adding movie from the textbox to our array
        tvshowArray.push(newShow);
        console.log(tvshowArray);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    $(document).on("click", ".pause", function () {
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");
        var state = $(this).attr("data-state");

        if (state === "still") {
            // make it animate
            $(this).attr({
                "src": animate,
                "data-state": "animate"
            })
        }
        if (state === "animate") {
            // make it still
            $(this).attr({
                "src": still,
                "data-state": "still"
            })
        }
    });


    // Calling the renderButtons function to display the intial buttons
    renderButtons();






});