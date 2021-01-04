function translate(lyrics) {
    var de = "ankushchalla@gmail.com"
    var inputLang = $("#search-lang option:selected").text();
    if (inputLang === "Italian") {
      var lang = "it";
    }
    else if (inputLang === "Spanish") {
      var lang = "es";
    }
    else if (inputLang === "French") {
      var lang = "fr";
    }
    else {
      return;
    }
    var url = `https://api.mymemory.translated.net/get?q=${lyrics}&langpair=en|${lang}&de=${de}`
    $.ajax({
      url: url, 
      method: "GET"
    }).then(function(response) {
      var translation = response.responseData.translatedText;
      console.log("Translation:", translation);
      //putting HTML Text box
      var textBox = document.querySelector(".example4");
      textBox.textContent = translation
    })
  }