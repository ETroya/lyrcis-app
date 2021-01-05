import { lyricsMachine } from "./lyrics_machine.js";

function main() {
  $("#searchBtn").click(function(event) {
    event.preventDefault();
    lyricsMachine();
  });

}

main();


