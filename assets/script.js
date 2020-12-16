//Get the User Input
var searchTerms; //The value entered into the search box.
var trackID; //The ID created in the getTrack function for use in the returnLyrics function. 
var resultsSection = document.getElementById("results"); //the html div used to display the results of each ajax call
var backButton = document.getElementById("back-button-container"); //container for button for the user to navigate between results pages

//Get the API key
// Syrus's API key: ccfe673d50e42db6f9e361f10c95b6b0
var apiKey = "ccfe673d50e42db6f9e361f10c95b6b0"
var url = `https://api.musixmatch.com/ws/1.1/?apikey=${apiKey}`;
$.ajax({
    url: url,
    type: "GET"
}).then(function(response) {
    console.log(response);
})


//Get the API responsive through console log


