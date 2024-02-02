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
        console.log(cityName, units);
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
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${key}`, { mode : 'cors' });
        const cityData = await response.json();
        return cityData;        
    } catch (error) {
        console.log(error);
    }
}

// fetch forecast data
async function getForecastData(name, key, units) {
    const cityData = await geoCodeCity(name, key);
    console.log(cityData);
    

    // to get the country name
    try {
        const countryResponse = await fetch( `https://restcountries.com/v3.1/name/${cityData[0].country}`, { mode : "cors" })
        const countryData = await countryResponse.json();
        console.log(countryData)
        populateCountry(countryData, cityData)    
    } catch (error) {
        console.log(error);
    }
    
    // to get the forecast
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=${key}&units=${units}&cnt=40`, { mode : 'cors' });
        const forecastData = await response.json();
        console.log(forecastData);
        populateUI(forecastData, units);        
    } catch (error) {
        console.log(error);
    }

}




// UI
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

function populateTemperatureNow(obj, units) {
    const temp = document.querySelector(".temp");
    const feels = document.querySelector(".feels-like");

    temp.textContent = `${obj.list[0].main.temp} ${units === "metric" ? "°C" : "°F"}`;

    feels.textContent = `feels like ${obj.list[0].main.feels_like} ${units === "metric" ? "°C" : "°F"}`;
}

function  populateInfoNow(obj, units) {
    const desc = document.querySelector(".desc");
    const img = document.querySelector(".info-now > img");
    const date = document.querySelector(".date");

    desc.textContent = `${obj.list[0].weather[0].description}`;

    img.src = `https://openweathermap.org/img/wn/${obj.list[0].weather[0].icon}@2x.png`;

    img.alt = `${obj.list[0].weather[0].main}`;


    const currentTime = getCurrentTimeOfCity(obj);
    const day = currentTime.getDate() < 10 ? `0${currentTime.getDate()}`: currentTime.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[currentTime.getMonth()];
    const hour = currentTime.getHours() < 10 ? `0${currentTime.getHours()}`: currentTime.getHours();
    const minute = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}`: currentTime.getMinutes();
    date.textContent = `${day} ${month} ${currentTime.getFullYear()}, ${hour}:${minute}`;
}

function getCurrentTimeOfCity(obj) {
        // create Date object for current location
        const currentDate = new Date();

        // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
        const utcTime = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);

        // utc offset of the city
        const {timezone} = obj.city;
        const offsetCity = timezone * 1000;

        // create new Date object for a different timezone using supplied its GMT offset.
        const currentDateAndTimeInCity = new Date(utcTime + offsetCity);
        return currentDateAndTimeInCity;
}

function getForecastDates(obj) {
            // create Date object for current location
            const currentDate = new Date();

            // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
            const utcTime = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
    
            // utc offset of the city
            const {timezone} = obj.city;
            const offsetCity = timezone * 1000;
    
            // current date +1 day (86400000 milliseconds)
            const dPlusOne = new Date(utcTime + offsetCity + 86400000);

            // current date +2 days (172800000 milliseconds)
            const dPlusTwo = new Date(utcTime + offsetCity + 172800000);

            // current date +3 days (259200000 milliseconds)
            const dPlusThree = new Date(utcTime + offsetCity + 259200000);

            return {dPlusOne, dPlusTwo, dPlusThree}
            // return currentDateAndTimeInCity;
}

function getSunrise(obj) {
    // city sunrise
    const {sunrise} = obj.city;

    // utc offset of current location 
    const offsetCurrent = new Date().getTimezoneOffset() * 60000;

    // utc offset of the city
    const {timezone} = obj.city;
    const offsetCity = timezone * 1000;

    // total offset from current location
    const totalOffset = offsetCity + offsetCurrent;

    // sunrise date, relative to the city time
    const sunriseDate = new Date((sunrise*1000) + totalOffset);
    return sunriseDate;
}

function getSunset(obj) {
    // city sunrise
    const {sunset} = obj.city;

    // utc offset of current location 
    const offsetCurrent = new Date().getTimezoneOffset() * 60000;

    // utc offset of the city
    const {timezone} = obj.city;
    const offsetCity = timezone * 1000;

    // total offset from current location
    const totalOffset = offsetCity + offsetCurrent;

    // sunrise date, relative to the city time
    const sunsetDate = new Date((sunset*1000) + totalOffset);
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
        ["21", 0]
    ];
    const intervalNow = obj.list[0].dt_txt;
    const intervalNowString = intervalNow[11] + intervalNow[12];

    const numberOfElement = mapElementsToRemove.filter((elem) => elem[0] === intervalNowString)

    const indexToRemove = numberOfElement[0][1];

    const newArray = obj.list.filter((element,index) => index > indexToRemove);

    // day+1 day+2 day+3 datas
    const dayPlusOneForecast = newArray.filter((element, index) => index <= 7);
    const dayPlusTwoForecast = newArray.filter((element, index) => index >= 8 && index <= 15);
    const dayPlusThreeForecast = newArray.filter((element, index) => index >= 16 && index <= 23);
    
    return {dayPlusOneForecast, dayPlusTwoForecast, dayPlusThreeForecast};
}

function meanTemp(obj) {
    // sort the array by temp and mean the first and last temperature
    const sortedArray = obj.sort((a,b) => a.main.temp - b.main.temp)
    const meanTemperature = (sortedArray[0].main.temp + sortedArray[7].main.temp)/2;

    return meanTemperature.toFixed(2);
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
    wind.textContent = `wind speed: ${obj.list[0].wind.speed} ${units === "metric" ? "meter/s" : "miles/h"}`;

    // retrieve sunrise and sunset date and only use hours and minutes
    const sunriseDate = getSunrise(obj);
    const sunriseHours = sunriseDate.getHours() < 10 ? `0${sunriseDate.getHours()}`: sunriseDate.getHours();
    const sunriseMinutes = sunriseDate.getMinutes() < 10 ? `0${sunriseDate.getMinutes()}`: sunriseDate.getMinutes();
    sunrise.textContent = `sunrise: ${sunriseHours  }:${  sunriseMinutes}`;

    const sunsetDate = getSunset(obj);
    const sunsetHours = sunsetDate.getHours() < 10 ? `0${sunsetDate.getHours()}`: sunsetDate.getHours();
    const sunsetMinutes = sunsetDate.getMinutes() < 10 ? `0${sunsetDate.getMinutes()}`: sunsetDate.getMinutes();
    sunset.textContent = `sunset: ${sunsetHours  }:${  sunsetMinutes}`;
}

function populateForecast(obj, units) {
    const datePlusOne = document.querySelector(".date-d-one");
    const tempPlusOne = document.querySelector(".temp-d-one");
    const descPlusOne = document.querySelector(".desc-d-one");
    const datePlusTwo = document.querySelector(".date-d-two");
    const tempPlusTwo = document.querySelector(".temp-d-two");
    const descPlusTwo = document.querySelector(".desc-d-two");
    const datePlusThree = document.querySelector(".date-d-three");
    const tempPlusThree = document.querySelector(".temp-d-three");
    const descPlusThree = document.querySelector(".desc-d-three");

    // list of months
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // get date+1, date+2, date+3 objects then populate forecast dates with those
    const forecastDates = getForecastDates(obj);
    const dayOfDayPlusOne = forecastDates.dPlusOne.getDate() < 10 ? `0${forecastDates.dPlusOne.getDate()}`: forecastDates.dPlusOne.getDate();
    const monthOfDayPlusOne = months[forecastDates.dPlusOne.getMonth()];
    const yearOfDayPlusOne = forecastDates.dPlusOne.getFullYear();

    const dayOfDayPlusTwo = forecastDates.dPlusTwo.getDate() < 10 ? `0${forecastDates.dPlusTwo.getDate()}`: forecastDates.dPlusTwo.getDate();
    const monthOfDayPlusTwo = months[forecastDates.dPlusTwo.getMonth()];
    const yearOfDayPlusTwo = forecastDates.dPlusTwo.getFullYear();

    const dayOfDayPlusThree = forecastDates.dPlusThree.getDate() < 10 ? `0${forecastDates.dPlusThree.getDate()}`: forecastDates.dPlusThree.getDate();
    const monthOfDayPlusThree = months[forecastDates.dPlusThree.getMonth()];
    const yearOfDayPlusThree = forecastDates.dPlusThree.getFullYear();
    
    datePlusOne.textContent = `${dayOfDayPlusOne} ${monthOfDayPlusOne} ${yearOfDayPlusOne}`;
    datePlusTwo.textContent = `${dayOfDayPlusTwo} ${monthOfDayPlusTwo} ${yearOfDayPlusTwo}`;
    datePlusThree.textContent = `${dayOfDayPlusThree} ${monthOfDayPlusThree} ${yearOfDayPlusThree}`;
    
    // mean the min and max temp of the days populate temp+1, temp+2, temp+3
    const threeDaysForecastData = getThreeDaysForecastData(obj);
    const meanTempDayPlusOne = meanTemp(threeDaysForecastData.dayPlusOneForecast);
    const meanTempDayPlusTwo = meanTemp(threeDaysForecastData.dayPlusTwoForecast);
    const meanTempDayPlusThree = meanTemp(threeDaysForecastData.dayPlusThreeForecast);
    console.log(meanTempDayPlusOne, meanTempDayPlusTwo, meanTempDayPlusThree);

    tempPlusOne.textContent = `${meanTempDayPlusOne} ${units === "metric" ? '°C' : '°F'}`;
    tempPlusTwo.textContent = `${meanTempDayPlusTwo} ${units === "metric" ? '°C' : '°F'}`;
    tempPlusThree.textContent = `${meanTempDayPlusThree} ${units === "metric" ? '°C' : '°F'}`;

    // to do: populate desc+1, desc+2, desc+3
    /// //////
}

function populateCountry(objCountry, objCity) {

    const country = objCountry.filter((countryInData) => countryInData.cca2 === objCity[0].country)
    const countryName = country[0].name.common;

    const countryFlag = country[0].flags;
    const cityName = objCity[0].name;

    // populate the city and country element
    const city = document.querySelector(".city-name")
    city.innerHTML = `${cityName}, </br> ${countryName}`;

    // populate the flag image and alt
    const flag = document.querySelector(".city > img");
    flag.src = countryFlag.svg;
    flag.alt = countryFlag.alt;
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3hGLHNDQUFzQyxlQUFlLEtBQUssZUFBZTtBQUN6RTtBQUNBO0FBQ0EseURBQXlELHNCQUFzQjtBQUMvRSw2REFBNkQsd0JBQXdCO0FBQ3JGLG9DQUFvQyxjQUFjLEtBQUssY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsaUNBQWlDO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxpQ0FBaUM7QUFDekc7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLG1DQUFtQztBQUMvRztBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCO0FBQzFGLGlDQUFpQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUI7QUFDMUYsbUNBQW1DLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLG1CQUFtQjtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG9CQUFvQixFQUFFLGlDQUFpQztBQUN4RixpQ0FBaUMsb0JBQW9CLEVBQUUsaUNBQWlDO0FBQ3hGLG1DQUFtQyxzQkFBc0IsRUFBRSxpQ0FBaUM7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVMsVUFBVSxZQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay12YW5pbGxhLWpzLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBjaXR5TmFtZSA9IFwiXCI7IFxyXG5sZXQgdW5pdHMgPSBcIlwiO1xyXG5cclxuLy8gd2VhdGhlciBBUEkga2V5XHJcbmNvbnN0IEtFWSA9IFwiOGQzZGRmNmY3YmIwMDMxNjdiOWMwMWI4ODg5OTNlZjRcIjtcclxuXHJcbi8vIHJldHJpZXZlIHNlYXJjaCBlbGVtZW50c1xyXG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS1pbnB1dFwiKTtcclxuY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYnV0dG9uXCIpO1xyXG5jb25zdCBzd2l0Y2hVbml0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidW5pdHNcIik7XHJcblxyXG4vLyBzZWFyY2ggYnV0dG9uIGV2ZW50IGhhbmRsZXJcclxuc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKGlucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgY2l0eU5hbWUgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICB1bml0cyA9IHN3aXRjaFVuaXRzLnZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNpdHlOYW1lLCB1bml0cyk7XHJcbiAgICAgICAgZ2V0Rm9yZWNhc3REYXRhKGNpdHlOYW1lLCBLRVksIHVuaXRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2V0Rm9yZWNhc3REYXRhKFwib3Nha2FcIiwgS0VZLCBcIm1ldHJpY1wiKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuLy8gZGVmYXVsdDogb3Nha2EgLSBtZXRyaWNcclxuZ2V0Rm9yZWNhc3REYXRhKFwib3Nha2FcIiwgS0VZLCBcIm1ldHJpY1wiKTtcclxuXHJcbi8vIGZldGNoIGNpdHkgZGF0YVxyXG5hc3luYyBmdW5jdGlvbiBnZW9Db2RlQ2l0eShuYW1lLCBrZXkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtuYW1lfSZhcHBpZD0ke2tleX1gLCB7IG1vZGUgOiAnY29ycycgfSk7XHJcbiAgICAgICAgY29uc3QgY2l0eURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGNpdHlEYXRhOyAgICAgICAgXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gZmV0Y2ggZm9yZWNhc3QgZGF0YVxyXG5hc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdERhdGEobmFtZSwga2V5LCB1bml0cykge1xyXG4gICAgY29uc3QgY2l0eURhdGEgPSBhd2FpdCBnZW9Db2RlQ2l0eShuYW1lLCBrZXkpO1xyXG4gICAgY29uc29sZS5sb2coY2l0eURhdGEpO1xyXG4gICAgXHJcblxyXG4gICAgLy8gdG8gZ2V0IHRoZSBjb3VudHJ5IG5hbWVcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgY291bnRyeVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goIGBodHRwczovL3Jlc3Rjb3VudHJpZXMuY29tL3YzLjEvbmFtZS8ke2NpdHlEYXRhWzBdLmNvdW50cnl9YCwgeyBtb2RlIDogXCJjb3JzXCIgfSlcclxuICAgICAgICBjb25zdCBjb3VudHJ5RGF0YSA9IGF3YWl0IGNvdW50cnlSZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY291bnRyeURhdGEpXHJcbiAgICAgICAgcG9wdWxhdGVDb3VudHJ5KGNvdW50cnlEYXRhLCBjaXR5RGF0YSkgICAgXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gdG8gZ2V0IHRoZSBmb3JlY2FzdFxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7Y2l0eURhdGFbMF0ubGF0fSZsb249JHtjaXR5RGF0YVswXS5sb259JmFwcGlkPSR7a2V5fSZ1bml0cz0ke3VuaXRzfSZjbnQ9NDBgLCB7IG1vZGUgOiAnY29ycycgfSk7XHJcbiAgICAgICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0RGF0YSk7XHJcbiAgICAgICAgcG9wdWxhdGVVSShmb3JlY2FzdERhdGEsIHVuaXRzKTsgICAgICAgIFxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBVSVxyXG5mdW5jdGlvbiBwb3B1bGF0ZVVJKG9iaiwgdW5pdHMpIHtcclxuICAgIC8vIHBvcHVsYXRlIHRlbXBlcmF0dXJlIG5vd1xyXG4gICAgcG9wdWxhdGVUZW1wZXJhdHVyZU5vdyhvYmosIHVuaXRzKTtcclxuICAgIC8vIHBvcHVsYXRlIGluZm8gbm93XHJcbiAgICBwb3B1bGF0ZUluZm9Ob3cob2JqLCB1bml0cyk7XHJcbiAgICAvLyBwb3B1bGF0ZSBvdGhlciBpbmZvc1xyXG4gICAgcG9wdWxhdGVPdGhlckluZm9zKG9iaiwgdW5pdHMpO1xyXG4gICAgLy8gcG9wdWxhdGUgZm9yZWNhc3RcclxuICAgIHBvcHVsYXRlRm9yZWNhc3Qob2JqLCB1bml0cyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlVGVtcGVyYXR1cmVOb3cob2JqLCB1bml0cykge1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcFwiKTtcclxuICAgIGNvbnN0IGZlZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVscy1saWtlXCIpO1xyXG5cclxuICAgIHRlbXAudGV4dENvbnRlbnQgPSBgJHtvYmoubGlzdFswXS5tYWluLnRlbXB9ICR7dW5pdHMgPT09IFwibWV0cmljXCIgPyBcIsKwQ1wiIDogXCLCsEZcIn1gO1xyXG5cclxuICAgIGZlZWxzLnRleHRDb250ZW50ID0gYGZlZWxzIGxpa2UgJHtvYmoubGlzdFswXS5tYWluLmZlZWxzX2xpa2V9ICR7dW5pdHMgPT09IFwibWV0cmljXCIgPyBcIsKwQ1wiIDogXCLCsEZcIn1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiAgcG9wdWxhdGVJbmZvTm93KG9iaiwgdW5pdHMpIHtcclxuICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NcIik7XHJcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tbm93ID4gaW1nXCIpO1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZVwiKTtcclxuXHJcbiAgICBkZXNjLnRleHRDb250ZW50ID0gYCR7b2JqLmxpc3RbMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbn1gO1xyXG5cclxuICAgIGltZy5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7b2JqLmxpc3RbMF0ud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xyXG5cclxuICAgIGltZy5hbHQgPSBgJHtvYmoubGlzdFswXS53ZWF0aGVyWzBdLm1haW59YDtcclxuXHJcblxyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBnZXRDdXJyZW50VGltZU9mQ2l0eShvYmopO1xyXG4gICAgY29uc3QgZGF5ID0gY3VycmVudFRpbWUuZ2V0RGF0ZSgpIDwgMTAgPyBgMCR7Y3VycmVudFRpbWUuZ2V0RGF0ZSgpfWA6IGN1cnJlbnRUaW1lLmdldERhdGUoKTtcclxuICAgIGNvbnN0IG1vbnRocyA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdO1xyXG4gICAgY29uc3QgbW9udGggPSBtb250aHNbY3VycmVudFRpbWUuZ2V0TW9udGgoKV07XHJcbiAgICBjb25zdCBob3VyID0gY3VycmVudFRpbWUuZ2V0SG91cnMoKSA8IDEwID8gYDAke2N1cnJlbnRUaW1lLmdldEhvdXJzKCl9YDogY3VycmVudFRpbWUuZ2V0SG91cnMoKTtcclxuICAgIGNvbnN0IG1pbnV0ZSA9IGN1cnJlbnRUaW1lLmdldE1pbnV0ZXMoKSA8IDEwID8gYDAke2N1cnJlbnRUaW1lLmdldE1pbnV0ZXMoKX1gOiBjdXJyZW50VGltZS5nZXRNaW51dGVzKCk7XHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gYCR7ZGF5fSAke21vbnRofSAke2N1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCl9LCAke2hvdXJ9OiR7bWludXRlfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEN1cnJlbnRUaW1lT2ZDaXR5KG9iaikge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBEYXRlIG9iamVjdCBmb3IgY3VycmVudCBsb2NhdGlvblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gY29udmVydCB0byBtaWxsaXNlY29uZHMsIGFkZCBsb2NhbCB0aW1lIHpvbmUgb2Zmc2V0IGFuZCBnZXQgVVRDIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgY29uc3QgdXRjVGltZSA9IGN1cnJlbnREYXRlLmdldFRpbWUoKSArIChjdXJyZW50RGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApO1xyXG5cclxuICAgICAgICAvLyB1dGMgb2Zmc2V0IG9mIHRoZSBjaXR5XHJcbiAgICAgICAgY29uc3Qge3RpbWV6b25lfSA9IG9iai5jaXR5O1xyXG4gICAgICAgIGNvbnN0IG9mZnNldENpdHkgPSB0aW1lem9uZSAqIDEwMDA7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgRGF0ZSBvYmplY3QgZm9yIGEgZGlmZmVyZW50IHRpbWV6b25lIHVzaW5nIHN1cHBsaWVkIGl0cyBHTVQgb2Zmc2V0LlxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlQW5kVGltZUluQ2l0eSA9IG5ldyBEYXRlKHV0Y1RpbWUgKyBvZmZzZXRDaXR5KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lSW5DaXR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGb3JlY2FzdERhdGVzKG9iaikge1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgRGF0ZSBvYmplY3QgZm9yIGN1cnJlbnQgbG9jYXRpb25cclxuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29udmVydCB0byBtaWxsaXNlY29uZHMsIGFkZCBsb2NhbCB0aW1lIHpvbmUgb2Zmc2V0IGFuZCBnZXQgVVRDIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICAgIGNvbnN0IHV0Y1RpbWUgPSBjdXJyZW50RGF0ZS5nZXRUaW1lKCkgKyAoY3VycmVudERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyB1dGMgb2Zmc2V0IG9mIHRoZSBjaXR5XHJcbiAgICAgICAgICAgIGNvbnN0IHt0aW1lem9uZX0gPSBvYmouY2l0eTtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0Q2l0eSA9IHRpbWV6b25lICogMTAwMDtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBjdXJyZW50IGRhdGUgKzEgZGF5ICg4NjQwMDAwMCBtaWxsaXNlY29uZHMpXHJcbiAgICAgICAgICAgIGNvbnN0IGRQbHVzT25lID0gbmV3IERhdGUodXRjVGltZSArIG9mZnNldENpdHkgKyA4NjQwMDAwMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjdXJyZW50IGRhdGUgKzIgZGF5cyAoMTcyODAwMDAwIG1pbGxpc2Vjb25kcylcclxuICAgICAgICAgICAgY29uc3QgZFBsdXNUd28gPSBuZXcgRGF0ZSh1dGNUaW1lICsgb2Zmc2V0Q2l0eSArIDE3MjgwMDAwMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjdXJyZW50IGRhdGUgKzMgZGF5cyAoMjU5MjAwMDAwIG1pbGxpc2Vjb25kcylcclxuICAgICAgICAgICAgY29uc3QgZFBsdXNUaHJlZSA9IG5ldyBEYXRlKHV0Y1RpbWUgKyBvZmZzZXRDaXR5ICsgMjU5MjAwMDAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7ZFBsdXNPbmUsIGRQbHVzVHdvLCBkUGx1c1RocmVlfVxyXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lSW5DaXR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdW5yaXNlKG9iaikge1xyXG4gICAgLy8gY2l0eSBzdW5yaXNlXHJcbiAgICBjb25zdCB7c3VucmlzZX0gPSBvYmouY2l0eTtcclxuXHJcbiAgICAvLyB1dGMgb2Zmc2V0IG9mIGN1cnJlbnQgbG9jYXRpb24gXHJcbiAgICBjb25zdCBvZmZzZXRDdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDA7XHJcblxyXG4gICAgLy8gdXRjIG9mZnNldCBvZiB0aGUgY2l0eVxyXG4gICAgY29uc3Qge3RpbWV6b25lfSA9IG9iai5jaXR5O1xyXG4gICAgY29uc3Qgb2Zmc2V0Q2l0eSA9IHRpbWV6b25lICogMTAwMDtcclxuXHJcbiAgICAvLyB0b3RhbCBvZmZzZXQgZnJvbSBjdXJyZW50IGxvY2F0aW9uXHJcbiAgICBjb25zdCB0b3RhbE9mZnNldCA9IG9mZnNldENpdHkgKyBvZmZzZXRDdXJyZW50O1xyXG5cclxuICAgIC8vIHN1bnJpc2UgZGF0ZSwgcmVsYXRpdmUgdG8gdGhlIGNpdHkgdGltZVxyXG4gICAgY29uc3Qgc3VucmlzZURhdGUgPSBuZXcgRGF0ZSgoc3VucmlzZSoxMDAwKSArIHRvdGFsT2Zmc2V0KTtcclxuICAgIHJldHVybiBzdW5yaXNlRGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3Vuc2V0KG9iaikge1xyXG4gICAgLy8gY2l0eSBzdW5yaXNlXHJcbiAgICBjb25zdCB7c3Vuc2V0fSA9IG9iai5jaXR5O1xyXG5cclxuICAgIC8vIHV0YyBvZmZzZXQgb2YgY3VycmVudCBsb2NhdGlvbiBcclxuICAgIGNvbnN0IG9mZnNldEN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcclxuXHJcbiAgICAvLyB1dGMgb2Zmc2V0IG9mIHRoZSBjaXR5XHJcbiAgICBjb25zdCB7dGltZXpvbmV9ID0gb2JqLmNpdHk7XHJcbiAgICBjb25zdCBvZmZzZXRDaXR5ID0gdGltZXpvbmUgKiAxMDAwO1xyXG5cclxuICAgIC8vIHRvdGFsIG9mZnNldCBmcm9tIGN1cnJlbnQgbG9jYXRpb25cclxuICAgIGNvbnN0IHRvdGFsT2Zmc2V0ID0gb2Zmc2V0Q2l0eSArIG9mZnNldEN1cnJlbnQ7XHJcblxyXG4gICAgLy8gc3VucmlzZSBkYXRlLCByZWxhdGl2ZSB0byB0aGUgY2l0eSB0aW1lXHJcbiAgICBjb25zdCBzdW5zZXREYXRlID0gbmV3IERhdGUoKHN1bnNldCoxMDAwKSArIHRvdGFsT2Zmc2V0KTtcclxuICAgIHJldHVybiBzdW5zZXREYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaHJlZURheXNGb3JlY2FzdERhdGEob2JqKSB7XHJcbiAgICAvLyByZXR1cm4gb25seSB0aGUgZGF0YSBvZiB0aGUgMyBuZXh0IGRheXNcclxuXHJcbiAgICAvLyBmaXJzdCBlbGVtZW50IGlzIHRoZSBpbnRlcnZhbCAoMyBob3Vycykgbm93LCBzZWNvbmQgZWxlbWVudCBpcyB0aGUgaW5kZXggdG8gcmVtb3ZlXHJcbiAgICBjb25zdCBtYXBFbGVtZW50c1RvUmVtb3ZlID0gW1xyXG4gICAgICAgIFtcIjAwXCIsIDddLCBcclxuICAgICAgICBbXCIwM1wiLCA2XSwgXHJcbiAgICAgICAgW1wiMDZcIiwgNV0sIFxyXG4gICAgICAgIFtcIjA5XCIsIDRdLCBcclxuICAgICAgICBbXCIxMlwiLCAzXSwgXHJcbiAgICAgICAgW1wiMTVcIiwgMl0sIFxyXG4gICAgICAgIFtcIjE4XCIsIDFdLCBcclxuICAgICAgICBbXCIyMVwiLCAwXVxyXG4gICAgXTtcclxuICAgIGNvbnN0IGludGVydmFsTm93ID0gb2JqLmxpc3RbMF0uZHRfdHh0O1xyXG4gICAgY29uc3QgaW50ZXJ2YWxOb3dTdHJpbmcgPSBpbnRlcnZhbE5vd1sxMV0gKyBpbnRlcnZhbE5vd1sxMl07XHJcblxyXG4gICAgY29uc3QgbnVtYmVyT2ZFbGVtZW50ID0gbWFwRWxlbWVudHNUb1JlbW92ZS5maWx0ZXIoKGVsZW0pID0+IGVsZW1bMF0gPT09IGludGVydmFsTm93U3RyaW5nKVxyXG5cclxuICAgIGNvbnN0IGluZGV4VG9SZW1vdmUgPSBudW1iZXJPZkVsZW1lbnRbMF1bMV07XHJcblxyXG4gICAgY29uc3QgbmV3QXJyYXkgPSBvYmoubGlzdC5maWx0ZXIoKGVsZW1lbnQsaW5kZXgpID0+IGluZGV4ID4gaW5kZXhUb1JlbW92ZSk7XHJcblxyXG4gICAgLy8gZGF5KzEgZGF5KzIgZGF5KzMgZGF0YXNcclxuICAgIGNvbnN0IGRheVBsdXNPbmVGb3JlY2FzdCA9IG5ld0FycmF5LmZpbHRlcigoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4IDw9IDcpO1xyXG4gICAgY29uc3QgZGF5UGx1c1R3b0ZvcmVjYXN0ID0gbmV3QXJyYXkuZmlsdGVyKChlbGVtZW50LCBpbmRleCkgPT4gaW5kZXggPj0gOCAmJiBpbmRleCA8PSAxNSk7XHJcbiAgICBjb25zdCBkYXlQbHVzVGhyZWVGb3JlY2FzdCA9IG5ld0FycmF5LmZpbHRlcigoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4ID49IDE2ICYmIGluZGV4IDw9IDIzKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHtkYXlQbHVzT25lRm9yZWNhc3QsIGRheVBsdXNUd29Gb3JlY2FzdCwgZGF5UGx1c1RocmVlRm9yZWNhc3R9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBtZWFuVGVtcChvYmopIHtcclxuICAgIC8vIHNvcnQgdGhlIGFycmF5IGJ5IHRlbXAgYW5kIG1lYW4gdGhlIGZpcnN0IGFuZCBsYXN0IHRlbXBlcmF0dXJlXHJcbiAgICBjb25zdCBzb3J0ZWRBcnJheSA9IG9iai5zb3J0KChhLGIpID0+IGEubWFpbi50ZW1wIC0gYi5tYWluLnRlbXApXHJcbiAgICBjb25zdCBtZWFuVGVtcGVyYXR1cmUgPSAoc29ydGVkQXJyYXlbMF0ubWFpbi50ZW1wICsgc29ydGVkQXJyYXlbN10ubWFpbi50ZW1wKS8yO1xyXG5cclxuICAgIHJldHVybiBtZWFuVGVtcGVyYXR1cmUudG9GaXhlZCgyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVPdGhlckluZm9zKG9iaiwgdW5pdHMpIHtcclxuICAgIGNvbnN0IHByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVzc3VyZVwiKTtcclxuICAgIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eVwiKTtcclxuICAgIGNvbnN0IGNsb3VkaW5lc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsb3VkaW5lc3NcIik7XHJcbiAgICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xyXG4gICAgY29uc3Qgc3VucmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZVwiKTtcclxuICAgIGNvbnN0IHN1bnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3Vuc2V0XCIpO1xyXG5cclxuICAgIHByZXNzdXJlLnRleHRDb250ZW50ID0gYHByZXNzdXJlOiAke29iai5saXN0WzBdLm1haW4ucHJlc3N1cmV9IGhQYWA7XHJcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBodW1pZGl0eTogJHtvYmoubGlzdFswXS5tYWluLmh1bWlkaXR5fSAlYDtcclxuICAgIGNsb3VkaW5lc3MudGV4dENvbnRlbnQgPSBgY2xvdWRpbmVzczogJHtvYmoubGlzdFswXS5jbG91ZHMuYWxsfSAlYDtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgd2luZCBzcGVlZDogJHtvYmoubGlzdFswXS53aW5kLnNwZWVkfSAke3VuaXRzID09PSBcIm1ldHJpY1wiID8gXCJtZXRlci9zXCIgOiBcIm1pbGVzL2hcIn1gO1xyXG5cclxuICAgIC8vIHJldHJpZXZlIHN1bnJpc2UgYW5kIHN1bnNldCBkYXRlIGFuZCBvbmx5IHVzZSBob3VycyBhbmQgbWludXRlc1xyXG4gICAgY29uc3Qgc3VucmlzZURhdGUgPSBnZXRTdW5yaXNlKG9iaik7XHJcbiAgICBjb25zdCBzdW5yaXNlSG91cnMgPSBzdW5yaXNlRGF0ZS5nZXRIb3VycygpIDwgMTAgPyBgMCR7c3VucmlzZURhdGUuZ2V0SG91cnMoKX1gOiBzdW5yaXNlRGF0ZS5nZXRIb3VycygpO1xyXG4gICAgY29uc3Qgc3VucmlzZU1pbnV0ZXMgPSBzdW5yaXNlRGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/IGAwJHtzdW5yaXNlRGF0ZS5nZXRNaW51dGVzKCl9YDogc3VucmlzZURhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgc3VucmlzZS50ZXh0Q29udGVudCA9IGBzdW5yaXNlOiAke3N1bnJpc2VIb3VycyAgfTokeyAgc3VucmlzZU1pbnV0ZXN9YDtcclxuXHJcbiAgICBjb25zdCBzdW5zZXREYXRlID0gZ2V0U3Vuc2V0KG9iaik7XHJcbiAgICBjb25zdCBzdW5zZXRIb3VycyA9IHN1bnNldERhdGUuZ2V0SG91cnMoKSA8IDEwID8gYDAke3N1bnNldERhdGUuZ2V0SG91cnMoKX1gOiBzdW5zZXREYXRlLmdldEhvdXJzKCk7XHJcbiAgICBjb25zdCBzdW5zZXRNaW51dGVzID0gc3Vuc2V0RGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/IGAwJHtzdW5zZXREYXRlLmdldE1pbnV0ZXMoKX1gOiBzdW5zZXREYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgIHN1bnNldC50ZXh0Q29udGVudCA9IGBzdW5zZXQ6ICR7c3Vuc2V0SG91cnMgIH06JHsgIHN1bnNldE1pbnV0ZXN9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVGb3JlY2FzdChvYmosIHVuaXRzKSB7XHJcbiAgICBjb25zdCBkYXRlUGx1c09uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS1kLW9uZVwiKTtcclxuICAgIGNvbnN0IHRlbXBQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wLWQtb25lXCIpO1xyXG4gICAgY29uc3QgZGVzY1BsdXNPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2MtZC1vbmVcIik7XHJcbiAgICBjb25zdCBkYXRlUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS1kLXR3b1wiKTtcclxuICAgIGNvbnN0IHRlbXBQbHVzVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wLWQtdHdvXCIpO1xyXG4gICAgY29uc3QgZGVzY1BsdXNUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2MtZC10d29cIik7XHJcbiAgICBjb25zdCBkYXRlUGx1c1RocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlLWQtdGhyZWVcIik7XHJcbiAgICBjb25zdCB0ZW1wUGx1c1RocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wLWQtdGhyZWVcIik7XHJcbiAgICBjb25zdCBkZXNjUGx1c1RocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjLWQtdGhyZWVcIik7XHJcblxyXG4gICAgLy8gbGlzdCBvZiBtb250aHNcclxuICAgIGNvbnN0IG1vbnRocyA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdO1xyXG5cclxuICAgIC8vIGdldCBkYXRlKzEsIGRhdGUrMiwgZGF0ZSszIG9iamVjdHMgdGhlbiBwb3B1bGF0ZSBmb3JlY2FzdCBkYXRlcyB3aXRoIHRob3NlXHJcbiAgICBjb25zdCBmb3JlY2FzdERhdGVzID0gZ2V0Rm9yZWNhc3REYXRlcyhvYmopO1xyXG4gICAgY29uc3QgZGF5T2ZEYXlQbHVzT25lID0gZm9yZWNhc3REYXRlcy5kUGx1c09uZS5nZXREYXRlKCkgPCAxMCA/IGAwJHtmb3JlY2FzdERhdGVzLmRQbHVzT25lLmdldERhdGUoKX1gOiBmb3JlY2FzdERhdGVzLmRQbHVzT25lLmdldERhdGUoKTtcclxuICAgIGNvbnN0IG1vbnRoT2ZEYXlQbHVzT25lID0gbW9udGhzW2ZvcmVjYXN0RGF0ZXMuZFBsdXNPbmUuZ2V0TW9udGgoKV07XHJcbiAgICBjb25zdCB5ZWFyT2ZEYXlQbHVzT25lID0gZm9yZWNhc3REYXRlcy5kUGx1c09uZS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgIGNvbnN0IGRheU9mRGF5UGx1c1R3byA9IGZvcmVjYXN0RGF0ZXMuZFBsdXNUd28uZ2V0RGF0ZSgpIDwgMTAgPyBgMCR7Zm9yZWNhc3REYXRlcy5kUGx1c1R3by5nZXREYXRlKCl9YDogZm9yZWNhc3REYXRlcy5kUGx1c1R3by5nZXREYXRlKCk7XHJcbiAgICBjb25zdCBtb250aE9mRGF5UGx1c1R3byA9IG1vbnRoc1tmb3JlY2FzdERhdGVzLmRQbHVzVHdvLmdldE1vbnRoKCldO1xyXG4gICAgY29uc3QgeWVhck9mRGF5UGx1c1R3byA9IGZvcmVjYXN0RGF0ZXMuZFBsdXNUd28uZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBjb25zdCBkYXlPZkRheVBsdXNUaHJlZSA9IGZvcmVjYXN0RGF0ZXMuZFBsdXNUaHJlZS5nZXREYXRlKCkgPCAxMCA/IGAwJHtmb3JlY2FzdERhdGVzLmRQbHVzVGhyZWUuZ2V0RGF0ZSgpfWA6IGZvcmVjYXN0RGF0ZXMuZFBsdXNUaHJlZS5nZXREYXRlKCk7XHJcbiAgICBjb25zdCBtb250aE9mRGF5UGx1c1RocmVlID0gbW9udGhzW2ZvcmVjYXN0RGF0ZXMuZFBsdXNUaHJlZS5nZXRNb250aCgpXTtcclxuICAgIGNvbnN0IHllYXJPZkRheVBsdXNUaHJlZSA9IGZvcmVjYXN0RGF0ZXMuZFBsdXNUaHJlZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgXHJcbiAgICBkYXRlUGx1c09uZS50ZXh0Q29udGVudCA9IGAke2RheU9mRGF5UGx1c09uZX0gJHttb250aE9mRGF5UGx1c09uZX0gJHt5ZWFyT2ZEYXlQbHVzT25lfWA7XHJcbiAgICBkYXRlUGx1c1R3by50ZXh0Q29udGVudCA9IGAke2RheU9mRGF5UGx1c1R3b30gJHttb250aE9mRGF5UGx1c1R3b30gJHt5ZWFyT2ZEYXlQbHVzVHdvfWA7XHJcbiAgICBkYXRlUGx1c1RocmVlLnRleHRDb250ZW50ID0gYCR7ZGF5T2ZEYXlQbHVzVGhyZWV9ICR7bW9udGhPZkRheVBsdXNUaHJlZX0gJHt5ZWFyT2ZEYXlQbHVzVGhyZWV9YDtcclxuICAgIFxyXG4gICAgLy8gbWVhbiB0aGUgbWluIGFuZCBtYXggdGVtcCBvZiB0aGUgZGF5cyBwb3B1bGF0ZSB0ZW1wKzEsIHRlbXArMiwgdGVtcCszXHJcbiAgICBjb25zdCB0aHJlZURheXNGb3JlY2FzdERhdGEgPSBnZXRUaHJlZURheXNGb3JlY2FzdERhdGEob2JqKTtcclxuICAgIGNvbnN0IG1lYW5UZW1wRGF5UGx1c09uZSA9IG1lYW5UZW1wKHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzT25lRm9yZWNhc3QpO1xyXG4gICAgY29uc3QgbWVhblRlbXBEYXlQbHVzVHdvID0gbWVhblRlbXAodGhyZWVEYXlzRm9yZWNhc3REYXRhLmRheVBsdXNUd29Gb3JlY2FzdCk7XHJcbiAgICBjb25zdCBtZWFuVGVtcERheVBsdXNUaHJlZSA9IG1lYW5UZW1wKHRocmVlRGF5c0ZvcmVjYXN0RGF0YS5kYXlQbHVzVGhyZWVGb3JlY2FzdCk7XHJcbiAgICBjb25zb2xlLmxvZyhtZWFuVGVtcERheVBsdXNPbmUsIG1lYW5UZW1wRGF5UGx1c1R3bywgbWVhblRlbXBEYXlQbHVzVGhyZWUpO1xyXG5cclxuICAgIHRlbXBQbHVzT25lLnRleHRDb250ZW50ID0gYCR7bWVhblRlbXBEYXlQbHVzT25lfSAke3VuaXRzID09PSBcIm1ldHJpY1wiID8gJ8KwQycgOiAnwrBGJ31gO1xyXG4gICAgdGVtcFBsdXNUd28udGV4dENvbnRlbnQgPSBgJHttZWFuVGVtcERheVBsdXNUd299ICR7dW5pdHMgPT09IFwibWV0cmljXCIgPyAnwrBDJyA6ICfCsEYnfWA7XHJcbiAgICB0ZW1wUGx1c1RocmVlLnRleHRDb250ZW50ID0gYCR7bWVhblRlbXBEYXlQbHVzVGhyZWV9ICR7dW5pdHMgPT09IFwibWV0cmljXCIgPyAnwrBDJyA6ICfCsEYnfWA7XHJcblxyXG4gICAgLy8gdG8gZG86IHBvcHVsYXRlIGRlc2MrMSwgZGVzYysyLCBkZXNjKzNcclxuICAgIC8vLyAvLy8vLy9cclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVDb3VudHJ5KG9iakNvdW50cnksIG9iakNpdHkpIHtcclxuXHJcbiAgICBjb25zdCBjb3VudHJ5ID0gb2JqQ291bnRyeS5maWx0ZXIoKGNvdW50cnlJbkRhdGEpID0+IGNvdW50cnlJbkRhdGEuY2NhMiA9PT0gb2JqQ2l0eVswXS5jb3VudHJ5KVxyXG4gICAgY29uc3QgY291bnRyeU5hbWUgPSBjb3VudHJ5WzBdLm5hbWUuY29tbW9uO1xyXG5cclxuICAgIGNvbnN0IGNvdW50cnlGbGFnID0gY291bnRyeVswXS5mbGFncztcclxuICAgIGNvbnN0IGNpdHlOYW1lID0gb2JqQ2l0eVswXS5uYW1lO1xyXG5cclxuICAgIC8vIHBvcHVsYXRlIHRoZSBjaXR5IGFuZCBjb3VudHJ5IGVsZW1lbnRcclxuICAgIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktbmFtZVwiKVxyXG4gICAgY2l0eS5pbm5lckhUTUwgPSBgJHtjaXR5TmFtZX0sIDwvYnI+ICR7Y291bnRyeU5hbWV9YDtcclxuXHJcbiAgICAvLyBwb3B1bGF0ZSB0aGUgZmxhZyBpbWFnZSBhbmQgYWx0XHJcbiAgICBjb25zdCBmbGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5ID4gaW1nXCIpO1xyXG4gICAgZmxhZy5zcmMgPSBjb3VudHJ5RmxhZy5zdmc7XHJcbiAgICBmbGFnLmFsdCA9IGNvdW50cnlGbGFnLmFsdDtcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==