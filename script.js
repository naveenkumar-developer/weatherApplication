// THE DEFAULT CITY NAME
let targetCity = "chennai";

// ACCESS ALL NECESSARY ELEMENTS IN DOCUMENT

let city = document.querySelector("#city");
let dayArea = document.querySelector("#day");
let dateArea = document.querySelector("#date");
let monthArea = document.querySelector("#month");
let timeArea = document.querySelector("#time");
let Temperature = document.querySelector("#Temperature");
let weather_icon = document.querySelector("#weather_icon");
let humidityText = document.querySelector("#humidityArea p");
let wind_kph = document.querySelector("#wind_kph p");
let weatherStatusText = document.querySelector("#weatherStatus p");

const fetchData = async (cityName) => {
  try{

    let url = `http://api.weatherapi.com/v1/current.json?key=560dcd07d1a54ea2a0b162605241910&q=${cityName}&aqi=no`;
    let res = await fetch(url);
    let data = await res.json();
    let locationName = data.location.name;
    let time = data.location.localtime;
    let humidity = data.current.humidity;
    let windspeed = data.current.wind_kph;
    let temp = data.current.temp_c;
    let icon = data.current.condition.icon;
    let weatherStatus = data.current.condition.text;
    showData(locationName, time, humidity, windspeed, temp, icon, weatherStatus);
  }
  catch{
    alert('Enter correct city name')
  }
};

// DISPLAY ALL DATA ONTO SCREEN

function showData(
  locationName,
  time,
  humidity,
  windspeed,
  temp,
  icon,
  weatherStatus
) {
  let dateStr = time.split(" ")[0];
  let timeStr = time.split(" ")[1];

  let currentDay = setCurrentDay(new Date(dateStr).getDay());

  let currentMonth = setCurrentMonth(new Date("2024-10-20").getMonth());

  let currentDate = new Date(dateStr).getDate();

  function setCurrentDay(dayProp) {
    switch (dayProp) {
      case 0:
        return "sunday";
      case 1:
        return "monday";
      case 2:
        return "tuesday";
      case 3:
        return "wednesday";
      case 4:
        return "thursday";
      case 5:
        return "friday";
      case 6:
        return "saturday";
    }
  }
  function setCurrentMonth(monthProp) {
    switch (monthProp) {
      case 0:
        return "JAN";
      case 1:
        return "FEB";
      case 2:
        return "MAR";
      case 3:
        return "APR";
      case 4:
        return "MAY";
      case 5:
        return "JUN";
      case 6:
        return "JULY";
      case 7:
        return "AUG";
      case 8:
        return "SEP";
      case 9:
        return "OCT";
      case 10:
        return "NOV";
      case 11:
        return "DEC";
    }
  }

  city.innerText = locationName;
  dayArea.innerText = currentDay;
  dateArea.innerText = currentDate;
  monthArea.innerText = currentMonth;
  timeArea.innerText = timeStr;
  humidityText.innerText = `${humidity} %`;
  wind_kph.innerText = `${windspeed} kph`;
  Temperature.innerText = `${temp}°C`;
  weather_icon.src = icon;
  weatherStatusText.innerText = weatherStatus;
}

let cityName = document.getElementById("citySearch");
let citySearchBtn = document.querySelector("#citySearchBtn");
citySearchBtn.addEventListener("click", sendCityName);

//SEND THE CITY NAME TO THE API

function sendCityName() {
  let targetCity = cityName.value.trim();
  console.log(targetCity);
  if (targetCity == "") {
    alert("enter the city name");
  } else {
    fetchData(targetCity);
  }
  cityName.value = "";
}

fetchData(targetCity);
