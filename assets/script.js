//Get the API key
// Syrus's API key: ccfe673d50e42db6f9e361f10c95b6b0
var apiKey = "ccfe673d50e42db6f9e361f10c95b6b0";
var q = "track.lyrics.get?track_id=15953433"
var url = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${q}&apikey=${apiKey}`;


$.ajax({
    url:url,
    type: "GET"
}).then(function(response){
    console.log(response);
})