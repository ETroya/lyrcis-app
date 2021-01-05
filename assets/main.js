var apiKey = "9a1da9b45c2f0b030d13d1df98e5b710"

import { lyricsMachine } from "./lyrics_machine.js";

function main() {
  $("#searchBtn").click(function(event) {
    event.preventDefault();
    lyricsMachine();
  });

    method = "track.lyrics.get?";
    q = `track_id=${trackID}`;
    songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

    // Get lyrics.
    $.ajax({
      url: songURL,
      type: "GET"
    }).then(function (response) {
      var lyrics = JSON.parse(response).message.body.lyrics.lyrics_body;
      console.log(lyrics);
      // putting text in HTML
      var textBox = document.querySelector(".example3");
      textBox.textContent = fullLyrics
      var lyrics = fullLyrics.substring(0,300);
      translate(lyrics);
      
    })

    // Get related artists using artist ID. 
    method = "artist.related.get?";
    q = `artist_id=${artistID}`;
    songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;
    $.ajax({
      url: songURL,
      method: "GET"
    }).then(function (response) {
      var artists = JSON.parse(response).message.body.artist_list;
      var artistNames = [];
      for (var i = 0; i < artists.length; i++) {
        artistNames.push(artists[i].artist.artist_name);
      }
      var textBox = document.querySelector(".example2")
      textBox.textContent = artistNames
    })
  }
    
main();
  
