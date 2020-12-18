
var apiKey = "5fdfd8b8b33408cad71de26acf2b6c9f";

// Gets track ID for song + artist inputted by user and uses that 
// ID to find lyrics.
$("#search").on("click", function(event) {
	event.preventDefault();
	var songName = $("#search-song").val();
	var artist = $("#search-artist").val();
	var method = "track.search?";
	var q = `q_track=${songName}&q_artist=${artist}`;
	var songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

	$.ajax({
		url: songURL, 
		type: "GET"
	}).then(function(response) {
		var trackID = JSON.parse(response).message.body.track_list[0].track.track_id;
		method = "track.lyrics.get?";
		q = `track_id=${trackID}`;
		songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

		$.ajax({
			url: songURL,
			type: "GET"
		}).then(function(response) {
			console.log(JSON.parse(response).message.body.lyrics.lyrics_body);
		})
	})
})