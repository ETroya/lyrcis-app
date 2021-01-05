
function getAlbumName(albumID, apiKey) {
    var method = "album.get?";
    var q = `album_id=${albumID}`;
    var songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;
    $.ajax({
        url: songURL,
        method: "GET"
    }).then(function (response) {
        var albumName = JSON.parse(response).message.body.album.album_name;
        console.log("album name", albumName);
        var textBox = document.querySelector(".example1");
        textBox.textContent = albumName;
        
    });
}

export { getAlbumName };