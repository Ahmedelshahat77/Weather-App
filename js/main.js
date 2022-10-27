let city = document.getElementById("city"),
  weather = document.getElementById("weather"),
  day = document.getElementById("day"),
  month = document.getElementById("month"),
  inputSearch = document.getElementById("inputSearch"),
  todayImg = document.getElementById("todayImg"),
  todayDescription = document.getElementById("description"),
  windHumidity = document.getElementById("windHim"),
  windDiraction = document.getElementById("windDir"),
  windSpeed = document.getElementById("windSpeed"),
  respnseApi,
  responseData,
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  // next two days varibles
  nextDays = document.getElementsByClassName("day"),
  weatherDays = document.getElementsByClassName("weather"),
  monthDays = document.getElementsByClassName("month"),
  nextdayImg = document.getElementsByClassName("nextdayImg"),
  nextdayDescription = document.getElementsByClassName("description"),
  nextwindHumidity = document.getElementsByClassName("windHim"),
  nextwindDiraction = document.getElementsByClassName("windDir"),
  nextwindSpeed = document.getElementsByClassName("windSpeed");

async function getCity(currentCity) {
  respnseApi = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5ce1387ef684461abb5142704221510&q=${currentCity}&days=3`
  );
  responseData = await respnseApi.json();
  console.log(responseData);
  showTodayData();
  showNextdaysData();
}
getCity("cairo");

function showTodayData() {
  let data = new Date();
  city.innerHTML = responseData.location.name;
  day.innerHTML = days[data.getDay()];
  month.innerHTML = `${data.getDate()} ${months[data.getMonth()]}`;
  weather.innerHTML = responseData.current.temp_c;
  todayImg.setAttribute("src", `http:${responseData.current.condition.icon}`);
  todayDescription.innerHTML = responseData.current.condition.text;
  windHumidity.innerHTML = responseData.current.humidity;
  windDiraction.innerHTML = responseData.current.wind_dir;
  windSpeed.innerHTML = responseData.current.wind_kph;
}
function showNextdaysData() {
  for (let i = 0; i < nextDays.length; i++) {
    let newData = new Date(responseData.forecast.forecastday[i + 1].date);
    let newDay = responseData.forecast.forecastday[i + 1].day;
    nextDays[i].innerHTML = days[newData.getDay()];
    monthDays[i].innerHTML = `${newData.getDate()} ${
      months[newData.getMonth()]
    }`;
    weatherDays[i].innerHTML = newDay.maxtemp_c;
    nextdayImg[i].setAttribute("src", `http:${newDay.condition.icon}`);
    nextdayDescription[i].innerHTML = newDay.condition.text;
    nextwindHumidity[i].innerHTML = newDay.avghumidity;
    nextwindSpeed[i].innerHTML = newDay.maxwind_kph;
  }
}

inputSearch.addEventListener("keyup", function () {
  currentCity = inputSearch.value;
  getCity(currentCity);
});
