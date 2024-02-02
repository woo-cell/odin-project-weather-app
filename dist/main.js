/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
let cityName = "";
let units = "";

// weather API key
const KEY = "8d3ddf6f7bb003167b9c01b888993ef4";

// retrieve search elements
const input = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const switchUnits = document.getElementById("units");

// search button event handler
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    cityName = input.value;
    units = switchUnits.value;
    getForecastData(cityName, KEY, units);
  } else {
    getForecastData("osaka", KEY, "metric");
  }
});

// default: osaka - metric
getForecastData("osaka", KEY, "metric");

// fetch city data
async function geoCodeCity(name, key) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${key}`,
      { mode: "cors" },
    );
    const cityData = await response.json();
    return cityData;
  } catch (error) {
    console.log(error);
  }
}

// fetch forecast data
async function getForecastData(name, key, units) {
  const cityData = await geoCodeCity(name, key);

  // to get the country name
  try {
    const countryResponse = await fetch(
      `https://restcountries.com/v3.1/name/${cityData[0].country}`,
      { mode: "cors" },
    );
    const countryData = await countryResponse.json();
    populateCountry(countryData, cityData);
  } catch (error) {
    console.log(error);
  }

  // to get the forecast
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=${key}&units=${units}&cnt=40`,
      { mode: "cors" },
    );
    const forecastData = await response.json();
    populateUI(forecastData, units);
  } catch (error) {
    console.log(error);
  }
}

// UI
function populateTemperatureNow(obj, units) {
  const temp = document.querySelector(".temp");
  const feels = document.querySelector(".feels-like");

  temp.textContent = `${obj.list[0].main.temp} ${
    units === "metric" ? "°C" : "°F"
  }`;

  feels.textContent = `feels like ${obj.list[0].main.feels_like} ${
    units === "metric" ? "°C" : "°F"
  }`;
}

function populateInfoNow(obj, units) {
  const desc = document.querySelector(".desc");
  const img = document.querySelector(".info-now > img");
  const date = document.querySelector(".date");

  desc.textContent = `${obj.list[0].weather[0].description}`;

  img.src = `https://openweathermap.org/img/wn/${obj.list[0].weather[0].icon}@2x.png`;

  img.alt = `${obj.list[0].weather[0].description}`;

  const currentTime = getCurrentTimeOfCity(obj);
  const day =
    currentTime.getDate() < 10
      ? `0${currentTime.getDate()}`
      : currentTime.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentTime.getMonth()];
  const hour =
    currentTime.getHours() < 10
      ? `0${currentTime.getHours()}`
      : currentTime.getHours();
  const minute =
    currentTime.getMinutes() < 10
      ? `0${currentTime.getMinutes()}`
      : currentTime.getMinutes();
  date.textContent = `${day} ${month} ${currentTime.getFullYear()}, ${hour}:${minute}`;
}

function getCurrentTimeOfCity(obj) {
  // create Date object for current location
  const currentDate = new Date();

  // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;

  // utc offset of the city
  const { timezone } = obj.city;
  const offsetCity = timezone * 1000;

  // create new Date object for a different timezone using supplied its GMT offset.
  const currentDateAndTimeInCity = new Date(utcTime + offsetCity);
  return currentDateAndTimeInCity;
}

function getForecastDates(obj) {
  // create Date object for current location
  const currentDate = new Date();

  // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;

  // utc offset of the city
  const { timezone } = obj.city;
  const offsetCity = timezone * 1000;

  // current date +1 day (86400000 milliseconds)
  const dPlusOne = new Date(utcTime + offsetCity + 86400000);

  // current date +2 days (172800000 milliseconds)
  const dPlusTwo = new Date(utcTime + offsetCity + 172800000);

  // current date +3 days (259200000 milliseconds)
  const dPlusThree = new Date(utcTime + offsetCity + 259200000);

  return { dPlusOne, dPlusTwo, dPlusThree };
  // return currentDateAndTimeInCity;
}

function getSunrise(obj) {
  // city sunrise
  const { sunrise } = obj.city;

  // utc offset of current location
  const offsetCurrent = new Date().getTimezoneOffset() * 60000;

  // utc offset of the city
  const { timezone } = obj.city;
  const offsetCity = timezone * 1000;

  // total offset from current location
  const totalOffset = offsetCity + offsetCurrent;

  // sunrise date, relative to the city time
  const sunriseDate = new Date(sunrise * 1000 + totalOffset);
  return sunriseDate;
}

function getSunset(obj) {
  // city sunrise
  const { sunset } = obj.city;

  // utc offset of current location
  const offsetCurrent = new Date().getTimezoneOffset() * 60000;

  // utc offset of the city
  const { timezone } = obj.city;
  const offsetCity = timezone * 1000;

  // total offset from current location
  const totalOffset = offsetCity + offsetCurrent;

  // sunrise date, relative to the city time
  const sunsetDate = new Date(sunset * 1000 + totalOffset);
  return sunsetDate;
}

function getThreeDaysForecastData(obj) {
  // return only the data of the 3 next days

  // first element is the interval (3 hours) now, second element is the index to remove
  const mapElementsToRemove = [
    ["00", 7],
    ["03", 6],
    ["06", 5],
    ["09", 4],
    ["12", 3],
    ["15", 2],
    ["18", 1],
    ["21", 0],
  ];
  const intervalNow = obj.list[0].dt_txt;
  const intervalNowString = intervalNow[11] + intervalNow[12];

  const numberOfElement = mapElementsToRemove.filter(
    (elem) => elem[0] === intervalNowString,
  );

  const indexToRemove = numberOfElement[0][1];

  const newArray = obj.list.filter((element, index) => index > indexToRemove);

  // day+1 day+2 day+3 datas
  const dayPlusOneForecast = newArray.filter((element, index) => index <= 7);
  const dayPlusTwoForecast = newArray.filter(
    (element, index) => index >= 8 && index <= 15,
  );
  const dayPlusThreeForecast = newArray.filter(
    (element, index) => index >= 16 && index <= 23,
  );

  return { dayPlusOneForecast, dayPlusTwoForecast, dayPlusThreeForecast };
}

function meanTemp(obj) {
  // sort the array by temp and mean the first and last temperature
  const sortedArray = obj.sort((a, b) => a.main.temp - b.main.temp);
  const meanTemperature =
    (sortedArray[0].main.temp + sortedArray[7].main.temp) / 2;

  return meanTemperature.toFixed(2);
}

function getDescription(obj) {
  // find and return the most occuring weather description in a day
  const descriptions = obj.map((element) => element.weather[0].description);

  const descriptionCounts = {};
  descriptions.forEach((description) => {
    if (descriptionCounts[description]) {
      descriptionCounts[description]++;
    } else {
      descriptionCounts[description] = 1;
    }
  });

  const descriptionCountsArray = Object.entries(descriptionCounts);
  descriptionCountsArray.sort((a, b) => b[1] - a[1]);
  return descriptionCountsArray[0][0];
}

