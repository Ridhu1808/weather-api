const fetchWeather = () => {
  var city = document.getElementById("search").value;
  console.log(city);
  navigator.geolocation.getCurrentPosition(async (location) => {
    var response;
    try {
      if (city === "") {
        response = await fetch(
          "https://api.weatherapi.com/v1/forecast.json?key=55abcd02053e4c45804112932231402&q=" +
          location.coords.latitude +
          "," +
          location.coords.longitude +
          "&aqi=no&days=7"
        );
      } else {
        response = await fetch(
          "https://api.weatherapi.com/v1/forecast.json?key=55abcd02053e4c45804112932231402&q=" +
          city +
          "&aqi=no&days=7"
        );
      }
      let data = await response.json();
      console.log(data);

      //   console.log(d);
      //   console.log(day);
      //   document.getElementsById("day").innerHTML=day;
      document.getElementById("name").innerHTML = data.location.name;
      document.getElementById("region").innerHTML = data.location.region;
      document.getElementById("tz_id").innerHTML = data.location.tz_id;
      const icon1 = data.current.condition.icon;
      document.querySelector(".icon1").src = "https:" + icon1;

      document.getElementById("sunriseimg").src="sunrise.svg";
      document.getElementById("sunsetimg").src="sunset.svg";
      document.getElementById("sunrise").innerHTML="Sunrise " + data.forecast.forecastday[0].astro.sunrise;
      document.getElementById("sunset").innerHTML="Sunrise " + data.forecast.forecastday[0].astro.sunset;
      document.getElementById("moonriseimg").src="moonrise.svg";
      document.getElementById("moonsetimg").src="moonset.svg";
      document.getElementById("moonrise").innerHTML="Moonrise " +data.forecast.forecastday[0].astro.moonrise;
      document.getElementById("moonset").innerHTML="Moonset " +data.forecast.forecastday[0].astro.moonset;
      document.getElementById("humidityimg").src="humidity.svg";
      document.getElementById("windimg").src="wind.svg";
      document.getElementById("text").innerHTML = data.current.condition.text;
      document.getElementById("temp").innerHTML =
        " " + data.current.temp_c + "°C /" + data.current.temp_f + "°F";
      document.getElementById("humidity").innerHTML =
        "Humidity " + data.current.humidity + "%";
      document.getElementById("wind").innerHTML =
        " Wind " + data.current.wind_kph + "km/h";
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" +
        data.current.condition.text+
        "')";
      // const icon2 = data.forecast.forecastday[1].day.condition.icon;
      // document.querySelector(".icon2").src = "https:" + icon2;
      // document.getElementById("date1").innerHTML =
      //     data.forecast.forecastday[1].date;

      // const d1 = new Date(data.forecast.forecastday[1].date);
      // document.getElementById("date1").innerHTML = d1.getDate() + "_";
      // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // const dz = new Date(data.forecast.forecastday[1].date);
      // let month = months[dz.getMonth()];
      // document.getElementById("mon").innerHTML = month;

      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let daily_weather = "";
      data.forecast.forecastday.map(weather => {
        const d = weather.date;
        let date = new Date(d);
        let day = weekday[date.getDay()];
        // let text = weather.day.text;
        console.log(day);
        daily_weather = daily_weather + `
        <div class="col" style="font-size:15px" >
          <div class="d-flex">
            <p id="date1" style="padding-left:15px">${date.toString().slice(8,10)}</p><p id="date1" style="padding-left:5px">${date.toString().slice(0,4)}</p>
            <p id="mon"></p>
          </div>
            <p id="day1"></p>
            <img class="icon2" src="https:${weather.day.condition.icon}"/>
            <p id="day1tempc" style="padding-left:15px">${weather.day.avgtemp_c}°C</p>
            <p id="day1tempf" style="padding-left:10px"></p>
        </div> 
  `
      })
      console.log(daily_weather);
      document.getElementById("daily-weather").innerHTML = daily_weather;

      
      // document.getElementById("day6").innerHTML =
      //   data.forecast.forecastday[6].date;
      // const icon7 = data.forecast.forecastday[6].day.condition.icon;
      // document.querySelector(".icon7").src = "https:" + icon7;
      // document.getElementById("day6tempc").innerHTML =
      //   data.forecast.forecastday[6].day.avgtemp_c + "°C";
      // document.getElementById("day6tempf").innerHTML =
      //   data.forecast.forecastday[6].day.avgtemp_f + "°F";
        document.getElementById("mark").style.display="block";
    } catch (error) {
      alert("Invalid Location");
    }
  });
}
document.querySelector(".search button").addEventListener("click", function () {
  fetchWeather();
});
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    fetchWeather();
  }
});