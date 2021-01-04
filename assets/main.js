var apiKey = "5fdfd8b8b33408cad71de26acf2b6c9f";

function translate(lyrics) {
  var inputLang = $("#search-lang option:selected").text();
  console.log(inputLang);
  if (inputLang === "Italian") {
    var lang = "it";
  } else if (inputLang === "Spanish") {
    var lang = "es";
  } else if (inputLang === "French") {
    var lang = "fr";
  }
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "google-translate1.p.rapidapi.com",
      "x-rapidapi-key": "3d49dbd209msh5e2bcaf5544db64p181262jsn89c70bd689e7",
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "source": "en",
      "q": lyrics,
      "target": lang,
      "content-encoding": "gzip"
    }
  }

  $.ajax(settings).done(function (response) {
    var transLyrics = response.data.translations[0].translatedText;
    $(".example4").text(transLyrics);
  });
}

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
      textBox.textContent = lyrics;

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

    method = "album.get?";
    q = `album_id=${albumID}`;
    songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;
    $.ajax({
      url: songURL,
      method: "GET"
    }).then(function (response) {
      var imageURL = "https://ih1.redbubble.net/image.1304795334.8057/pp,840x830-pad,1000x1000,f8f8f8.jpg";
      var albumMBID = JSON.parse(response).message.body.album.album_mbid;
      var albumName = JSON.parse(response).message.body.album.album_name;
      songURL = `https://musicbrainz.org/ws/2/release?query=${albumName}&limit=10&fmt=json`;
      $.ajax({
        url: songURL,
        method: "GET"
      }).then(function (response) {
        $.ajax({
          url: `https://musicbrainz.org/ws/2/release/${response.releases[0].id}/front?query=&fmt=json`,
          method: "GET",
        }).then(function (response) {
          var textBox = document.querySelector(".example1");
          textBox.textContent = albumName
        })
      })

      var textBox = document.querySelector(".example2")
      textBox.textContent = artistNames
    })
  })
}