function getWeatherImage(description, obj) {
  // find an element of the array with the same description and return the icon
  const arr = obj.find(
    (element) => element.weather[0].description === description,
  );
  const url = `https://openweathermap.org/img/wn/${arr.weather[0].icon}@2x.png`;
  return url;
}

function populateOtherInfos(obj, units) {
  const pressure = document.querySelector(".pressure");
  const humidity = document.querySelector(".humidity");
  const cloudiness = document.querySelector(".cloudiness");
  const wind = document.querySelector(".wind");
  const sunrise = document.querySelector(".sunrise");
  const sunset = document.querySelector(".sunset");

  pressure.textContent = `pressure: ${obj.list[0].main.pressure} hPa`;
  humidity.textContent = `humidity: ${obj.list[0].main.humidity} %`;
  cloudiness.textContent = `cloudiness: ${obj.list[0].clouds.all} %`;
  wind.textContent = `wind speed: ${obj.list[0].wind.speed} ${
    units === "metric" ? "meter/s" : "miles/h"
  }`;

  // retrieve sunrise and sunset date and only use hours and minutes
  const sunriseDate = getSunrise(obj);
  const sunriseHours =
    sunriseDate.getHours() < 10
      ? `0${sunriseDate.getHours()}`
      : sunriseDate.getHours();
  const sunriseMinutes =
    sunriseDate.getMinutes() < 10
      ? `0${sunriseDate.getMinutes()}`
      : sunriseDate.getMinutes();
  sunrise.textContent = `sunrise: ${sunriseHours}:${sunriseMinutes}`;

  const sunsetDate = getSunset(obj);
  const sunsetHours =
    sunsetDate.getHours() < 10
      ? `0${sunsetDate.getHours()}`
      : sunsetDate.getHours();
  const sunsetMinutes =
    sunsetDate.getMinutes() < 10
      ? `0${sunsetDate.getMinutes()}`
      : sunsetDate.getMinutes();
  sunset.textContent = `sunset: ${sunsetHours}:${sunsetMinutes}`;
}

function populateForecast(obj, units) {
  const datePlusOne = document.querySelector(".date-d-one");
  const tempPlusOne = document.querySelector(".temp-d-one");
  const descPlusOne = document.querySelector(".desc-d-one");
  const imgPlusOne = document.querySelector(".img-d-one");
  const datePlusTwo = document.querySelector(".date-d-two");
  const tempPlusTwo = document.querySelector(".temp-d-two");
  const descPlusTwo = document.querySelector(".desc-d-two");
  const imgPlusTwo = document.querySelector(".img-d-two");
  const datePlusThree = document.querySelector(".date-d-three");
  const tempPlusThree = document.querySelector(".temp-d-three");
  const descPlusThree = document.querySelector(".desc-d-three");
  const imgPlusThree = document.querySelector(".img-d-three");

  // list of months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // get date+1, date+2, date+3 objects then populate forecast dates with those
  const forecastDates = getForecastDates(obj);
  const dayOfDayPlusOne =
    forecastDates.dPlusOne.getDate() < 10
      ? `0${forecastDates.dPlusOne.getDate()}`
      : forecastDates.dPlusOne.getDate();
  const monthOfDayPlusOne = months[forecastDates.dPlusOne.getMonth()];
  const yearOfDayPlusOne = forecastDates.dPlusOne.getFullYear();

  const dayOfDayPlusTwo =
    forecastDates.dPlusTwo.getDate() < 10
      ? `0${forecastDates.dPlusTwo.getDate()}`
      : forecastDates.dPlusTwo.getDate();
  const monthOfDayPlusTwo = months[forecastDates.dPlusTwo.getMonth()];
  const yearOfDayPlusTwo = forecastDates.dPlusTwo.getFullYear();

  const dayOfDayPlusThree =
    forecastDates.dPlusThree.getDate() < 10
      ? `0${forecastDates.dPlusThree.getDate()}`
      : forecastDates.dPlusThree.getDate();
  const monthOfDayPlusThree = months[forecastDates.dPlusThree.getMonth()];
  const yearOfDayPlusThree = forecastDates.dPlusThree.getFullYear();

  datePlusOne.textContent = `${dayOfDayPlusOne} ${monthOfDayPlusOne} ${yearOfDayPlusOne}`;
  datePlusTwo.textContent = `${dayOfDayPlusTwo} ${monthOfDayPlusTwo} ${yearOfDayPlusTwo}`;
  datePlusThree.textContent = `${dayOfDayPlusThree} ${monthOfDayPlusThree} ${yearOfDayPlusThree}`;

  // mean the min and max temp of the days populate temp+1, temp+2, temp+3
  const threeDaysForecastData = getThreeDaysForecastData(obj);
  const meanTempDayPlusOne = meanTemp(threeDaysForecastData.dayPlusOneForecast);
  const meanTempDayPlusTwo = meanTemp(threeDaysForecastData.dayPlusTwoForecast);
  const meanTempDayPlusThree = meanTemp(
    threeDaysForecastData.dayPlusThreeForecast,
  );
  tempPlusOne.textContent = `${meanTempDayPlusOne} ${
    units === "metric" ? "°C" : "°F"
  }`;
  tempPlusTwo.textContent = `${meanTempDayPlusTwo} ${
    units === "metric" ? "°C" : "°F"
  }`;
  tempPlusThree.textContent = `${meanTempDayPlusThree} ${
    units === "metric" ? "°C" : "°F"
  }`;

  // find the most occuring description in a day and populate desc+1, desc+2, desc+3 accordingly
  const descriptionDayPlusOne = getDescription(
    threeDaysForecastData.dayPlusOneForecast,
  );
  const descriptionDayPlusTwo = getDescription(
    threeDaysForecastData.dayPlusTwoForecast,
  );
  const descriptionDayPlusThree = getDescription(
    threeDaysForecastData.dayPlusThreeForecast,
  );
  descPlusOne.textContent = descriptionDayPlusOne;
  descPlusTwo.textContent = descriptionDayPlusTwo;
  descPlusThree.textContent = descriptionDayPlusThree;

  // get the corresponding img url and alt for each description
  const imgOneUrl = getWeatherImage(
    descriptionDayPlusOne,
    threeDaysForecastData.dayPlusOneForecast,
  );
  const imgTwoUrl = getWeatherImage(
    descriptionDayPlusTwo,
    threeDaysForecastData.dayPlusTwoForecast,
  );
  const imgThreeUrl = getWeatherImage(
    descriptionDayPlusThree,
    threeDaysForecastData.dayPlusThreeForecast,
  );
  imgPlusOne.src = imgOneUrl;
  imgPlusOne.alt = descriptionDayPlusOne;
  imgPlusTwo.src = imgTwoUrl;
  imgPlusTwo.alt = descriptionDayPlusTwo;
  imgPlusThree.src = imgThreeUrl;
  imgPlusThree.alt = descriptionDayPlusThree;
}

function populateCountry(objCountry, objCity) {
  const country = objCountry.filter(
    (countryInData) => countryInData.cca2 === objCity[0].country,
  );
  const countryName = country[0].name.common;

  const countryFlag = country[0].flags;
  const cityName = objCity[0].name;

  // populate the city and country element
  const city = document.querySelector(".city-name");
  city.innerHTML = `${cityName}, </br> ${countryName}`;

  // populate the flag image and alt
  const flag = document.querySelector(".city > img");
  flag.src = countryFlag.svg;
  flag.alt = countryFlag.alt;
}

