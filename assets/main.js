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
	  console.log(JSON.parse(response).message.body.track_list[0].track.album_id);
	  
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
        artistNames.push(artists[i].artist.artist_name);
      }
      console.log("Related artists:", artistNames);
      var textBox = document.querySelector(".example2")
      textBox.textContent=artistNames
	})

	method = "album.get?";
    q = `album_id=${albumID}`;
    songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;
	$.ajax({
		url: songURL,
		method: "GET"
	}).then(function(response){
		console.log("musixMatch",JSON.parse(response))
		var imageURL = "https://ih1.redbubble.net/image.1304795334.8057/pp,840x830-pad,1000x1000,f8f8f8.jpg";
		var albumMBID= JSON.parse(response).message.body.album.album_mbid;
		var albumName = JSON.parse(response).message.body.album.album_name;
    console.log(albumName)
		songURL = `https://musicbrainz.org/ws/2/release?query=${albumName}&limit=10&fmt=json`;
		$.ajax({
			url: songURL,
			method: "GET",
			// headers: {
			// 	Accept: "application/json"
			// }
		}).then(function(response){
      console.log("MARK")
      $.ajax({
        url: `https://musicbrainz.org/ws/2/release/${response.releases[0].id}/front?query=&fmt=json`,
        method: "GET",
      }).then(function(response){     
        console.log("ALBUM",response)
        console.log(albumName)
        var textBox= document.querySelector(".example1");
        textBox.textContent =albumName
      })


			console.log("musicBrainz",response)
			// console.log(`https://coverartarchive.org/release/4e304316-386d-3409-af2e-78857eec5cfe.jpg`);
			console.log(`https://coverartarchive.org/release/${response.releases[0].status-id}.jpg`);
    })
    
		console.log(albumMBID)
		// var mbidURL = "https://coverartarchive.org/release/" + albumMBID;

		// document.querySelector("#Bio")
		// If there is an mbid, then change the image URL
      
    })
  })
}

