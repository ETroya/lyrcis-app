
function getRelated(artistID, apiKey) {
    var method = "artist.related.get?";
    var q = `artist_id=${artistID}`;
    var songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;
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

export { getRelated };