/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Ui.js":
/*!*******************!*\
  !*** ./src/Ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ui)
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/lib.js");


class Ui {
    constructor(obj, units) {
        this.obj = obj;
        this.units = units;
    }

    populateUI() {
        // populate temperature now
        this.populateTemperatureNow();
        // populate info now
        this.populateInfoNow();
        // populate other infos
        this.populateOtherInfos();
        // populate forecast
        this.populateForecast();
    }

    populateTemperatureNow() {
        const temp = document.querySelector(".temp");
        const feels = document.querySelector(".feels-like");
      
        temp.textContent = `${this.obj.list[0].main.temp} ${
          units === "metric" ? "°C" : "°F"
        }`;
      
        feels.textContent = `feels like ${this.obj.list[0].main.feels_like} ${
          this.units === "metric" ? "°C" : "°F"
        }`;
    }

    populateInfoNow() {
        const desc = document.querySelector(".desc");
        const img = document.querySelector(".info-now > img");
        const date = document.querySelector(".date");
      
        desc.textContent = `${this.obj.list[0].weather[0].description}`;
      
        img.src = `https://openweathermap.org/img/wn/${this.obj.list[0].weather[0].icon}@2x.png`;
      
        img.alt = `${this.obj.list[0].weather[0].description}`;
      
        const currentTime = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getCurrentTimeOfCity)(this.obj);
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

    populateOtherInfos() {
        const pressure = document.querySelector(".pressure");
        const humidity = document.querySelector(".humidity");
        const cloudiness = document.querySelector(".cloudiness");
        const wind = document.querySelector(".wind");
        const sunrise = document.querySelector(".sunrise");
        const sunset = document.querySelector(".sunset");
      
        pressure.textContent = `pressure: ${this.obj.list[0].main.pressure} hPa`;
        humidity.textContent = `humidity: ${this.obj.list[0].main.humidity} %`;
        cloudiness.textContent = `cloudiness: ${this.obj.list[0].clouds.all} %`;
        wind.textContent = `wind speed: ${this.obj.list[0].wind.speed} ${
            this.units === "metric" ? "meter/s" : "miles/h"
        }`;
      
        // retrieve sunrise and sunset date and only use hours and minutes
        const sunriseDate = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getSunrise)(this.obj);
        const sunriseHours =
          sunriseDate.getHours() < 10
            ? `0${sunriseDate.getHours()}`
            : sunriseDate.getHours();
        const sunriseMinutes =
          sunriseDate.getMinutes() < 10
            ? `0${sunriseDate.getMinutes()}`
            : sunriseDate.getMinutes();
        sunrise.textContent = `sunrise: ${sunriseHours}:${sunriseMinutes}`;
      
        const sunsetDate = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getSunset)(this.obj);
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

    populateForecast() {
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
        const forecastDates = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getForecastDates)(this.obj);
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
        const threeDaysForecastData = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getThreeDaysForecastData)(this.obj);
        const meanTempDayPlusOne = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.meanTemp)(threeDaysForecastData.dayPlusOneForecast);
        const meanTempDayPlusTwo = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.meanTemp)(threeDaysForecastData.dayPlusTwoForecast);
        const meanTempDayPlusThree = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.meanTemp)(
          threeDaysForecastData.dayPlusThreeForecast,
        );
        tempPlusOne.textContent = `${meanTempDayPlusOne} ${
            this.units === "metric" ? "°C" : "°F"
        }`;
        tempPlusTwo.textContent = `${meanTempDayPlusTwo} ${
            this.units === "metric" ? "°C" : "°F"
        }`;
        tempPlusThree.textContent = `${meanTempDayPlusThree} ${
            this.units === "metric" ? "°C" : "°F"
        }`;
      
        // find the most occuring description in a day and populate desc+1, desc+2, desc+3 accordingly
        const descriptionDayPlusOne = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getDescription)(
          threeDaysForecastData.dayPlusOneForecast,
        );
        const descriptionDayPlusTwo = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getDescription)(
          threeDaysForecastData.dayPlusTwoForecast,
        );
        const descriptionDayPlusThree = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getDescription)(
          threeDaysForecastData.dayPlusThreeForecast,
        );
        descPlusOne.textContent = descriptionDayPlusOne;
        descPlusTwo.textContent = descriptionDayPlusTwo;
        descPlusThree.textContent = descriptionDayPlusThree;
      
        // get the corresponding img url and alt for each description
        const imgOneUrl = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getWeatherImage)(
          descriptionDayPlusOne,
          threeDaysForecastData.dayPlusOneForecast,
        );
        const imgTwoUrl = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getWeatherImage)(
          descriptionDayPlusTwo,
          threeDaysForecastData.dayPlusTwoForecast,
        );
        const imgThreeUrl = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getWeatherImage)(
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

    getForecastElements() {
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
        return {
            datePlusOne,
            tempPlusOne,
            descPlusOne,
            imgPlusOne,
            datePlusTwo,
            tempPlusTwo,
            descPlusTwo,
            imgPlusTwo,
            datePlusThree,
            tempPlusThree,
            descPlusThree,
            imgPlusThree
        };
    }

    static populateCountry(objCountry, objCity) {
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
}

/***/ }),

/***/ "./src/Url.js":
/*!********************!*\
  !*** ./src/Url.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Url)
/* harmony export */ });
class Url {
    constructor() {
        this.openWeatherBaseUrl = `https://api.openweathermap.org`;
        this.key = `8d3ddf6f7bb003167b9c01b888993ef4`;
        this.restcountriesBaseUrl = `https://restcountries.com/v3.1/name`;
    }

    getGeocodeUrl(cityName) {
        return `${this.openWeatherBaseUrl}/geo/1.0/direct?appid=${this.key}&q=${cityName}`;
    }

    getForecastUrl(latitude, longitude, units) {
        return `${this.openWeatherBaseUrl}/data/2.5/forecast?appid=${this.key}&lat=${latitude}&lon=${longitude}&units=${units}&cnt=40`;
    }

    getRestcountriesUrl(country) {
        return `${this.restcountriesBaseUrl}/${country}`;
    }
}

/***/ }),

/***/ "./src/lib.js":
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentTimeOfCity: () => (/* binding */ getCurrentTimeOfCity),
/* harmony export */   getDescription: () => (/* binding */ getDescription),
/* harmony export */   getForecastDates: () => (/* binding */ getForecastDates),
/* harmony export */   getSunrise: () => (/* binding */ getSunrise),
/* harmony export */   getSunset: () => (/* binding */ getSunset),
/* harmony export */   getThreeDaysForecastData: () => (/* binding */ getThreeDaysForecastData),
/* harmony export */   getWeatherImage: () => (/* binding */ getWeatherImage),
/* harmony export */   meanTemp: () => (/* binding */ meanTemp)
/* harmony export */ });
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

function meanTemp(obj) {
    // sort the array by temp and mean the first and last temperature
    const sortedArray = obj.sort((a, b) => a.main.temp - b.main.temp);
    const meanTemperature =
      (sortedArray[0].main.temp + sortedArray[7].main.temp) / 2;
  
    return meanTemperature.toFixed(2);
}

function getWeatherImage(description, obj) {
    // find an element of the array with the same description and return the icon
    const arr = obj.find(
      (element) => element.weather[0].description === description,
    );
    const url = `https://openweathermap.org/img/wn/${arr.weather[0].icon}@2x.png`;
    return url;
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Url */ "./src/Url.js");
/* harmony import */ var _Ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ui */ "./src/Ui.js");



