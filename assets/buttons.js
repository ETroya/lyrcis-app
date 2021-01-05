// When you click on one of these buttons the information will pop out. Album Cover, Related Artist, Lyrics, and Langauage Translator.

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
    
    if (!(pageName === undefined)) {
      document.getElementById(pageName).style.display = "block";
      elmnt.style.backgroundColor = color;
    }
  }
  
  // Hides everything when yoou click the tabs
  
  openPage();
