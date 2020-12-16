const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://piratespeak.p.rapidapi.com/pirate.json?text=Hello%20sir!%20my%20mother%20goes%20with%20me%20to%20the%20ocean.",
	"method": "POST",
	"headers": {
		"x-rapidapi-key": "SIGN-UP-FOR-KEY",
		"x-rapidapi-host": "piratespeak.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});