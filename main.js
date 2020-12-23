
var apiKey = "ccfe673d50e42db6f9e361f10c95b6b0";

// Gets track ID for song + artist inputted by user and uses that 
// ID to find lyrics.
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
		// Call can return an empty error, check for that. 
		try {
			var trackID = JSON.parse(response).message.body.track_list[0].track.track_id;
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
			console.log(JSON.parse(response).message.body.lyrics.lyrics_body);
		})
		// console.log(track.artist_id);
		// method = "album.get?"
		// q= `album_id=${track.album_id}`
		// songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;
		// $.ajax({
		// 	url: songURL,
		// 	type: "GET"
		// }).then(function (response) {
			
		// 	console.log(JSON.parse((response)).message.body.album)
		// 	var mbid = (JSON.parse((response)).message.body.album.album_mbid)
		// 	console.log(mbid);
		// })
		
		// songURL = `https://musicbrainz.org/ws/2/area/45f07934-675a-46d6-a577-6f8637a411b1?inc=aliases`;
		// $.ajax({
		// 	url: songURL,
		// 	type: "GET"
		// }).then(function (response) {
			
		// 	// console.log(JSON.parse(response))
		// 	console.log(response);
		// })
		function openPage(pageName,elmnt,color) {
			var i, tabcontent, tablinks;
			tabcontent = document.getElementsByClassName("#tabcontent");
			for (i = 0; i < tabcontent.length; i++) {
			  tabcontent[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("#tablink");
			for (i = 0; i < tablinks.length; i++) {
			  tablinks[i].style.backgroundColor = "";
			}
			document.getElementById(pageName).style.display = "#block";
			elmnt.style.backgroundColor = color;
		  }
		  document.getElementById(".defaultOpen").click();
	})
});
