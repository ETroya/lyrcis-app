var apiKey = "5fdfd8b8b33408cad71de26acf2b6c9f";

// Gets track ID for song + artist inputted by user and uses that 
// ID to find lyrics.
function getLyrics() {
  var songName = $("#search-song").val();
  var artist = $("#search-artist").val();
  var method = "track.search?";
  var q = `q_track=${songName}&q_artist=${artist}`;
  var songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

  $.ajax({
    url: songURL,
    type: "GET"
  }).then(function (response) {
    // Call can return an empty error, check for that. 
    try {
      var trackID = JSON.parse(response).message.body.track_list[0].track.track_id;
      var artistID = JSON.parse(response).message.body.track_list[0].track.artist_id;
      var albumID =JSON.parse(response).message.body.track_list[0].track.album.id;
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

    method = "track.lyrics.get?";
    q = `track_id=${trackID}`;
    songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

    $.ajax({
      url: songURL,
      type: "GET"
    }).then(function (response) {
      var fullLyrics = JSON.parse(response).message.body.lyrics.lyrics_body;
      // putting text in HTML
      var textBox = document.querySelector(".example3");
      textBox.textContent = fullLyrics
      console.log("Lyrics:", fullLyrics);
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
    }).then(function(response) {
      var artists = JSON.parse(response).message.body.artist_list;
      var artistNames = [];
      for (var i = 0; i < artists.length; i++) {
        artistNames[i] = artists[i].artist.artist_name;
      }
      console.log("Related artists:", artistNames);
      //putting text in HTML  line 91
      var textBox =document.querySelector(".example2")
      textBox.textContent= artistNames
    })
  })
}