function populateUI(obj, units) {
  // populate temperature now
  populateTemperatureNow(obj, units);
  // populate info now
  populateInfoNow(obj, units);
  // populate other infos
  populateOtherInfos(obj, units);
  // populate forecast
  populateForecast(obj, units);
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsS0FBSyxTQUFTLElBQUk7QUFDM0UsUUFBUSxjQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLG9CQUFvQjtBQUNqRSxRQUFRLGNBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxnQkFBZ0IsT0FBTyxnQkFBZ0IsU0FBUyxJQUFJLFNBQVMsTUFBTTtBQUNqSSxRQUFRLGNBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQSxHQUFHO0FBQ0g7QUFDQSxvQ0FBb0MsNkJBQTZCO0FBQ2pFO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1DQUFtQztBQUMzRDtBQUNBLGlEQUFpRCw0QkFBNEI7QUFDN0U7QUFDQSxlQUFlLG1DQUFtQztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksc0JBQXNCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLFlBQVkseUJBQXlCO0FBQ3JDO0FBQ0Esd0JBQXdCLEtBQUssRUFBRSxPQUFPLEVBQUUsMEJBQTBCLElBQUksS0FBSyxHQUFHLE9BQU87QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFVBQVU7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxvQkFBb0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywyQkFBMkI7QUFDakUsc0NBQXNDLDJCQUEyQjtBQUNqRSwwQ0FBMEMsd0JBQXdCO0FBQ2xFLG9DQUFvQyx3QkFBd0I7QUFDNUQ7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLFlBQVkseUJBQXlCO0FBQ3JDO0FBQ0Esb0NBQW9DLGFBQWEsR0FBRyxlQUFlO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzQkFBc0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsWUFBWSx3QkFBd0I7QUFDcEM7QUFDQSxrQ0FBa0MsWUFBWSxHQUFHLGNBQWM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtQ0FBbUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCO0FBQ3hGLCtCQUErQixpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUI7QUFDeEYsaUNBQWlDLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLG1CQUFtQjtBQUNoRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBLEdBQUc7QUFDSCwrQkFBK0Isb0JBQW9CO0FBQ25EO0FBQ0EsR0FBRztBQUNILGlDQUFpQyxzQkFBc0I7QUFDdkQ7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixTQUFTLFVBQVUsWUFBWTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay12YW5pbGxhLWpzLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBjaXR5TmFtZSA9IFwiXCI7XHJcbmxldCB1bml0cyA9IFwiXCI7XHJcblxyXG4vLyB3ZWF0aGVyIEFQSSBrZXlcclxuY29uc3QgS0VZID0gXCI4ZDNkZGY2ZjdiYjAwMzE2N2I5YzAxYjg4ODk5M2VmNFwiO1xyXG5cclxuLy8gcmV0cmlldmUgc2VhcmNoIGVsZW1lbnRzXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LWlucHV0XCIpO1xyXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1idXR0b25cIik7XHJcbmNvbnN0IHN3aXRjaFVuaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1bml0c1wiKTtcclxuXHJcbi8vIHNlYXJjaCBidXR0b24gZXZlbnQgaGFuZGxlclxyXG5zZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGlmIChpbnB1dC52YWx1ZSkge1xyXG4gICAgY2l0eU5hbWUgPSBpbnB1dC52YWx1ZTtcclxuICAgIHVuaXRzID0gc3dpdGNoVW5pdHMudmFsdWU7XHJcbiAgICBnZXRGb3JlY2FzdERhdGEoY2l0eU5hbWUsIEtFWSwgdW5pdHMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBnZXRGb3JlY2FzdERhdGEoXCJvc2FrYVwiLCBLRVksIFwibWV0cmljXCIpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBkZWZhdWx0OiBvc2FrYSAtIG1ldHJpY1xyXG5nZXRGb3JlY2FzdERhdGEoXCJvc2FrYVwiLCBLRVksIFwibWV0cmljXCIpO1xyXG5cclxuLy8gZmV0Y2ggY2l0eSBkYXRhXHJcbmFzeW5jIGZ1bmN0aW9uIGdlb0NvZGVDaXR5KG5hbWUsIGtleSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtuYW1lfSZhcHBpZD0ke2tleX1gLFxyXG4gICAgICB7IG1vZGU6IFwiY29yc1wiIH0sXHJcbiAgICApO1xyXG4gICAgY29uc3QgY2l0eURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gY2l0eURhdGE7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGZldGNoIGZvcmVjYXN0IGRhdGFcclxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3REYXRhKG5hbWUsIGtleSwgdW5pdHMpIHtcclxuICBjb25zdCBjaXR5RGF0YSA9IGF3YWl0IGdlb0NvZGVDaXR5KG5hbWUsIGtleSk7XHJcblxyXG4gIC8vIHRvIGdldCB0aGUgY291bnRyeSBuYW1lXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNvdW50cnlSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmNvbS92My4xL25hbWUvJHtjaXR5RGF0YVswXS5jb3VudHJ5fWAsXHJcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfSxcclxuICAgICk7XHJcbiAgICBjb25zdCBjb3VudHJ5RGF0YSA9IGF3YWl0IGNvdW50cnlSZXNwb25zZS5qc29uKCk7XHJcbiAgICBwb3B1bGF0ZUNvdW50cnkoY291bnRyeURhdGEsIGNpdHlEYXRhKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgLy8gdG8gZ2V0IHRoZSBmb3JlY2FzdFxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2NpdHlEYXRhWzBdLmxhdH0mbG9uPSR7Y2l0eURhdGFbMF0ubG9ufSZhcHBpZD0ke2tleX0mdW5pdHM9JHt1bml0c30mY250PTQwYCxcclxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9LFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHBvcHVsYXRlVUkoZm9yZWNhc3REYXRhLCB1bml0cyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFVJXHJcbmZ1bmN0aW9uIHBvcHVsYXRlVGVtcGVyYXR1cmVOb3cob2JqLCB1bml0cykge1xyXG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIik7XHJcbiAgY29uc3QgZmVlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWxzLWxpa2VcIik7XHJcblxyXG4gIHRlbXAudGV4dENvbnRlbnQgPSBgJHtvYmoubGlzdFswXS5tYWluLnRlbXB9ICR7XHJcbiAgICB1bml0cyA9PT0gXCJtZXRyaWNcIiA/IFwiwrBDXCIgOiBcIsKwRlwiXHJcbiAgfWA7XHJcblxyXG4gIGZlZWxzLnRleHRDb250ZW50ID0gYGZlZWxzIGxpa2UgJHtvYmoubGlzdFswXS5tYWluLmZlZWxzX2xpa2V9ICR7XHJcbiAgICB1bml0cyA9PT0gXCJtZXRyaWNcIiA/IFwiwrBDXCIgOiBcIsKwRlwiXHJcbiAgfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlSW5mb05vdyhvYmosIHVuaXRzKSB7XHJcbiAgY29uc3QgZGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY1wiKTtcclxuICBjb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tbm93ID4gaW1nXCIpO1xyXG4gIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGVcIik7XHJcblxyXG4gIGRlc2MudGV4dENvbnRlbnQgPSBgJHtvYmoubGlzdFswXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9ufWA7XHJcblxyXG4gIGltZy5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7b2JqLmxpc3RbMF0ud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xyXG5cclxuICBpbWcuYWx0ID0gYCR7b2JqLmxpc3RbMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbn1gO1xyXG5cclxuICBjb25zdCBjdXJyZW50VGltZSA9IGdldEN1cnJlbnRUaW1lT2ZDaXR5KG9iaik7XHJcbiAgY29uc3QgZGF5ID1cclxuICAgIGN1cnJlbnRUaW1lLmdldERhdGUoKSA8IDEwXHJcbiAgICAgID8gYDAke2N1cnJlbnRUaW1lLmdldERhdGUoKX1gXHJcbiAgICAgIDogY3VycmVudFRpbWUuZ2V0RGF0ZSgpO1xyXG4gIGNvbnN0IG1vbnRocyA9IFtcclxuICAgIFwiSmFudWFyeVwiLFxyXG4gICAgXCJGZWJydWFyeVwiLFxyXG4gICAgXCJNYXJjaFwiLFxyXG4gICAgXCJBcHJpbFwiLFxyXG4gICAgXCJNYXlcIixcclxuICAgIFwiSnVuZVwiLFxyXG4gICAgXCJKdWx5XCIsXHJcbiAgICBcIkF1Z3VzdFwiLFxyXG4gICAgXCJTZXB0ZW1iZXJcIixcclxuICAgIFwiT2N0b2JlclwiLFxyXG4gICAgXCJOb3ZlbWJlclwiLFxyXG4gICAgXCJEZWNlbWJlclwiLFxyXG4gIF07XHJcbiAgY29uc3QgbW9udGggPSBtb250aHNbY3VycmVudFRpbWUuZ2V0TW9udGgoKV07XHJcbiAgY29uc3QgaG91ciA9XHJcbiAgICBjdXJyZW50VGltZS5nZXRIb3VycygpIDwgMTBcclxuICAgICAgPyBgMCR7Y3VycmVudFRpbWUuZ2V0SG91cnMoKX1gXHJcbiAgICAgIDogY3VycmVudFRpbWUuZ2V0SG91cnMoKTtcclxuICBjb25zdCBtaW51dGUgPVxyXG4gICAgY3VycmVudFRpbWUuZ2V0TWludXRlcygpIDwgMTBcclxuICAgICAgPyBgMCR7Y3VycmVudFRpbWUuZ2V0TWludXRlcygpfWBcclxuICAgICAgOiBjdXJyZW50VGltZS5nZXRNaW51dGVzKCk7XHJcbiAgZGF0ZS50ZXh0Q29udGVudCA9IGAke2RheX0gJHttb250aH0gJHtjdXJyZW50VGltZS5nZXRGdWxsWWVhcigpfSwgJHtob3VyfToke21pbnV0ZX1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDdXJyZW50VGltZU9mQ2l0eShvYmopIHtcclxuICAvLyBjcmVhdGUgRGF0ZSBvYmplY3QgZm9yIGN1cnJlbnQgbG9jYXRpb25cclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIC8vIGNvbnZlcnQgdG8gbWlsbGlzZWNvbmRzLCBhZGQgbG9jYWwgdGltZSB6b25lIG9mZnNldCBhbmQgZ2V0IFVUQyB0aW1lIGluIG1pbGxpc2Vjb25kc1xyXG4gIGNvbnN0IHV0Y1RpbWUgPVxyXG4gICAgY3VycmVudERhdGUuZ2V0VGltZSgpICsgY3VycmVudERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xyXG5cclxuICAvLyB1dGMgb2Zmc2V0IG9mIHRoZSBjaXR5XHJcbiAgY29uc3QgeyB0aW1lem9uZSB9ID0gb2JqLmNpdHk7XHJcbiAgY29uc3Qgb2Zmc2V0Q2l0eSA9IHRpbWV6b25lICogMTAwMDtcclxuXHJcbiAgLy8gY3JlYXRlIG5ldyBEYXRlIG9iamVjdCBmb3IgYSBkaWZmZXJlbnQgdGltZXpvbmUgdXNpbmcgc3VwcGxpZWQgaXRzIEdNVCBvZmZzZXQuXHJcbiAgY29uc3QgY3VycmVudERhdGVBbmRUaW1lSW5DaXR5ID0gbmV3IERhdGUodXRjVGltZSArIG9mZnNldENpdHkpO1xyXG4gIHJldHVybiBjdXJyZW50RGF0ZUFuZFRpbWVJbkNpdHk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEZvcmVjYXN0RGF0ZXMob2JqKSB7XHJcbiAgLy8gY3JlYXRlIERhdGUgb2JqZWN0IGZvciBjdXJyZW50IGxvY2F0aW9uXHJcbiAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAvLyBjb252ZXJ0IHRvIG1pbGxpc2Vjb25kcywgYWRkIGxvY2FsIHRpbWUgem9uZSBvZmZzZXQgYW5kIGdldCBVVEMgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICBjb25zdCB1dGNUaW1lID1cclxuICAgIGN1cnJlbnREYXRlLmdldFRpbWUoKSArIGN1cnJlbnREYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcclxuXHJcbiAgLy8gdXRjIG9mZnNldCBvZiB0aGUgY2l0eVxyXG4gIGNvbnN0IHsgdGltZXpvbmUgfSA9IG9iai5jaXR5O1xyXG4gIGNvbnN0IG9mZnNldENpdHkgPSB0aW1lem9uZSAqIDEwMDA7XHJcblxyXG4gIC8vIGN1cnJlbnQgZGF0ZSArMSBkYXkgKDg2NDAwMDAwIG1pbGxpc2Vjb25kcylcclxuICBjb25zdCBkUGx1c09uZSA9IG5ldyBEYXRlKHV0Y1RpbWUgKyBvZmZzZXRDaXR5ICsgODY0MDAwMDApO1xyXG5cclxuICAvLyBjdXJyZW50IGRhdGUgKzIgZGF5cyAoMTcyODAwMDAwIG1pbGxpc2Vjb25kcylcclxuICBjb25zdCBkUGx1c1R3byA9IG5ldyBEYXRlKHV0Y1RpbWUgKyBvZmZzZXRDaXR5ICsgMTcyODAwMDAwKTtcclxuXHJcbiAgLy8gY3VycmVudCBkYXRlICszIGRheXMgKDI1OTIwMDAwMCBtaWxsaXNlY29uZHMpXHJcbiAgY29uc3QgZFBsdXNUaHJlZSA9IG5ldyBEYXRlKHV0Y1RpbWUgKyBvZmZzZXRDaXR5ICsgMjU5MjAwMDAwKTtcclxuXHJcbiAgcmV0dXJuIHsgZFBsdXNPbmUsIGRQbHVzVHdvLCBkUGx1c1RocmVlIH07XHJcbiAgLy8gcmV0dXJuIGN1cnJlbnREYXRlQW5kVGltZUluQ2l0eTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3VucmlzZShvYmopIHtcclxuICAvLyBjaXR5IHN1bnJpc2VcclxuICBjb25zdCB7IHN1bnJpc2UgfSA9IG9iai5jaXR5O1xyXG5cclxuICAvLyB1dGMgb2Zmc2V0IG9mIGN1cnJlbnQgbG9jYXRpb25cclxuICBjb25zdCBvZmZzZXRDdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDA7XHJcblxyXG4gIC8vIHV0YyBvZmZzZXQgb2YgdGhlIGNpdHlcclxuICBjb25zdCB7IHRpbWV6b25lIH0gPSBvYmouY2l0eTtcclxuICBjb25zdCBvZmZzZXRDaXR5ID0gdGltZXpvbmUgKiAxMDAwO1xyXG5cclxuICAvLyB0b3RhbCBvZmZzZXQgZnJvbSBjdXJyZW50IGxvY2F0aW9uXHJcbiAgY29uc3QgdG90YWxPZmZzZXQgPSBvZmZzZXRDaXR5ICsgb2Zmc2V0Q3VycmVudDtcclxuXHJcbiAgLy8gc3VucmlzZSBkYXRlLCByZWxhdGl2ZSB0byB0aGUgY2l0eSB0aW1lXHJcbiAgY29uc3Qgc3VucmlzZURhdGUgPSBuZXcgRGF0ZShzdW5yaXNlICogMTAwMCArIHRvdGFsT2Zmc2V0KTtcclxuICByZXR1cm4gc3VucmlzZURhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN1bnNldChvYmopIHtcclxuICAvLyBjaXR5IHN1bnJpc2VcclxuICBjb25zdCB7IHN1bnNldCB9ID0gb2JqLmNpdHk7XHJcblxyXG4gIC8vIHV0YyBvZmZzZXQgb2YgY3VycmVudCBsb2NhdGlvblxyXG4gIGNvbnN0IG9mZnNldEN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcclxuXHJcbiAgLy8gdXRjIG9mZnNldCBvZiB0aGUgY2l0eVxyXG4gIGNvbnN0IHsgdGltZXpvbmUgfSA9IG9iai5jaXR5O1xyXG4gIGNvbnN0IG9mZnNldENpdHkgPSB0aW1lem9uZSAqIDEwMDA7XHJcblxyXG4gIC8vIHRvdGFsIG9mZnNldCBmcm9tIGN1cnJlbnQgbG9jYXRpb25cclxuICBjb25zdCB0b3RhbE9mZnNldCA9IG9mZnNldENpdHkgKyBvZmZzZXRDdXJyZW50O1xyXG5cclxuICAvLyBzdW5yaXNlIGRhdGUsIHJlbGF0aXZlIHRvIHRoZSBjaXR5IHRpbWVcclxuICBjb25zdCBzdW5zZXREYXRlID0gbmV3IERhdGUoc3Vuc2V0ICogMTAwMCArIHRvdGFsT2Zmc2V0KTtcclxuICByZXR1cm4gc3Vuc2V0RGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGhyZWVEYXlzRm9yZWNhc3REYXRhKG9iaikge1xyXG4gIC8vIHJldHVybiBvbmx5IHRoZSBkYXRhIG9mIHRoZSAzIG5leHQgZGF5c1xyXG5cclxuICAvLyBmaXJzdCBlbGVtZW50IGlzIHRoZSBpbnRlcnZhbCAoMyBob3Vycykgbm93LCBzZWNvbmQgZWxlbWVudCBpcyB0aGUgaW5kZXggdG8gcmVtb3ZlXHJcbiAgY29uc3QgbWFwRWxlbWVudHNUb1JlbW92ZSA9IFtcclxuICAgIFtcIjAwXCIsIDddLFxyXG4gICAgW1wiMDNcIiwgNl0sXHJcbiAgICBbXCIwNlwiLCA1XSxcclxuICAgIFtcIjA5XCIsIDRdLFxyXG4gICAgW1wiMTJcIiwgM10sXHJcbiAgICBbXCIxNVwiLCAyXSxcclxuICAgIFtcIjE4XCIsIDFdLFxyXG4gICAgW1wiMjFcIiwgMF0sXHJcbiAgXTtcclxuICBjb25zdCBpbnRlcnZhbE5vdyA9IG9iai5saXN0WzBdLmR0X3R4dDtcclxuICBjb25zdCBpbnRlcnZhbE5vd1N0cmluZyA9IGludGVydmFsTm93WzExXSArIGludGVydmFsTm93WzEyXTtcclxuXHJcbiAgY29uc3QgbnVtYmVyT2ZFbGVtZW50ID0gbWFwRWxlbWVudHNUb1JlbW92ZS5maWx0ZXIoXHJcbiAgICAoZWxlbSkgPT4gZWxlbVswXSA9PT0gaW50ZXJ2YWxOb3dTdHJpbmcsXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaW5kZXhUb1JlbW92ZSA9IG51bWJlck9mRWxlbWVudFswXVsxXTtcclxuXHJcbiAgY29uc3QgbmV3QXJyYXkgPSBvYmoubGlzdC5maWx0ZXIoKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA+IGluZGV4VG9SZW1vdmUpO1xyXG5cclxuICAvLyBkYXkrMSBkYXkrMiBkYXkrMyBkYXRhc1xyXG4gIGNvbnN0IGRheVBsdXNPbmVGb3JlY2FzdCA9IG5ld0FycmF5LmZpbHRlcigoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4IDw9IDcpO1xyXG4gIGNvbnN0IGRheVBsdXNUd29Gb3JlY2FzdCA9IG5ld0FycmF5LmZpbHRlcihcclxuICAgIChlbGVtZW50LCBpbmRleCkgPT4gaW5kZXggPj0gOCAmJiBpbmRleCA8PSAxNSxcclxuICApO1xyXG4gIGNvbnN0IGRheVBsdXNUaHJlZUZvcmVjYXN0ID0gbmV3QXJyYXkuZmlsdGVyKFxyXG4gICAgKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA+PSAxNiAmJiBpbmRleCA8PSAyMyxcclxuICApO1xyXG5cclxuICByZXR1cm4geyBkYXlQbHVzT25lRm9yZWNhc3QsIGRheVBsdXNUd29Gb3JlY2FzdCwgZGF5UGx1c1RocmVlRm9yZWNhc3QgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWVhblRlbXAob2JqKSB7XHJcbiAgLy8gc29ydCB0aGUgYXJyYXkgYnkgdGVtcCBhbmQgbWVhbiB0aGUgZmlyc3QgYW5kIGxhc3QgdGVtcGVyYXR1cmVcclxuICBjb25zdCBzb3J0ZWRBcnJheSA9IG9iai5zb3J0KChhLCBiKSA9PiBhLm1haW4udGVtcCAtIGIubWFpbi50ZW1wKTtcclxuICBjb25zdCBtZWFuVGVtcGVyYXR1cmUgPVxyXG4gICAgKHNvcnRlZEFycmF5WzBdLm1haW4udGVtcCArIHNvcnRlZEFycmF5WzddLm1haW4udGVtcCkgLyAyO1xyXG5cclxuICByZXR1cm4gbWVhblRlbXBlcmF0dXJlLnRvRml4ZWQoMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKG9iaikge1xyXG4gIC8vIGZpbmQgYW5kIHJldHVybiB0aGUgbW9zdCBvY2N1cmluZyB3ZWF0aGVyIGRlc2NyaXB0aW9uIGluIGEgZGF5XHJcbiAgY29uc3QgZGVzY3JpcHRpb25zID0gb2JqLm1hcCgoZWxlbWVudCkgPT4gZWxlbWVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uKTtcclxuXHJcbiAgY29uc3QgZGVzY3JpcHRpb25Db3VudHMgPSB7fTtcclxuICBkZXNjcmlwdGlvbnMuZm9yRWFjaCgoZGVzY3JpcHRpb24pID0+IHtcclxuICAgIGlmIChkZXNjcmlwdGlvbkNvdW50c1tkZXNjcmlwdGlvbl0pIHtcclxuICAgICAgZGVzY3JpcHRpb25Db3VudHNbZGVzY3JpcHRpb25dKys7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZXNjcmlwdGlvbkNvdW50c1tkZXNjcmlwdGlvbl0gPSAxO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkZXNjcmlwdGlvbkNvdW50c0FycmF5ID0gT2JqZWN0LmVudHJpZXMoZGVzY3JpcHRpb25Db3VudHMpO1xyXG4gIGRlc2NyaXB0aW9uQ291bnRzQXJyYXkuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pO1xyXG4gIHJldHVybiBkZXNjcmlwdGlvbkNvdW50c0FycmF5WzBdWzBdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXZWF0aGVySW1hZ2UoZGVzY3JpcHRpb24sIG9iaikge1xyXG4gIC8vIGZpbmQgYW4gZWxlbWVudCBvZiB0aGUgYXJyYXkgd2l0aCB0aGUgc2FtZSBkZXNjcmlwdGlvbiBhbmQgcmV0dXJuIHRoZSBpY29uXHJcbiAgY29uc3QgYXJyID0gb2JqLmZpbmQoXHJcbiAgICAoZWxlbWVudCkgPT4gZWxlbWVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uID09PSBkZXNjcmlwdGlvbixcclxuICApO1xyXG4gIGNvbnN0IHVybCA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHthcnIud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xyXG4gIHJldHVybiB1cmw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlT3RoZXJJbmZvcyhvYmosIHVuaXRzKSB7XHJcbiAgY29uc3QgcHJlc3N1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXNzdXJlXCIpO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eVwiKTtcclxuICBjb25zdCBjbG91ZGluZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG91ZGluZXNzXCIpO1xyXG4gIGNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRcIik7XHJcbiAgY29uc3Qgc3VucmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZVwiKTtcclxuICBjb25zdCBzdW5zZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldFwiKTtcclxuXHJcbiAgcHJlc3N1cmUudGV4dENvbnRlbnQgPSBgcHJlc3N1cmU6ICR7b2JqLmxpc3RbMF0ubWFpbi5wcmVzc3VyZX0gaFBhYDtcclxuICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBodW1pZGl0eTogJHtvYmoubGlzdFswXS5tYWluLmh1bWlkaXR5fSAlYDtcclxuICBjbG91ZGluZXNzLnRleHRDb250ZW50ID0gYGNsb3VkaW5lc3M6ICR7b2JqLmxpc3RbMF0uY2xvdWRzLmFsbH0gJWA7XHJcbiAgd2luZC50ZXh0Q29udGVudCA9IGB3aW5kIHNwZWVkOiAke29iai5saXN0WzBdLndpbmQuc3BlZWR9ICR7XHJcbiAgICB1bml0cyA9PT0gXCJtZXRyaWNcIiA/IFwibWV0ZXIvc1wiIDogXCJtaWxlcy9oXCJcclxuICB9YDtcclxuXHJcbiAgLy8gcmV0cmlldmUgc3VucmlzZSBhbmQgc3Vuc2V0IGRhdGUgYW5kIG9ubHkgdXNlIGhvdXJzIGFuZCBtaW51dGVzXHJcbiAgY29uc3Qgc3VucmlzZURhdGUgPSBnZXRTdW5yaXNlKG9iaik7XHJcbiAgY29uc3Qgc3VucmlzZUhvdXJzID1cclxuICAgIHN1bnJpc2VEYXRlLmdldEhvdXJzKCkgPCAxMFxyXG4gICAgICA/IGAwJHtzdW5yaXNlRGF0ZS5nZXRIb3VycygpfWBcclxuICAgICAgOiBzdW5yaXNlRGF0ZS5nZXRIb3VycygpO1xyXG4gIGNvbnN0IHN1bnJpc2VNaW51dGVzID1cclxuICAgIHN1bnJpc2VEYXRlLmdldE1pbnV0ZXMoKSA8IDEwXHJcbiAgICAgID8gYDAke3N1bnJpc2VEYXRlLmdldE1pbnV0ZXMoKX1gXHJcbiAgICAgIDogc3VucmlzZURhdGUuZ2V0TWludXRlcygpO1xyXG4gIHN1bnJpc2UudGV4dENvbnRlbnQgPSBgc3VucmlzZTogJHtzdW5yaXNlSG91cnN9OiR7c3VucmlzZU1pbnV0ZXN9YDtcclxuXHJcbiAgY29uc3Qgc3Vuc2V0RGF0ZSA9IGdldFN1bnNldChvYmopO1xyXG4gIGNvbnN0IHN1bnNldEhvdXJzID1cclxuICAgIHN1bnNldERhdGUuZ2V0SG91cnMoKSA8IDEwXHJcbiAgICAgID8gYDAke3N1bnNldERhdGUuZ2V0SG91cnMoKX1gXHJcbiAgICAgIDogc3Vuc2V0RGF0ZS5nZXRIb3VycygpO1xyXG4gIGNvbnN0IHN1bnNldE1pbnV0ZXMgPVxyXG4gICAgc3Vuc2V0RGF0ZS5nZXRNaW51dGVzKCkgPCAxMFxyXG4gICAgICA/IGAwJHtzdW5zZXREYXRlLmdldE1pbnV0ZXMoKX1gXHJcbiAgICAgIDogc3Vuc2V0RGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgc3Vuc2V0LnRleHRDb250ZW50ID0gYHN1bnNldDogJHtzdW5zZXRIb3Vyc306JHtzdW5zZXRNaW51dGVzfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlRm9yZWNhc3Qob2JqLCB1bml0cykge1xyXG4gIGNvbnN0IGRhdGVQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlLWQtb25lXCIpO1xyXG4gIGNvbnN0IHRlbXBQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wLWQtb25lXCIpO1xyXG4gIGNvbnN0IGRlc2NQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjLWQtb25lXCIpO1xyXG4gIGNvbnN0IGltZ1BsdXNPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltZy1kLW9uZVwiKTtcclxuICBjb25zdCBkYXRlUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS1kLXR3b1wiKTtcclxuICBjb25zdCB0ZW1wUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcC1kLXR3b1wiKTtcclxuICBjb25zdCBkZXNjUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzYy1kLXR3b1wiKTtcclxuICBjb25zdCBpbWdQbHVzVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctZC10d29cIik7XHJcbiAgY29uc3QgZGF0ZVBsdXNUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS1kLXRocmVlXCIpO1xyXG4gIGNvbnN0IHRlbXBQbHVzVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtZC10aHJlZVwiKTtcclxuICBjb25zdCBkZXNjUGx1c1RocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjLWQtdGhyZWVcIik7XHJcbiAgY29uc3QgaW1nUGx1c1RocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctZC10aHJlZVwiKTtcclxuXHJcbiAgLy8gbGlzdCBvZiBtb250aHNcclxuICBjb25zdCBtb250aHMgPSBbXHJcbiAgICBcIkphbnVhcnlcIixcclxuICAgIFwiRmVicnVhcnlcIixcclxuICAgIFwiTWFyY2hcIixcclxuICAgIFwiQXByaWxcIixcclxuICAgIFwiTWF5XCIsXHJcbiAgICBcIkp1bmVcIixcclxuICAgIFwiSnVseVwiLFxyXG4gICAgXCJBdWd1c3RcIixcclxuICAgIFwiU2VwdGVtYmVyXCIsXHJcbiAgICBcIk9jdG9iZXJcIixcclxuICAgIFwiTm92ZW1iZXJcIixcclxuICAgIFwiRGVjZW1iZXJcIixcclxuICBdO1xyXG5cclxuICAvLyBnZXQgZGF0ZSsxLCBkYXRlKzIsIGRhdGUrMyBvYmplY3RzIHRoZW4gcG9wdWxhdGUgZm9yZWNhc3QgZGF0ZXMgd2l0aCB0aG9zZVxyXG4gIGNvbnN0IGZvcmVjYXN0RGF0ZXMgPSBnZXRGb3JlY2FzdERhdGVzKG9iaik7XHJcbiAgY29uc3QgZGF5T2ZEYXlQbHVzT25lID1cclxuICAgIGZvcmVjYXN0RGF0ZXMuZFBsdXNPbmUuZ2V0RGF0ZSgpIDwgMTBcclxuICAgICAgPyBgMCR7Zm9yZWNhc3REYXRlcy5kUGx1c09uZS5nZXREYXRlKCl9YFxyXG4gICAgICA6IGZvcmVjYXN0RGF0ZXMuZFBsdXNPbmUuZ2V0RGF0ZSgpO1xyXG4gIGNvbnN0IG1vbnRoT2ZEYXlQbHVzT25lID0gbW9udGhzW2ZvcmVjYXN0RGF0ZXMuZFBsdXNPbmUuZ2V0TW9udGgoKV07XHJcbiAgY29uc3QgeWVhck9mRGF5UGx1c09uZSA9IGZvcmVjYXN0RGF0ZXMuZFBsdXNPbmUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgY29uc3QgZGF5T2ZEYXlQbHVzVHdvID1cclxuICAgIGZvcmVjYXN0RGF0ZXMuZFBsdXNUd28uZ2V0RGF0ZSgpIDwgMTBcclxuICAgICAgPyBgMCR7Zm9yZWNhc3REYXRlcy5kUGx1c1R3by5nZXREYXRlKCl9YFxyXG4gICAgICA6IGZvcmVjYXN0RGF0ZXMuZFBsdXNUd28uZ2V0RGF0ZSgpO1xyXG4gIGNvbnN0IG1vbnRoT2ZEYXlQbHVzVHdvID0gbW9udGhzW2ZvcmVjYXN0RGF0ZXMuZFBsdXNUd28uZ2V0TW9udGgoKV07XHJcbiAgY29uc3QgeWVhck9mRGF5UGx1c1R3byA9IGZvcmVjYXN0RGF0ZXMuZFBsdXNUd28uZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgY29uc3QgZGF5T2ZEYXlQbHVzVGhyZWUgPVxyXG4gICAgZm9yZWNhc3REYXRlcy5kUGx1c1RocmVlLmdldERhdGUoKSA8IDEwXHJcbiAgICAgID8gYDAke2ZvcmVjYXN0RGF0ZXMuZFBsdXNUaHJlZS5nZXREYXRlKCl9YFxyXG4gICAgICA6IGZvcmVjYXN0RGF0ZXMuZFBsdXNUaHJlZS5nZXREYXRlKCk7XHJcbiAgY29uc3QgbW9udGhPZkRheVBsdXNUaHJlZSA9IG1vbnRoc1tmb3JlY2FzdERhdGVzLmRQbHVzVGhyZWUuZ2V0TW9udGgoKV07XHJcbiAgY29uc3QgeWVhck9mRGF5UGx1c1RocmVlID0gZm9yZWNhc3REYXRlcy5kUGx1c1RocmVlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gIGRhdGVQbHVzT25lLnRleHRDb250ZW50ID0gYCR7ZGF5T2ZEYXlQbHVzT25lfSAke21vbnRoT2ZEYXlQbHVzT25lfSAke3llYXJPZkRheVBsdXNPbmV9YDtcclxuICBkYXRlUGx1c1R3by50ZXh0Q29udGVudCA9IGAke2RheU9mRGF5UGx1c1R3b30gJHttb250aE9mRGF5UGx1c1R3b30gJHt5ZWFyT2ZEYXlQbHVzVHdvfWA7XHJcbiAgZGF0ZVBsdXNUaHJlZS50ZXh0Q29udGVudCA9IGAke2RheU9mRGF5UGx1c1RocmVlfSAke21vbnRoT2ZEYXlQbHVzVGhyZWV9ICR7eWVhck9mRGF5UGx1c1RocmVlfWA7XHJcblxyXG4gIC8vIG1lYW4gdGhlIG1pbiBhbmQgbWF4IHRlbXAgb2YgdGhlIGRheXMgcG9wdWxhdGUgdGVtcCsxLCB0ZW1wKzIsIHRlbXArM1xyXG4gIGNvbnN0IHRocmVlRGF5c0ZvcmVjYXN0RGF0YSA9IGdldFRocmVlRGF5c0ZvcmVjYXN0RGF0YShvYmopO1xyXG4gIGNvbnN0IG1lYW5UZW1wRGF5UGx1c09uZSA9IG1lYW5UZW1wKHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzT25lRm9yZWNhc3QpO1xyXG4gIGNvbnN0IG1lYW5UZW1wRGF5UGx1c1R3byA9IG1lYW5UZW1wKHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzVHdvRm9yZWNhc3QpO1xyXG4gIGNvbnN0IG1lYW5UZW1wRGF5UGx1c1RocmVlID0gbWVhblRlbXAoXHJcbiAgICB0aHJlZURheXNGb3JlY2FzdERhdGEuZGF5UGx1c1RocmVlRm9yZWNhc3QsXHJcbiAgKTtcclxuICB0ZW1wUGx1c09uZS50ZXh0Q29udGVudCA9IGAke21lYW5UZW1wRGF5UGx1c09uZX0gJHtcclxuICAgIHVuaXRzID09PSBcIm1ldHJpY1wiID8gXCLCsENcIiA6IFwiwrBGXCJcclxuICB9YDtcclxuICB0ZW1wUGx1c1R3by50ZXh0Q29udGVudCA9IGAke21lYW5UZW1wRGF5UGx1c1R3b30gJHtcclxuICAgIHVuaXRzID09PSBcIm1ldHJpY1wiID8gXCLCsENcIiA6IFwiwrBGXCJcclxuICB9YDtcclxuICB0ZW1wUGx1c1RocmVlLnRleHRDb250ZW50ID0gYCR7bWVhblRlbXBEYXlQbHVzVGhyZWV9ICR7XHJcbiAgICB1bml0cyA9PT0gXCJtZXRyaWNcIiA/IFwiwrBDXCIgOiBcIsKwRlwiXHJcbiAgfWA7XHJcblxyXG4gIC8vIGZpbmQgdGhlIG1vc3Qgb2NjdXJpbmcgZGVzY3JpcHRpb24gaW4gYSBkYXkgYW5kIHBvcHVsYXRlIGRlc2MrMSwgZGVzYysyLCBkZXNjKzMgYWNjb3JkaW5nbHlcclxuICBjb25zdCBkZXNjcmlwdGlvbkRheVBsdXNPbmUgPSBnZXREZXNjcmlwdGlvbihcclxuICAgIHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzT25lRm9yZWNhc3QsXHJcbiAgKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkRheVBsdXNUd28gPSBnZXREZXNjcmlwdGlvbihcclxuICAgIHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzVHdvRm9yZWNhc3QsXHJcbiAgKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkRheVBsdXNUaHJlZSA9IGdldERlc2NyaXB0aW9uKFxyXG4gICAgdGhyZWVEYXlzRm9yZWNhc3REYXRhLmRheVBsdXNUaHJlZUZvcmVjYXN0LFxyXG4gICk7XHJcbiAgZGVzY1BsdXNPbmUudGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbkRheVBsdXNPbmU7XHJcbiAgZGVzY1BsdXNUd28udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbkRheVBsdXNUd287XHJcbiAgZGVzY1BsdXNUaHJlZS50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uRGF5UGx1c1RocmVlO1xyXG5cclxuICAvLyBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgaW1nIHVybCBhbmQgYWx0IGZvciBlYWNoIGRlc2NyaXB0aW9uXHJcbiAgY29uc3QgaW1nT25lVXJsID0gZ2V0V2VhdGhlckltYWdlKFxyXG4gICAgZGVzY3JpcHRpb25EYXlQbHVzT25lLFxyXG4gICAgdGhyZWVEYXlzRm9yZWNhc3REYXRhLmRheVBsdXNPbmVGb3JlY2FzdCxcclxuICApO1xyXG4gIGNvbnN0IGltZ1R3b1VybCA9IGdldFdlYXRoZXJJbWFnZShcclxuICAgIGRlc2NyaXB0aW9uRGF5UGx1c1R3byxcclxuICAgIHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzVHdvRm9yZWNhc3QsXHJcbiAgKTtcclxuICBjb25zdCBpbWdUaHJlZVVybCA9IGdldFdlYXRoZXJJbWFnZShcclxuICAgIGRlc2NyaXB0aW9uRGF5UGx1c1RocmVlLFxyXG4gICAgdGhyZWVEYXlzRm9yZWNhc3REYXRhLmRheVBsdXNUaHJlZUZvcmVjYXN0LFxyXG4gICk7XHJcbiAgaW1nUGx1c09uZS5zcmMgPSBpbWdPbmVVcmw7XHJcbiAgaW1nUGx1c09uZS5hbHQgPSBkZXNjcmlwdGlvbkRheVBsdXNPbmU7XHJcbiAgaW1nUGx1c1R3by5zcmMgPSBpbWdUd29Vcmw7XHJcbiAgaW1nUGx1c1R3by5hbHQgPSBkZXNjcmlwdGlvbkRheVBsdXNUd287XHJcbiAgaW1nUGx1c1RocmVlLnNyYyA9IGltZ1RocmVlVXJsO1xyXG4gIGltZ1BsdXNUaHJlZS5hbHQgPSBkZXNjcmlwdGlvbkRheVBsdXNUaHJlZTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVDb3VudHJ5KG9iakNvdW50cnksIG9iakNpdHkpIHtcclxuICBjb25zdCBjb3VudHJ5ID0gb2JqQ291bnRyeS5maWx0ZXIoXHJcbiAgICAoY291bnRyeUluRGF0YSkgPT4gY291bnRyeUluRGF0YS5jY2EyID09PSBvYmpDaXR5WzBdLmNvdW50cnksXHJcbiAgKTtcclxuICBjb25zdCBjb3VudHJ5TmFtZSA9IGNvdW50cnlbMF0ubmFtZS5jb21tb247XHJcblxyXG4gIGNvbnN0IGNvdW50cnlGbGFnID0gY291bnRyeVswXS5mbGFncztcclxuICBjb25zdCBjaXR5TmFtZSA9IG9iakNpdHlbMF0ubmFtZTtcclxuXHJcbiAgLy8gcG9wdWxhdGUgdGhlIGNpdHkgYW5kIGNvdW50cnkgZWxlbWVudFxyXG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktbmFtZVwiKTtcclxuICBjaXR5LmlubmVySFRNTCA9IGAke2NpdHlOYW1lfSwgPC9icj4gJHtjb3VudHJ5TmFtZX1gO1xyXG5cclxuICAvLyBwb3B1bGF0ZSB0aGUgZmxhZyBpbWFnZSBhbmQgYWx0XHJcbiAgY29uc3QgZmxhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2l0eSA+IGltZ1wiKTtcclxuICBmbGFnLnNyYyA9IGNvdW50cnlGbGFnLnN2ZztcclxuICBmbGFnLmFsdCA9IGNvdW50cnlGbGFnLmFsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVVSShvYmosIHVuaXRzKSB7XHJcbiAgLy8gcG9wdWxhdGUgdGVtcGVyYXR1cmUgbm93XHJcbiAgcG9wdWxhdGVUZW1wZXJhdHVyZU5vdyhvYmosIHVuaXRzKTtcclxuICAvLyBwb3B1bGF0ZSBpbmZvIG5vd1xyXG4gIHBvcHVsYXRlSW5mb05vdyhvYmosIHVuaXRzKTtcclxuICAvLyBwb3B1bGF0ZSBvdGhlciBpbmZvc1xyXG4gIHBvcHVsYXRlT3RoZXJJbmZvcyhvYmosIHVuaXRzKTtcclxuICAvLyBwb3B1bGF0ZSBmb3JlY2FzdFxyXG4gIHBvcHVsYXRlRm9yZWNhc3Qob2JqLCB1bml0cyk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9