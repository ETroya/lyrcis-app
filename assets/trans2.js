var lyrics = "Remember those walls I built. Well, baby, they're tumbling down. And they didn't even put up a fight. They didn't even make a sound";

function translate() {
    var inputLang = $("#search-lang option:selected").text();
    console.log(inputLang);
    if (inputLang === "Italian") {
        var lang = "it";
    } else if (inputLang === "Spanish") {
        var lang = "es";
    } else if (inputLang === "French") {
        var lang = "fr";
    }
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "google-translate1.p.rapidapi.com",
            "x-rapidapi-key": "3d49dbd209msh5e2bcaf5544db64p181262jsn89c70bd689e7",
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "source": "en",
            "q": lyrics,
            "target": lang,
            "content-encoding": "gzip"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response.data.translations[0].translatedText);
    });
}


$("#searchBtn").click(translate);