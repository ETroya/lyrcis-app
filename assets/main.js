var apiKey = "5fdfd8b8b33408cad71de26acf2b6c9f";

function translate(lyrics) {
  var de = "ankushchalla@gmail.com"
  var inputLang = $("#search-lang option:selected").text();
  if (inputLang === "Italian") {
    var lang = "it";
  }
  else if (inputLang === "Spanish") {
    var lang = "es";
  }
  else if (inputLang === "French") {
    var lang = "fr";
  }
  else {
    return;
  }
  var url = `https://api.mymemory.translated.net/get?q=${lyrics}&langpair=en|${lang}&de=${de}`
  $.ajax({
    url: url, 
    method: "GET"
  }).then(function(response) {
    var translation = response.responseData.translatedText;
    console.log("Translation:", translation);
  })
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
    })
  })
}

function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}
document.getElementById("defaultOpen").click();

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  getLyrics();
});