// retrieve input elements
const cityInput = document.getElementById("city-input");
const unitInput = document.getElementById("units");
const searchButton = document.getElementById("search-button");

// fetch city data
async function geoCodeCity(name) {
  const url = new _Url__WEBPACK_IMPORTED_MODULE_0__["default"]();
  try {
    const response = await fetch(
      url.getGeocodeUrl(name),
      { mode: "cors" },
    );
    const cityData = await response.json();
    return cityData;
  } catch (error) {
    console.log(error);
  }
}

async function getCountryName(country) {
  const url = new _Url__WEBPACK_IMPORTED_MODULE_0__["default"]();
  try {
    const countryResponse = await fetch(
      url.getRestcountriesUrl(country),
      { mode: "cors"}
    );
    const countryData = await countryResponse.json();
    return countryData;
  } catch (error) {
    console.log(error);
  }
}

// get the forecast
async function getForecast(latitude, longitude, units) {
  const url = new _Url__WEBPACK_IMPORTED_MODULE_0__["default"]();
  try {
    const response = await fetch(
      url.getForecastUrl(latitude, longitude, units),
      { mode: "cors" },
    );
    const forecastData = await response.json();
    return forecastData;
  } catch (error) {
    console.log(error);
  }
}


// fetch forecast data
async function getForecastData(name, units) {
  const cityData = await geoCodeCity(name);
  const forecastData = await getForecast(cityData[0].lat, cityData[0].lon, units)

  return forecastData;
}

// default: osaka - metric
async function initialize() {
  const defaultCityName = "osaka";
  const defaultUnits = "metric";
  const forecastData = await getForecastData(defaultCityName, defaultUnits);
  const ui = new _Ui__WEBPACK_IMPORTED_MODULE_1__["default"](forecastData, units);
  ui.populateUI();
 
  const cityData = await geoCodeCity(defaultCityName);
  const countryData = await getCountryName(cityData[0].country);
  _Ui__WEBPACK_IMPORTED_MODULE_1__["default"].populateCountry(countryData, cityData);
}

// search button event handler
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
    const cityName = cityInput.value;
    const units = unitInput.value;
  if (cityName) {
    const forecastData = await getForecastData(cityName, units);
    const ui = new _Ui__WEBPACK_IMPORTED_MODULE_1__["default"](forecastData, units);
    ui.populateUI();

    const cityData = await geoCodeCity(cityName);
    const countryData = await getCountryName(cityData[0].country);
    _Ui__WEBPACK_IMPORTED_MODULE_1__["default"].populateCountry(countryData, cityData);
  } else {
    initialize();
  }
});

