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
      $(".temp").text(tempC);
    }
  });


  // if user clicks on Fahrenheit button and the button was not selected:
  // add 'selected' class to it, remove 'selected' class from Celsius button, display temperature in Fahrenheit
  $(".fahrenheit").on("click", function() {
    if ( !$(this).hasClass("selected") ) {
      convertCelToFah(tempC);
      $(this).addClass("selected");
      $(".celsius").removeClass("selected");
      $(".temp").text(tempF);
    }
  });

  function displayWeatherData(data) {
    var cityName = data.name;
    var currentWeather = data.weather[0].description;
    var weatherIcon = data.weather[0].id;
    var newWeatherIconClass = "wi wi-owm-" + weatherIcon;
    tempC = data.main.temp.toFixed(0);
    var pressure = data.main.pressure;
    var windSpeed = data.wind.speed;
    var humidity = data.main.humidity;

    $(".cityName").text(cityName);
    $(".weatherDescription").text(currentWeather);
    $(".weather i").addClass(newWeatherIconClass);
    $(".temp").text(tempC);
    $(".pressure h4").text(pressure + " hPa");
    $(".wind h4").text(windSpeed + " m/s");
    $(".humidity h4").text(humidity + " %");
  }

  function convertCelToFah(tempC) {
    tempF = (tempC * 1.8 + 32).toFixed(0);
    return tempF;
  }

  const success = pos => {
    const crd = pos.coords;

    // openweather api has been moved to server side
    // and can be used by sending a POST request
    // with an appName, a latitude and a longitude
    fetch('https://whispering-bolt.glitch.me/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appName: 'weather app',
        latitude: crd.latitude,
        longitude: crd.longitude
      })
    })
      .then(res => res.json())
      .then(d => {
        // response is a json containing a message
        // and the data the third-party api sends back
        // { message: 'blah blah', data: {} }
        displayWeatherData(d.data);
      })
      .catch(err => console.error(err));
  };

  const error = err => {
    console.error(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error);
});
