import { getLyrics } from "./components/lyrics.js";
import { getRelated } from "./components/related_artists.js";
import { getAlbumName } from "./components/album.js";

var keyIndex = 0;
var keys = ["5fdfd8b8b33408cad71de26acf2b6c9f", "9a1da9b45c2f0b030d13d1df98e5b710", "ccfe673d50e42db6f9e361f10c95b6b0", "173e0b0b2b2a33199bc17ec868ec326f"]
var apiKey = keys[0];

function lyricsMachine() {
  var songName = $("#search-song").val();
  var artist = $("#search-artist").val();
  var method = "track.search?";
  var q = `q_track=${songName}&q_artist=${artist}`;
  var songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

  $.ajax({
    url: songURL,
    type: "GET"
  }).done(function (response) {
    // Call can return an empty error, check for that. 
    try {
      var trackID = JSON.parse(response).message.body.track_list[0].track.track_id;
      var artistID = JSON.parse(response).message.body.track_list[0].track.artist_id;
      var albumID = JSON.parse(response).message.body.track_list[0].track.album_id;
    }
    catch (error) {
      if (error instanceof TypeError) {
        alert("This song does not exist in our database, please try another :)");
        location.reload();
      }
      else {
        throw error;
      }
    }

    // Get lyrics using trackID, and translate them if translation selected.
    getLyrics(trackID, apiKey);

    // Get related artists using artist ID.
    getRelated(artistID, apiKey);

    // Get album name using albumID.
    getAlbumName(albumID, apiKey);
  }).fail(function (xhr, status, error) {
    // If too many requests error, switch to another API key. 
    console.log(error);
    if (error === "Too Many Requests") {
      if (keyIndex < keys.length - 1) {
        apiKey = keys[++keyIndex];
        console.log("apiKey:", apiKey);
        lyricsMachine();
      }
      else {
        alert("All API keys have exceeded their usage limit :( .")
      }
    }
    else {
      var errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Error - ' + errorMessage);
      location.reload();
    }
  });

}

export { lyricsMachine };