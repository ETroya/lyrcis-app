
var apiKey = "ccfe673d50e42db6f9e361f10c95b6b0";

$("#search").on("click", function (event) {
	event.preventDefault();
	var songName = $("#search-song").val();
	var artist = $("#search-artist").val();
	var method = "track.search?";
	var q = `q_track=${songName}&q_artist=${artist}`;
	var songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

	$.ajax({
		url: songURL,
		type: "GET"
	}).then(function (response) {
		// console.log(JSON.parse(response).message.body.track_list[0]);
		// var trackID = JSON.parse(response).message.body.track_list[0].track.track_id;
		var track = JSON.parse(response).message.body.track_list[0].track;
		console.log(JSON.parse(response).message.body.track_list);
		console.log(track)
		method = "track.lyrics.get?";
		// q = `track_id=${trackID}`;
		q = `track_id=${track.track_id}`;
		songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

		$.ajax({
			url: songURL,
			type: "GET"
		}).then(function (response) {
			var message = (JSON.parse(response).message.body.lyrics.lyrics_body);
			var printer = document.getElementById('lyrics');
			console.log(message)
			printer.textContent = message
		})
		console.log(track.artist_id);
		method = "album.get?"
		q= `album_id=${track.album_id}`
		songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;
		$.ajax({
			url: songURL,
			type: "GET"
		}).then(function (response) {
			
			console.log(JSON.parse((response)).message.body.album)
			var mbid = (JSON.parse((response)).message.body.album.album_mbid)
			console.log(mbid);
		})
		
		// songURL = `https://musicbrainz.org/ws/2/area/45f07934-675a-46d6-a577-6f8637a411b1?inc=aliases`;
		// $.ajax({
		// 	url: songURL,
		// 	type: "GET"
		// }).then(function (response) {
			
		// 	// console.log(JSON.parse(response))
		// 	console.log(response);
		// })
		
	})
})
