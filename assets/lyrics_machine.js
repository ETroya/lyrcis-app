import { getLyrics} from "./components/lyrics.js";
import { getRelated } from "./components/related_artists.js";
import { getAlbumName } from "./components/album.js";

var apiKey = "9a1da9b45c2f0b030d13d1df98e5b710";

function lyricsMachine() {
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

      // Get lyrics using trackID, and translate them if translation selected.
      getLyrics(trackID, apiKey);
    
      // Get related artists using artist ID.
      getRelated(artistID, apiKey); 
      
      // Get album name using albumID.
      getAlbumName(albumID, apiKey);
    })
  }

export { lyricsMachine };