initialize();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw0Q0FBRztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLGNBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNENBQUc7QUFDckI7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNENBQUc7QUFDckI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxjQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMkNBQUU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDJDQUFFO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJDQUFFO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyQ0FBRTtBQUNOLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsYSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdmFuaWxsYS1qcy10ZW1wbGF0ZS8uL3NyYy9VaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXZhbmlsbGEtanMtdGVtcGxhdGUvLi9zcmMvVXJsLmpzIiwid2VicGFjazovL3dlYnBhY2stdmFuaWxsYS1qcy10ZW1wbGF0ZS8uL3NyYy9saWIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay12YW5pbGxhLWpzLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2stdmFuaWxsYS1qcy10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay12YW5pbGxhLWpzLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay12YW5pbGxhLWpzLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFjay12YW5pbGxhLWpzLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBnZXRDdXJyZW50VGltZU9mQ2l0eSxcclxuICAgIGdldFN1bnJpc2UsXHJcbiAgICBnZXRTdW5zZXQsXHJcbiAgICBnZXRUaHJlZURheXNGb3JlY2FzdERhdGEsXHJcbiAgICBnZXREZXNjcmlwdGlvbixcclxuICAgIGdldFdlYXRoZXJJbWFnZSxcclxuICAgIGdldEZvcmVjYXN0RGF0ZXMsXHJcbiAgICBtZWFuVGVtcFxyXG59IGZyb20gXCIuL2xpYlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVaSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvYmosIHVuaXRzKSB7XHJcbiAgICAgICAgdGhpcy5vYmogPSBvYmo7XHJcbiAgICAgICAgdGhpcy51bml0cyA9IHVuaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlVUkoKSB7XHJcbiAgICAgICAgLy8gcG9wdWxhdGUgdGVtcGVyYXR1cmUgbm93XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZVRlbXBlcmF0dXJlTm93KCk7XHJcbiAgICAgICAgLy8gcG9wdWxhdGUgaW5mbyBub3dcclxuICAgICAgICB0aGlzLnBvcHVsYXRlSW5mb05vdygpO1xyXG4gICAgICAgIC8vIHBvcHVsYXRlIG90aGVyIGluZm9zXHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU90aGVySW5mb3MoKTtcclxuICAgICAgICAvLyBwb3B1bGF0ZSBmb3JlY2FzdFxyXG4gICAgICAgIHRoaXMucG9wdWxhdGVGb3JlY2FzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlVGVtcGVyYXR1cmVOb3coKSB7XHJcbiAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcFwiKTtcclxuICAgICAgICBjb25zdCBmZWVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlbHMtbGlrZVwiKTtcclxuICAgICAgXHJcbiAgICAgICAgdGVtcC50ZXh0Q29udGVudCA9IGAke3RoaXMub2JqLmxpc3RbMF0ubWFpbi50ZW1wfSAke1xyXG4gICAgICAgICAgdW5pdHMgPT09IFwibWV0cmljXCIgPyBcIsKwQ1wiIDogXCLCsEZcIlxyXG4gICAgICAgIH1gO1xyXG4gICAgICBcclxuICAgICAgICBmZWVscy50ZXh0Q29udGVudCA9IGBmZWVscyBsaWtlICR7dGhpcy5vYmoubGlzdFswXS5tYWluLmZlZWxzX2xpa2V9ICR7XHJcbiAgICAgICAgICB0aGlzLnVuaXRzID09PSBcIm1ldHJpY1wiID8gXCLCsENcIiA6IFwiwrBGXCJcclxuICAgICAgICB9YDtcclxuICAgIH1cclxuXHJcbiAgICBwb3B1bGF0ZUluZm9Ob3coKSB7XHJcbiAgICAgICAgY29uc3QgZGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY1wiKTtcclxuICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tbm93ID4gaW1nXCIpO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGVcIik7XHJcbiAgICAgIFxyXG4gICAgICAgIGRlc2MudGV4dENvbnRlbnQgPSBgJHt0aGlzLm9iai5saXN0WzBdLndlYXRoZXJbMF0uZGVzY3JpcHRpb259YDtcclxuICAgICAgXHJcbiAgICAgICAgaW1nLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHt0aGlzLm9iai5saXN0WzBdLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYDtcclxuICAgICAgXHJcbiAgICAgICAgaW1nLmFsdCA9IGAke3RoaXMub2JqLmxpc3RbMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbn1gO1xyXG4gICAgICBcclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IGdldEN1cnJlbnRUaW1lT2ZDaXR5KHRoaXMub2JqKTtcclxuICAgICAgICBjb25zdCBkYXkgPVxyXG4gICAgICAgICAgY3VycmVudFRpbWUuZ2V0RGF0ZSgpIDwgMTBcclxuICAgICAgICAgICAgPyBgMCR7Y3VycmVudFRpbWUuZ2V0RGF0ZSgpfWBcclxuICAgICAgICAgICAgOiBjdXJyZW50VGltZS5nZXREYXRlKCk7XHJcbiAgICAgICAgY29uc3QgbW9udGhzID0gW1xyXG4gICAgICAgICAgXCJKYW51YXJ5XCIsXHJcbiAgICAgICAgICBcIkZlYnJ1YXJ5XCIsXHJcbiAgICAgICAgICBcIk1hcmNoXCIsXHJcbiAgICAgICAgICBcIkFwcmlsXCIsXHJcbiAgICAgICAgICBcIk1heVwiLFxyXG4gICAgICAgICAgXCJKdW5lXCIsXHJcbiAgICAgICAgICBcIkp1bHlcIixcclxuICAgICAgICAgIFwiQXVndXN0XCIsXHJcbiAgICAgICAgICBcIlNlcHRlbWJlclwiLFxyXG4gICAgICAgICAgXCJPY3RvYmVyXCIsXHJcbiAgICAgICAgICBcIk5vdmVtYmVyXCIsXHJcbiAgICAgICAgICBcIkRlY2VtYmVyXCIsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBtb250aCA9IG1vbnRoc1tjdXJyZW50VGltZS5nZXRNb250aCgpXTtcclxuICAgICAgICBjb25zdCBob3VyID1cclxuICAgICAgICAgIGN1cnJlbnRUaW1lLmdldEhvdXJzKCkgPCAxMFxyXG4gICAgICAgICAgICA/IGAwJHtjdXJyZW50VGltZS5nZXRIb3VycygpfWBcclxuICAgICAgICAgICAgOiBjdXJyZW50VGltZS5nZXRIb3VycygpO1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZSA9XHJcbiAgICAgICAgICBjdXJyZW50VGltZS5nZXRNaW51dGVzKCkgPCAxMFxyXG4gICAgICAgICAgICA/IGAwJHtjdXJyZW50VGltZS5nZXRNaW51dGVzKCl9YFxyXG4gICAgICAgICAgICA6IGN1cnJlbnRUaW1lLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICBkYXRlLnRleHRDb250ZW50ID0gYCR7ZGF5fSAke21vbnRofSAke2N1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCl9LCAke2hvdXJ9OiR7bWludXRlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcG9wdWxhdGVPdGhlckluZm9zKCkge1xyXG4gICAgICAgIGNvbnN0IHByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVzc3VyZVwiKTtcclxuICAgICAgICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIik7XHJcbiAgICAgICAgY29uc3QgY2xvdWRpbmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvdWRpbmVzc1wiKTtcclxuICAgICAgICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xyXG4gICAgICAgIGNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnJpc2VcIik7XHJcbiAgICAgICAgY29uc3Qgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5zZXRcIik7XHJcbiAgICAgIFxyXG4gICAgICAgIHByZXNzdXJlLnRleHRDb250ZW50ID0gYHByZXNzdXJlOiAke3RoaXMub2JqLmxpc3RbMF0ubWFpbi5wcmVzc3VyZX0gaFBhYDtcclxuICAgICAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBodW1pZGl0eTogJHt0aGlzLm9iai5saXN0WzBdLm1haW4uaHVtaWRpdHl9ICVgO1xyXG4gICAgICAgIGNsb3VkaW5lc3MudGV4dENvbnRlbnQgPSBgY2xvdWRpbmVzczogJHt0aGlzLm9iai5saXN0WzBdLmNsb3Vkcy5hbGx9ICVgO1xyXG4gICAgICAgIHdpbmQudGV4dENvbnRlbnQgPSBgd2luZCBzcGVlZDogJHt0aGlzLm9iai5saXN0WzBdLndpbmQuc3BlZWR9ICR7XHJcbiAgICAgICAgICAgIHRoaXMudW5pdHMgPT09IFwibWV0cmljXCIgPyBcIm1ldGVyL3NcIiA6IFwibWlsZXMvaFwiXHJcbiAgICAgICAgfWA7XHJcbiAgICAgIFxyXG4gICAgICAgIC8vIHJldHJpZXZlIHN1bnJpc2UgYW5kIHN1bnNldCBkYXRlIGFuZCBvbmx5IHVzZSBob3VycyBhbmQgbWludXRlc1xyXG4gICAgICAgIGNvbnN0IHN1bnJpc2VEYXRlID0gZ2V0U3VucmlzZSh0aGlzLm9iaik7XHJcbiAgICAgICAgY29uc3Qgc3VucmlzZUhvdXJzID1cclxuICAgICAgICAgIHN1bnJpc2VEYXRlLmdldEhvdXJzKCkgPCAxMFxyXG4gICAgICAgICAgICA/IGAwJHtzdW5yaXNlRGF0ZS5nZXRIb3VycygpfWBcclxuICAgICAgICAgICAgOiBzdW5yaXNlRGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgIGNvbnN0IHN1bnJpc2VNaW51dGVzID1cclxuICAgICAgICAgIHN1bnJpc2VEYXRlLmdldE1pbnV0ZXMoKSA8IDEwXHJcbiAgICAgICAgICAgID8gYDAke3N1bnJpc2VEYXRlLmdldE1pbnV0ZXMoKX1gXHJcbiAgICAgICAgICAgIDogc3VucmlzZURhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgIHN1bnJpc2UudGV4dENvbnRlbnQgPSBgc3VucmlzZTogJHtzdW5yaXNlSG91cnN9OiR7c3VucmlzZU1pbnV0ZXN9YDtcclxuICAgICAgXHJcbiAgICAgICAgY29uc3Qgc3Vuc2V0RGF0ZSA9IGdldFN1bnNldCh0aGlzLm9iaik7XHJcbiAgICAgICAgY29uc3Qgc3Vuc2V0SG91cnMgPVxyXG4gICAgICAgICAgc3Vuc2V0RGF0ZS5nZXRIb3VycygpIDwgMTBcclxuICAgICAgICAgICAgPyBgMCR7c3Vuc2V0RGF0ZS5nZXRIb3VycygpfWBcclxuICAgICAgICAgICAgOiBzdW5zZXREYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgY29uc3Qgc3Vuc2V0TWludXRlcyA9XHJcbiAgICAgICAgICBzdW5zZXREYXRlLmdldE1pbnV0ZXMoKSA8IDEwXHJcbiAgICAgICAgICAgID8gYDAke3N1bnNldERhdGUuZ2V0TWludXRlcygpfWBcclxuICAgICAgICAgICAgOiBzdW5zZXREYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICBzdW5zZXQudGV4dENvbnRlbnQgPSBgc3Vuc2V0OiAke3N1bnNldEhvdXJzfToke3N1bnNldE1pbnV0ZXN9YDtcclxuICAgIH1cclxuXHJcbiAgICBwb3B1bGF0ZUZvcmVjYXN0KCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGVQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlLWQtb25lXCIpO1xyXG4gICAgICAgIGNvbnN0IHRlbXBQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wLWQtb25lXCIpO1xyXG4gICAgICAgIGNvbnN0IGRlc2NQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjLWQtb25lXCIpO1xyXG4gICAgICAgIGNvbnN0IGltZ1BsdXNPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltZy1kLW9uZVwiKTtcclxuICAgICAgICBjb25zdCBkYXRlUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS1kLXR3b1wiKTtcclxuICAgICAgICBjb25zdCB0ZW1wUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcC1kLXR3b1wiKTtcclxuICAgICAgICBjb25zdCBkZXNjUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzYy1kLXR3b1wiKTtcclxuICAgICAgICBjb25zdCBpbWdQbHVzVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctZC10d29cIik7XHJcbiAgICAgICAgY29uc3QgZGF0ZVBsdXNUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS1kLXRocmVlXCIpO1xyXG4gICAgICAgIGNvbnN0IHRlbXBQbHVzVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtZC10aHJlZVwiKTtcclxuICAgICAgICBjb25zdCBkZXNjUGx1c1RocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjLWQtdGhyZWVcIik7XHJcbiAgICAgICAgY29uc3QgaW1nUGx1c1RocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctZC10aHJlZVwiKTtcclxuICAgICAgXHJcbiAgICAgICAgLy8gbGlzdCBvZiBtb250aHNcclxuICAgICAgICBjb25zdCBtb250aHMgPSBbXHJcbiAgICAgICAgICBcIkphbnVhcnlcIixcclxuICAgICAgICAgIFwiRmVicnVhcnlcIixcclxuICAgICAgICAgIFwiTWFyY2hcIixcclxuICAgICAgICAgIFwiQXByaWxcIixcclxuICAgICAgICAgIFwiTWF5XCIsXHJcbiAgICAgICAgICBcIkp1bmVcIixcclxuICAgICAgICAgIFwiSnVseVwiLFxyXG4gICAgICAgICAgXCJBdWd1c3RcIixcclxuICAgICAgICAgIFwiU2VwdGVtYmVyXCIsXHJcbiAgICAgICAgICBcIk9jdG9iZXJcIixcclxuICAgICAgICAgIFwiTm92ZW1iZXJcIixcclxuICAgICAgICAgIFwiRGVjZW1iZXJcIixcclxuICAgICAgICBdO1xyXG4gICAgICBcclxuICAgICAgICAvLyBnZXQgZGF0ZSsxLCBkYXRlKzIsIGRhdGUrMyBvYmplY3RzIHRoZW4gcG9wdWxhdGUgZm9yZWNhc3QgZGF0ZXMgd2l0aCB0aG9zZVxyXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0RGF0ZXMgPSBnZXRGb3JlY2FzdERhdGVzKHRoaXMub2JqKTtcclxuICAgICAgICBjb25zdCBkYXlPZkRheVBsdXNPbmUgPVxyXG4gICAgICAgICAgZm9yZWNhc3REYXRlcy5kUGx1c09uZS5nZXREYXRlKCkgPCAxMFxyXG4gICAgICAgICAgICA/IGAwJHtmb3JlY2FzdERhdGVzLmRQbHVzT25lLmdldERhdGUoKX1gXHJcbiAgICAgICAgICAgIDogZm9yZWNhc3REYXRlcy5kUGx1c09uZS5nZXREYXRlKCk7XHJcbiAgICAgICAgY29uc3QgbW9udGhPZkRheVBsdXNPbmUgPSBtb250aHNbZm9yZWNhc3REYXRlcy5kUGx1c09uZS5nZXRNb250aCgpXTtcclxuICAgICAgICBjb25zdCB5ZWFyT2ZEYXlQbHVzT25lID0gZm9yZWNhc3REYXRlcy5kUGx1c09uZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICBcclxuICAgICAgICBjb25zdCBkYXlPZkRheVBsdXNUd28gPVxyXG4gICAgICAgICAgZm9yZWNhc3REYXRlcy5kUGx1c1R3by5nZXREYXRlKCkgPCAxMFxyXG4gICAgICAgICAgICA/IGAwJHtmb3JlY2FzdERhdGVzLmRQbHVzVHdvLmdldERhdGUoKX1gXHJcbiAgICAgICAgICAgIDogZm9yZWNhc3REYXRlcy5kUGx1c1R3by5nZXREYXRlKCk7XHJcbiAgICAgICAgY29uc3QgbW9udGhPZkRheVBsdXNUd28gPSBtb250aHNbZm9yZWNhc3REYXRlcy5kUGx1c1R3by5nZXRNb250aCgpXTtcclxuICAgICAgICBjb25zdCB5ZWFyT2ZEYXlQbHVzVHdvID0gZm9yZWNhc3REYXRlcy5kUGx1c1R3by5nZXRGdWxsWWVhcigpO1xyXG4gICAgICBcclxuICAgICAgICBjb25zdCBkYXlPZkRheVBsdXNUaHJlZSA9XHJcbiAgICAgICAgICBmb3JlY2FzdERhdGVzLmRQbHVzVGhyZWUuZ2V0RGF0ZSgpIDwgMTBcclxuICAgICAgICAgICAgPyBgMCR7Zm9yZWNhc3REYXRlcy5kUGx1c1RocmVlLmdldERhdGUoKX1gXHJcbiAgICAgICAgICAgIDogZm9yZWNhc3REYXRlcy5kUGx1c1RocmVlLmdldERhdGUoKTtcclxuICAgICAgICBjb25zdCBtb250aE9mRGF5UGx1c1RocmVlID0gbW9udGhzW2ZvcmVjYXN0RGF0ZXMuZFBsdXNUaHJlZS5nZXRNb250aCgpXTtcclxuICAgICAgICBjb25zdCB5ZWFyT2ZEYXlQbHVzVGhyZWUgPSBmb3JlY2FzdERhdGVzLmRQbHVzVGhyZWUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgXHJcbiAgICAgICAgZGF0ZVBsdXNPbmUudGV4dENvbnRlbnQgPSBgJHtkYXlPZkRheVBsdXNPbmV9ICR7bW9udGhPZkRheVBsdXNPbmV9ICR7eWVhck9mRGF5UGx1c09uZX1gO1xyXG4gICAgICAgIGRhdGVQbHVzVHdvLnRleHRDb250ZW50ID0gYCR7ZGF5T2ZEYXlQbHVzVHdvfSAke21vbnRoT2ZEYXlQbHVzVHdvfSAke3llYXJPZkRheVBsdXNUd299YDtcclxuICAgICAgICBkYXRlUGx1c1RocmVlLnRleHRDb250ZW50ID0gYCR7ZGF5T2ZEYXlQbHVzVGhyZWV9ICR7bW9udGhPZkRheVBsdXNUaHJlZX0gJHt5ZWFyT2ZEYXlQbHVzVGhyZWV9YDtcclxuICAgICAgXHJcbiAgICAgICAgLy8gbWVhbiB0aGUgbWluIGFuZCBtYXggdGVtcCBvZiB0aGUgZGF5cyBwb3B1bGF0ZSB0ZW1wKzEsIHRlbXArMiwgdGVtcCszXHJcbiAgICAgICAgY29uc3QgdGhyZWVEYXlzRm9yZWNhc3REYXRhID0gZ2V0VGhyZWVEYXlzRm9yZWNhc3REYXRhKHRoaXMub2JqKTtcclxuICAgICAgICBjb25zdCBtZWFuVGVtcERheVBsdXNPbmUgPSBtZWFuVGVtcCh0aHJlZURheXNGb3JlY2FzdERhdGEuZGF5UGx1c09uZUZvcmVjYXN0KTtcclxuICAgICAgICBjb25zdCBtZWFuVGVtcERheVBsdXNUd28gPSBtZWFuVGVtcCh0aHJlZURheXNGb3JlY2FzdERhdGEuZGF5UGx1c1R3b0ZvcmVjYXN0KTtcclxuICAgICAgICBjb25zdCBtZWFuVGVtcERheVBsdXNUaHJlZSA9IG1lYW5UZW1wKFxyXG4gICAgICAgICAgdGhyZWVEYXlzRm9yZWNhc3REYXRhLmRheVBsdXNUaHJlZUZvcmVjYXN0LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGVtcFBsdXNPbmUudGV4dENvbnRlbnQgPSBgJHttZWFuVGVtcERheVBsdXNPbmV9ICR7XHJcbiAgICAgICAgICAgIHRoaXMudW5pdHMgPT09IFwibWV0cmljXCIgPyBcIsKwQ1wiIDogXCLCsEZcIlxyXG4gICAgICAgIH1gO1xyXG4gICAgICAgIHRlbXBQbHVzVHdvLnRleHRDb250ZW50ID0gYCR7bWVhblRlbXBEYXlQbHVzVHdvfSAke1xyXG4gICAgICAgICAgICB0aGlzLnVuaXRzID09PSBcIm1ldHJpY1wiID8gXCLCsENcIiA6IFwiwrBGXCJcclxuICAgICAgICB9YDtcclxuICAgICAgICB0ZW1wUGx1c1RocmVlLnRleHRDb250ZW50ID0gYCR7bWVhblRlbXBEYXlQbHVzVGhyZWV9ICR7XHJcbiAgICAgICAgICAgIHRoaXMudW5pdHMgPT09IFwibWV0cmljXCIgPyBcIsKwQ1wiIDogXCLCsEZcIlxyXG4gICAgICAgIH1gO1xyXG4gICAgICBcclxuICAgICAgICAvLyBmaW5kIHRoZSBtb3N0IG9jY3VyaW5nIGRlc2NyaXB0aW9uIGluIGEgZGF5IGFuZCBwb3B1bGF0ZSBkZXNjKzEsIGRlc2MrMiwgZGVzYyszIGFjY29yZGluZ2x5XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25EYXlQbHVzT25lID0gZ2V0RGVzY3JpcHRpb24oXHJcbiAgICAgICAgICB0aHJlZURheXNGb3JlY2FzdERhdGEuZGF5UGx1c09uZUZvcmVjYXN0LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25EYXlQbHVzVHdvID0gZ2V0RGVzY3JpcHRpb24oXHJcbiAgICAgICAgICB0aHJlZURheXNGb3JlY2FzdERhdGEuZGF5UGx1c1R3b0ZvcmVjYXN0LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25EYXlQbHVzVGhyZWUgPSBnZXREZXNjcmlwdGlvbihcclxuICAgICAgICAgIHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzVGhyZWVGb3JlY2FzdCxcclxuICAgICAgICApO1xyXG4gICAgICAgIGRlc2NQbHVzT25lLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb25EYXlQbHVzT25lO1xyXG4gICAgICAgIGRlc2NQbHVzVHdvLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb25EYXlQbHVzVHdvO1xyXG4gICAgICAgIGRlc2NQbHVzVGhyZWUudGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbkRheVBsdXNUaHJlZTtcclxuICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIGltZyB1cmwgYW5kIGFsdCBmb3IgZWFjaCBkZXNjcmlwdGlvblxyXG4gICAgICAgIGNvbnN0IGltZ09uZVVybCA9IGdldFdlYXRoZXJJbWFnZShcclxuICAgICAgICAgIGRlc2NyaXB0aW9uRGF5UGx1c09uZSxcclxuICAgICAgICAgIHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzT25lRm9yZWNhc3QsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBpbWdUd29VcmwgPSBnZXRXZWF0aGVySW1hZ2UoXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkRheVBsdXNUd28sXHJcbiAgICAgICAgICB0aHJlZURheXNGb3JlY2FzdERhdGEuZGF5UGx1c1R3b0ZvcmVjYXN0LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgaW1nVGhyZWVVcmwgPSBnZXRXZWF0aGVySW1hZ2UoXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkRheVBsdXNUaHJlZSxcclxuICAgICAgICAgIHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzVGhyZWVGb3JlY2FzdCxcclxuICAgICAgICApO1xyXG4gICAgICAgIGltZ1BsdXNPbmUuc3JjID0gaW1nT25lVXJsO1xyXG4gICAgICAgIGltZ1BsdXNPbmUuYWx0ID0gZGVzY3JpcHRpb25EYXlQbHVzT25lO1xyXG4gICAgICAgIGltZ1BsdXNUd28uc3JjID0gaW1nVHdvVXJsO1xyXG4gICAgICAgIGltZ1BsdXNUd28uYWx0ID0gZGVzY3JpcHRpb25EYXlQbHVzVHdvO1xyXG4gICAgICAgIGltZ1BsdXNUaHJlZS5zcmMgPSBpbWdUaHJlZVVybDtcclxuICAgICAgICBpbWdQbHVzVGhyZWUuYWx0ID0gZGVzY3JpcHRpb25EYXlQbHVzVGhyZWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rm9yZWNhc3RFbGVtZW50cygpIHtcclxuICAgICAgICBjb25zdCBkYXRlUGx1c09uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS1kLW9uZVwiKTtcclxuICAgICAgICBjb25zdCB0ZW1wUGx1c09uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcC1kLW9uZVwiKTtcclxuICAgICAgICBjb25zdCBkZXNjUGx1c09uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzYy1kLW9uZVwiKTtcclxuICAgICAgICBjb25zdCBpbWdQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWctZC1vbmVcIik7XHJcbiAgICAgICAgY29uc3QgZGF0ZVBsdXNUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGUtZC10d29cIik7XHJcbiAgICAgICAgY29uc3QgdGVtcFBsdXNUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtZC10d29cIik7XHJcbiAgICAgICAgY29uc3QgZGVzY1BsdXNUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2MtZC10d29cIik7XHJcbiAgICAgICAgY29uc3QgaW1nUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nLWQtdHdvXCIpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVQbHVzVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGUtZC10aHJlZVwiKTtcclxuICAgICAgICBjb25zdCB0ZW1wUGx1c1RocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wLWQtdGhyZWVcIik7XHJcbiAgICAgICAgY29uc3QgZGVzY1BsdXNUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzYy1kLXRocmVlXCIpO1xyXG4gICAgICAgIGNvbnN0IGltZ1BsdXNUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nLWQtdGhyZWVcIik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0ZVBsdXNPbmUsXHJcbiAgICAgICAgICAgIHRlbXBQbHVzT25lLFxyXG4gICAgICAgICAgICBkZXNjUGx1c09uZSxcclxuICAgICAgICAgICAgaW1nUGx1c09uZSxcclxuICAgICAgICAgICAgZGF0ZVBsdXNUd28sXHJcbiAgICAgICAgICAgIHRlbXBQbHVzVHdvLFxyXG4gICAgICAgICAgICBkZXNjUGx1c1R3byxcclxuICAgICAgICAgICAgaW1nUGx1c1R3byxcclxuICAgICAgICAgICAgZGF0ZVBsdXNUaHJlZSxcclxuICAgICAgICAgICAgdGVtcFBsdXNUaHJlZSxcclxuICAgICAgICAgICAgZGVzY1BsdXNUaHJlZSxcclxuICAgICAgICAgICAgaW1nUGx1c1RocmVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcG9wdWxhdGVDb3VudHJ5KG9iakNvdW50cnksIG9iakNpdHkpIHtcclxuICAgICAgICBjb25zdCBjb3VudHJ5ID0gb2JqQ291bnRyeS5maWx0ZXIoXHJcbiAgICAgICAgICAoY291bnRyeUluRGF0YSkgPT4gY291bnRyeUluRGF0YS5jY2EyID09PSBvYmpDaXR5WzBdLmNvdW50cnksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGNvdW50cnlbMF0ubmFtZS5jb21tb247XHJcbiAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvdW50cnlGbGFnID0gY291bnRyeVswXS5mbGFncztcclxuICAgICAgICBjb25zdCBjaXR5TmFtZSA9IG9iakNpdHlbMF0ubmFtZTtcclxuICAgICAgXHJcbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGNpdHkgYW5kIGNvdW50cnkgZWxlbWVudFxyXG4gICAgICAgIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktbmFtZVwiKTtcclxuICAgICAgICBjaXR5LmlubmVySFRNTCA9IGAke2NpdHlOYW1lfSwgPC9icj4gJHtjb3VudHJ5TmFtZX1gO1xyXG4gICAgICBcclxuICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgZmxhZyBpbWFnZSBhbmQgYWx0XHJcbiAgICAgICAgY29uc3QgZmxhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2l0eSA+IGltZ1wiKTtcclxuICAgICAgICBmbGFnLnNyYyA9IGNvdW50cnlGbGFnLnN2ZztcclxuICAgICAgICBmbGFnLmFsdCA9IGNvdW50cnlGbGFnLmFsdDtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVybCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm9wZW5XZWF0aGVyQmFzZVVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmdgO1xyXG4gICAgICAgIHRoaXMua2V5ID0gYDhkM2RkZjZmN2JiMDAzMTY3YjljMDFiODg4OTkzZWY0YDtcclxuICAgICAgICB0aGlzLnJlc3Rjb3VudHJpZXNCYXNlVXJsID0gYGh0dHBzOi8vcmVzdGNvdW50cmllcy5jb20vdjMuMS9uYW1lYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHZW9jb2RlVXJsKGNpdHlOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMub3BlbldlYXRoZXJCYXNlVXJsfS9nZW8vMS4wL2RpcmVjdD9hcHBpZD0ke3RoaXMua2V5fSZxPSR7Y2l0eU5hbWV9YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGb3JlY2FzdFVybChsYXRpdHVkZSwgbG9uZ2l0dWRlLCB1bml0cykge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLm9wZW5XZWF0aGVyQmFzZVVybH0vZGF0YS8yLjUvZm9yZWNhc3Q/YXBwaWQ9JHt0aGlzLmtleX0mbGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mdW5pdHM9JHt1bml0c30mY250PTQwYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXN0Y291bnRyaWVzVXJsKGNvdW50cnkpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5yZXN0Y291bnRyaWVzQmFzZVVybH0vJHtjb3VudHJ5fWA7XHJcbiAgICB9XHJcbn0iLCJmdW5jdGlvbiBnZXRDdXJyZW50VGltZU9mQ2l0eShvYmopIHtcclxuICAgIC8vIGNyZWF0ZSBEYXRlIG9iamVjdCBmb3IgY3VycmVudCBsb2NhdGlvblxyXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIFxyXG4gICAgLy8gY29udmVydCB0byBtaWxsaXNlY29uZHMsIGFkZCBsb2NhbCB0aW1lIHpvbmUgb2Zmc2V0IGFuZCBnZXQgVVRDIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbiAgICBjb25zdCB1dGNUaW1lID1cclxuICAgICAgY3VycmVudERhdGUuZ2V0VGltZSgpICsgY3VycmVudERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xyXG4gIFxyXG4gICAgLy8gdXRjIG9mZnNldCBvZiB0aGUgY2l0eVxyXG4gICAgY29uc3QgeyB0aW1lem9uZSB9ID0gb2JqLmNpdHk7XHJcbiAgICBjb25zdCBvZmZzZXRDaXR5ID0gdGltZXpvbmUgKiAxMDAwO1xyXG4gIFxyXG4gICAgLy8gY3JlYXRlIG5ldyBEYXRlIG9iamVjdCBmb3IgYSBkaWZmZXJlbnQgdGltZXpvbmUgdXNpbmcgc3VwcGxpZWQgaXRzIEdNVCBvZmZzZXQuXHJcbiAgICBjb25zdCBjdXJyZW50RGF0ZUFuZFRpbWVJbkNpdHkgPSBuZXcgRGF0ZSh1dGNUaW1lICsgb2Zmc2V0Q2l0eSk7XHJcbiAgICByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lSW5DaXR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdW5yaXNlKG9iaikge1xyXG4gICAgLy8gY2l0eSBzdW5yaXNlXHJcbiAgICBjb25zdCB7IHN1bnJpc2UgfSA9IG9iai5jaXR5O1xyXG4gIFxyXG4gICAgLy8gdXRjIG9mZnNldCBvZiBjdXJyZW50IGxvY2F0aW9uXHJcbiAgICBjb25zdCBvZmZzZXRDdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDA7XHJcbiAgXHJcbiAgICAvLyB1dGMgb2Zmc2V0IG9mIHRoZSBjaXR5XHJcbiAgICBjb25zdCB7IHRpbWV6b25lIH0gPSBvYmouY2l0eTtcclxuICAgIGNvbnN0IG9mZnNldENpdHkgPSB0aW1lem9uZSAqIDEwMDA7XHJcbiAgXHJcbiAgICAvLyB0b3RhbCBvZmZzZXQgZnJvbSBjdXJyZW50IGxvY2F0aW9uXHJcbiAgICBjb25zdCB0b3RhbE9mZnNldCA9IG9mZnNldENpdHkgKyBvZmZzZXRDdXJyZW50O1xyXG4gIFxyXG4gICAgLy8gc3VucmlzZSBkYXRlLCByZWxhdGl2ZSB0byB0aGUgY2l0eSB0aW1lXHJcbiAgICBjb25zdCBzdW5yaXNlRGF0ZSA9IG5ldyBEYXRlKHN1bnJpc2UgKiAxMDAwICsgdG90YWxPZmZzZXQpO1xyXG4gICAgcmV0dXJuIHN1bnJpc2VEYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdW5zZXQob2JqKSB7XHJcbiAgICAvLyBjaXR5IHN1bnJpc2VcclxuICAgIGNvbnN0IHsgc3Vuc2V0IH0gPSBvYmouY2l0eTtcclxuICBcclxuICAgIC8vIHV0YyBvZmZzZXQgb2YgY3VycmVudCBsb2NhdGlvblxyXG4gICAgY29uc3Qgb2Zmc2V0Q3VycmVudCA9IG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xyXG4gIFxyXG4gICAgLy8gdXRjIG9mZnNldCBvZiB0aGUgY2l0eVxyXG4gICAgY29uc3QgeyB0aW1lem9uZSB9ID0gb2JqLmNpdHk7XHJcbiAgICBjb25zdCBvZmZzZXRDaXR5ID0gdGltZXpvbmUgKiAxMDAwO1xyXG4gIFxyXG4gICAgLy8gdG90YWwgb2Zmc2V0IGZyb20gY3VycmVudCBsb2NhdGlvblxyXG4gICAgY29uc3QgdG90YWxPZmZzZXQgPSBvZmZzZXRDaXR5ICsgb2Zmc2V0Q3VycmVudDtcclxuICBcclxuICAgIC8vIHN1bnJpc2UgZGF0ZSwgcmVsYXRpdmUgdG8gdGhlIGNpdHkgdGltZVxyXG4gICAgY29uc3Qgc3Vuc2V0RGF0ZSA9IG5ldyBEYXRlKHN1bnNldCAqIDEwMDAgKyB0b3RhbE9mZnNldCk7XHJcbiAgICByZXR1cm4gc3Vuc2V0RGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGhyZWVEYXlzRm9yZWNhc3REYXRhKG9iaikge1xyXG4gICAgLy8gcmV0dXJuIG9ubHkgdGhlIGRhdGEgb2YgdGhlIDMgbmV4dCBkYXlzXHJcbiAgXHJcbiAgICAvLyBmaXJzdCBlbGVtZW50IGlzIHRoZSBpbnRlcnZhbCAoMyBob3Vycykgbm93LCBzZWNvbmQgZWxlbWVudCBpcyB0aGUgaW5kZXggdG8gcmVtb3ZlXHJcbiAgICBjb25zdCBtYXBFbGVtZW50c1RvUmVtb3ZlID0gW1xyXG4gICAgICBbXCIwMFwiLCA3XSxcclxuICAgICAgW1wiMDNcIiwgNl0sXHJcbiAgICAgIFtcIjA2XCIsIDVdLFxyXG4gICAgICBbXCIwOVwiLCA0XSxcclxuICAgICAgW1wiMTJcIiwgM10sXHJcbiAgICAgIFtcIjE1XCIsIDJdLFxyXG4gICAgICBbXCIxOFwiLCAxXSxcclxuICAgICAgW1wiMjFcIiwgMF0sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgaW50ZXJ2YWxOb3cgPSBvYmoubGlzdFswXS5kdF90eHQ7XHJcbiAgICBjb25zdCBpbnRlcnZhbE5vd1N0cmluZyA9IGludGVydmFsTm93WzExXSArIGludGVydmFsTm93WzEyXTtcclxuICBcclxuICAgIGNvbnN0IG51bWJlck9mRWxlbWVudCA9IG1hcEVsZW1lbnRzVG9SZW1vdmUuZmlsdGVyKFxyXG4gICAgICAoZWxlbSkgPT4gZWxlbVswXSA9PT0gaW50ZXJ2YWxOb3dTdHJpbmcsXHJcbiAgICApO1xyXG4gIFxyXG4gICAgY29uc3QgaW5kZXhUb1JlbW92ZSA9IG51bWJlck9mRWxlbWVudFswXVsxXTtcclxuICBcclxuICAgIGNvbnN0IG5ld0FycmF5ID0gb2JqLmxpc3QuZmlsdGVyKChlbGVtZW50LCBpbmRleCkgPT4gaW5kZXggPiBpbmRleFRvUmVtb3ZlKTtcclxuICBcclxuICAgIC8vIGRheSsxIGRheSsyIGRheSszIGRhdGFzXHJcbiAgICBjb25zdCBkYXlQbHVzT25lRm9yZWNhc3QgPSBuZXdBcnJheS5maWx0ZXIoKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA8PSA3KTtcclxuICAgIGNvbnN0IGRheVBsdXNUd29Gb3JlY2FzdCA9IG5ld0FycmF5LmZpbHRlcihcclxuICAgICAgKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA+PSA4ICYmIGluZGV4IDw9IDE1LFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGRheVBsdXNUaHJlZUZvcmVjYXN0ID0gbmV3QXJyYXkuZmlsdGVyKFxyXG4gICAgICAoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4ID49IDE2ICYmIGluZGV4IDw9IDIzLFxyXG4gICAgKTtcclxuICBcclxuICAgIHJldHVybiB7IGRheVBsdXNPbmVGb3JlY2FzdCwgZGF5UGx1c1R3b0ZvcmVjYXN0LCBkYXlQbHVzVGhyZWVGb3JlY2FzdCB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXNjcmlwdGlvbihvYmopIHtcclxuICAgIC8vIGZpbmQgYW5kIHJldHVybiB0aGUgbW9zdCBvY2N1cmluZyB3ZWF0aGVyIGRlc2NyaXB0aW9uIGluIGEgZGF5XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbnMgPSBvYmoubWFwKChlbGVtZW50KSA9PiBlbGVtZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb24pO1xyXG4gIFxyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Db3VudHMgPSB7fTtcclxuICAgIGRlc2NyaXB0aW9ucy5mb3JFYWNoKChkZXNjcmlwdGlvbikgPT4ge1xyXG4gICAgICBpZiAoZGVzY3JpcHRpb25Db3VudHNbZGVzY3JpcHRpb25dKSB7XHJcbiAgICAgICAgZGVzY3JpcHRpb25Db3VudHNbZGVzY3JpcHRpb25dKys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVzY3JpcHRpb25Db3VudHNbZGVzY3JpcHRpb25dID0gMTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgXHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbkNvdW50c0FycmF5ID0gT2JqZWN0LmVudHJpZXMoZGVzY3JpcHRpb25Db3VudHMpO1xyXG4gICAgZGVzY3JpcHRpb25Db3VudHNBcnJheS5zb3J0KChhLCBiKSA9PiBiWzFdIC0gYVsxXSk7XHJcbiAgICByZXR1cm4gZGVzY3JpcHRpb25Db3VudHNBcnJheVswXVswXTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWVhblRlbXAob2JqKSB7XHJcbiAgICAvLyBzb3J0IHRoZSBhcnJheSBieSB0ZW1wIGFuZCBtZWFuIHRoZSBmaXJzdCBhbmQgbGFzdCB0ZW1wZXJhdHVyZVxyXG4gICAgY29uc3Qgc29ydGVkQXJyYXkgPSBvYmouc29ydCgoYSwgYikgPT4gYS5tYWluLnRlbXAgLSBiLm1haW4udGVtcCk7XHJcbiAgICBjb25zdCBtZWFuVGVtcGVyYXR1cmUgPVxyXG4gICAgICAoc29ydGVkQXJyYXlbMF0ubWFpbi50ZW1wICsgc29ydGVkQXJyYXlbN10ubWFpbi50ZW1wKSAvIDI7XHJcbiAgXHJcbiAgICByZXR1cm4gbWVhblRlbXBlcmF0dXJlLnRvRml4ZWQoMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFdlYXRoZXJJbWFnZShkZXNjcmlwdGlvbiwgb2JqKSB7XHJcbiAgICAvLyBmaW5kIGFuIGVsZW1lbnQgb2YgdGhlIGFycmF5IHdpdGggdGhlIHNhbWUgZGVzY3JpcHRpb24gYW5kIHJldHVybiB0aGUgaWNvblxyXG4gICAgY29uc3QgYXJyID0gb2JqLmZpbmQoXHJcbiAgICAgIChlbGVtZW50KSA9PiBlbGVtZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb24gPT09IGRlc2NyaXB0aW9uLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IHVybCA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHthcnIud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xyXG4gICAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Rm9yZWNhc3REYXRlcyhvYmopIHtcclxuICAvLyBjcmVhdGUgRGF0ZSBvYmplY3QgZm9yIGN1cnJlbnQgbG9jYXRpb25cclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIC8vIGNvbnZlcnQgdG8gbWlsbGlzZWNvbmRzLCBhZGQgbG9jYWwgdGltZSB6b25lIG9mZnNldCBhbmQgZ2V0IFVUQyB0aW1lIGluIG1pbGxpc2Vjb25kc1xyXG4gIGNvbnN0IHV0Y1RpbWUgPVxyXG4gICAgY3VycmVudERhdGUuZ2V0VGltZSgpICsgY3VycmVudERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xyXG5cclxuICAvLyB1dGMgb2Zmc2V0IG9mIHRoZSBjaXR5XHJcbiAgY29uc3QgeyB0aW1lem9uZSB9ID0gb2JqLmNpdHk7XHJcbiAgY29uc3Qgb2Zmc2V0Q2l0eSA9IHRpbWV6b25lICogMTAwMDtcclxuXHJcbiAgLy8gY3VycmVudCBkYXRlICsxIGRheSAoODY0MDAwMDAgbWlsbGlzZWNvbmRzKVxyXG4gIGNvbnN0IGRQbHVzT25lID0gbmV3IERhdGUodXRjVGltZSArIG9mZnNldENpdHkgKyA4NjQwMDAwMCk7XHJcblxyXG4gIC8vIGN1cnJlbnQgZGF0ZSArMiBkYXlzICgxNzI4MDAwMDAgbWlsbGlzZWNvbmRzKVxyXG4gIGNvbnN0IGRQbHVzVHdvID0gbmV3IERhdGUodXRjVGltZSArIG9mZnNldENpdHkgKyAxNzI4MDAwMDApO1xyXG5cclxuICAvLyBjdXJyZW50IGRhdGUgKzMgZGF5cyAoMjU5MjAwMDAwIG1pbGxpc2Vjb25kcylcclxuICBjb25zdCBkUGx1c1RocmVlID0gbmV3IERhdGUodXRjVGltZSArIG9mZnNldENpdHkgKyAyNTkyMDAwMDApO1xyXG5cclxuICByZXR1cm4geyBkUGx1c09uZSwgZFBsdXNUd28sIGRQbHVzVGhyZWUgfTtcclxuICAvLyByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lSW5DaXR5O1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgZ2V0Q3VycmVudFRpbWVPZkNpdHksXHJcbiAgICBnZXRTdW5yaXNlLFxyXG4gICAgZ2V0U3Vuc2V0LFxyXG4gICAgZ2V0VGhyZWVEYXlzRm9yZWNhc3REYXRhLFxyXG4gICAgZ2V0RGVzY3JpcHRpb24sXHJcbiAgICBnZXRXZWF0aGVySW1hZ2UsXHJcbiAgICBnZXRGb3JlY2FzdERhdGVzLFxyXG4gICAgbWVhblRlbXBcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVybCBmcm9tIFwiLi9VcmxcIjtcclxuaW1wb3J0IFVpIGZyb20gXCIuL1VpXCI7XHJcblxyXG4vLyByZXRyaWV2ZSBpbnB1dCBlbGVtZW50c1xyXG5jb25zdCBjaXR5SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktaW5wdXRcIik7XHJcbmNvbnN0IHVuaXRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidW5pdHNcIik7XHJcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWJ1dHRvblwiKTtcclxuXHJcbi8vIGZldGNoIGNpdHkgZGF0YVxyXG5hc3luYyBmdW5jdGlvbiBnZW9Db2RlQ2l0eShuYW1lKSB7XHJcbiAgY29uc3QgdXJsID0gbmV3IFVybCgpO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICB1cmwuZ2V0R2VvY29kZVVybChuYW1lKSxcclxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9LFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGNpdHlEYXRhO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRDb3VudHJ5TmFtZShjb3VudHJ5KSB7XHJcbiAgY29uc3QgdXJsID0gbmV3IFVybCgpO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb3VudHJ5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgdXJsLmdldFJlc3Rjb3VudHJpZXNVcmwoY291bnRyeSksXHJcbiAgICAgIHsgbW9kZTogXCJjb3JzXCJ9XHJcbiAgICApO1xyXG4gICAgY29uc3QgY291bnRyeURhdGEgPSBhd2FpdCBjb3VudHJ5UmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGNvdW50cnlEYXRhO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBnZXQgdGhlIGZvcmVjYXN0XHJcbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxhdGl0dWRlLCBsb25naXR1ZGUsIHVuaXRzKSB7XHJcbiAgY29uc3QgdXJsID0gbmV3IFVybCgpO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICB1cmwuZ2V0Rm9yZWNhc3RVcmwobGF0aXR1ZGUsIGxvbmdpdHVkZSwgdW5pdHMpLFxyXG4gICAgICB7IG1vZGU6IFwiY29yc1wiIH0sXHJcbiAgICApO1xyXG4gICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGZvcmVjYXN0RGF0YTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8vIGZldGNoIGZvcmVjYXN0IGRhdGFcclxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3REYXRhKG5hbWUsIHVuaXRzKSB7XHJcbiAgY29uc3QgY2l0eURhdGEgPSBhd2FpdCBnZW9Db2RlQ2l0eShuYW1lKTtcclxuICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChjaXR5RGF0YVswXS5sYXQsIGNpdHlEYXRhWzBdLmxvbiwgdW5pdHMpXHJcblxyXG4gIHJldHVybiBmb3JlY2FzdERhdGE7XHJcbn1cclxuXHJcbi8vIGRlZmF1bHQ6IG9zYWthIC0gbWV0cmljXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgY29uc3QgZGVmYXVsdENpdHlOYW1lID0gXCJvc2FrYVwiO1xyXG4gIGNvbnN0IGRlZmF1bHRVbml0cyA9IFwibWV0cmljXCI7XHJcbiAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3REYXRhKGRlZmF1bHRDaXR5TmFtZSwgZGVmYXVsdFVuaXRzKTtcclxuICBjb25zdCB1aSA9IG5ldyBVaShmb3JlY2FzdERhdGEsIHVuaXRzKTtcclxuICB1aS5wb3B1bGF0ZVVJKCk7XHJcbiBcclxuICBjb25zdCBjaXR5RGF0YSA9IGF3YWl0IGdlb0NvZGVDaXR5KGRlZmF1bHRDaXR5TmFtZSk7XHJcbiAgY29uc3QgY291bnRyeURhdGEgPSBhd2FpdCBnZXRDb3VudHJ5TmFtZShjaXR5RGF0YVswXS5jb3VudHJ5KTtcclxuICBVaS5wb3B1bGF0ZUNvdW50cnkoY291bnRyeURhdGEsIGNpdHlEYXRhKTtcclxufVxyXG5cclxuLy8gc2VhcmNoIGJ1dHRvbiBldmVudCBoYW5kbGVyXHJcbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBjaXR5TmFtZSA9IGNpdHlJbnB1dC52YWx1ZTtcclxuICAgIGNvbnN0IHVuaXRzID0gdW5pdElucHV0LnZhbHVlO1xyXG4gIGlmIChjaXR5TmFtZSkge1xyXG4gICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3REYXRhKGNpdHlOYW1lLCB1bml0cyk7XHJcbiAgICBjb25zdCB1aSA9IG5ldyBVaShmb3JlY2FzdERhdGEsIHVuaXRzKTtcclxuICAgIHVpLnBvcHVsYXRlVUkoKTtcclxuXHJcbiAgICBjb25zdCBjaXR5RGF0YSA9IGF3YWl0IGdlb0NvZGVDaXR5KGNpdHlOYW1lKTtcclxuICAgIGNvbnN0IGNvdW50cnlEYXRhID0gYXdhaXQgZ2V0Q291bnRyeU5hbWUoY2l0eURhdGFbMF0uY291bnRyeSk7XHJcbiAgICBVaS5wb3B1bGF0ZUNvdW50cnkoY291bnRyeURhdGEsIGNpdHlEYXRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5pbml0aWFsaXplKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9