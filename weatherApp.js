$("document").ready(function() {
	var API_KEY = '';
	var weatherData;
	var tempC;
	var tempF;


	// if user clicks on Celsius button and the button was not selected:
	// add 'selected' class to it, remove 'selected' class from Fahrenheit button, display temperature in Celsius
	$(".celsius").on("click", function() {
		if ( !$(this).hasClass("selected") ) {
			$(this).addClass("selected");
			$(".fahrenheit").removeClass("selected");
			$(".temp").text(tempC + "º");
		}
	});


	// if user clicks on Fahrenheit button and the button was not selected:
	// add 'selected' class to it, remove 'selected' class from Celsius button, display temperature in Fahrenheit
	$(".fahrenheit").on("click", function() {
		if ( !$(this).hasClass("selected") ) {
			convertCelToFah(tempC);
			$(this).addClass("selected");
			$(".celsius").removeClass("selected");
			$(".temp").text(tempF + "º");
		}
	});

	function displayWeatherData(data) {
		var currentWeather = weatherData.weather[0].description;
		var weatherIcon = weatherData.weather[0].id;
		var newWeatherIconClass = "wi wi-owm-" + weatherIcon;
		tempC = weatherData.main.temp.toFixed(0);
		var pressure = weatherData.main.pressure;
		var windSpeed = weatherData.wind.speed;
		var humidity = weatherData.main.humidity;


		$(".weatherDescription").text(currentWeather);
		$(".weather i").addClass(newWeatherIconClass);
		$(".temp").text(tempC + "º");
		$(".pressure h4").text(pressure + " hPa");
		$(".wind h4").text(windSpeed + " m/s");
		$(".humidity h4").text(humidity + " %");
	}

	function saveWeatherData(data) {
		weatherData = data;
		displayWeatherData(weatherData);
		console.log(data);
	}

	function convertCelToFah(tempC) {
		tempF = (tempC * 1.8 + 32).toFixed(0);
		return tempF;
	}

	// in case the browser doesn't allow http, use the link below
	// https://cors-anywhere.herokuapp.com/http://ip-api.com/json
	$.getJSON("http://ip-api.com/json", function(locationAPI) {
		var currentLocation = locationAPI.city;
		$(".cityName").text(currentLocation);

		$.getJSON('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + locationAPI.lat + '&lon=' + locationAPI.lon + '&units=metric' + '&type=accurate' + '&APPID=' + API_KEY, function(weatherAPI) {
			saveWeatherData(weatherAPI);
		});

	});
});