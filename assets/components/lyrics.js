import { translate } from "./translate.js";


function getLyrics(trackID, apiKey) {
    var method = "track.lyrics.get?";
    var q = `track_id=${trackID}`;
    var songURL = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/${method}&${q}&apikey=${apiKey}`;

    // Get lyrics and translate them.
    $.ajax({
        url: songURL,
        type: "GET"
    }).then(function (response) {
        var lyrics = JSON.parse(response).message.body.lyrics.lyrics_body;
        // console.log("Lyrics", lyrics);
        // putting text in HTML
        var textBox = document.querySelector(".example3");
        textBox.textContent = lyrics;

        translate(lyrics);

    })
}

export { getLyrics };