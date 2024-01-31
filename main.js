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
const searchButton = document.getElementById("serch-button");
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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=${key}&units=${units}`, { mode : 'cors' });
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

    // to do: get current date and time of city/country in query
    /// ////
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

    // to do: populate sunrise and sunset
    sunrise.textContent = `sunrise:`;
    sunset.textContent = `sunset:`;
    /// /////
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

    // to do: populate date+1, date+2, date+3
    /// //////

    // to do: populate temp+1, temp+2, temp+3
    /// //////

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0ZBQXdGLEtBQUssU0FBUyxJQUFJLEtBQUssZUFBZTtBQUM5SDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixvQkFBb0IsS0FBSyxlQUFlO0FBQzVIO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkZBQTZGLGdCQUFnQixPQUFPLGdCQUFnQixTQUFTLElBQUksU0FBUyxNQUFNLEtBQUssZUFBZTtBQUNwTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVCQUF1QixFQUFFLGlDQUFpQztBQUNwRjtBQUNBLHNDQUFzQyw2QkFBNkIsRUFBRSxpQ0FBaUM7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0EsbURBQW1ELDRCQUE0QjtBQUMvRTtBQUNBLGlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMkJBQTJCO0FBQ25FLHdDQUF3QywyQkFBMkI7QUFDbkUsNENBQTRDLHdCQUF3QjtBQUNwRSxzQ0FBc0Msd0JBQXdCLEVBQUUsMkNBQTJDO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUyxVQUFVLFlBQVk7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXZhbmlsbGEtanMtdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGNpdHlOYW1lID0gXCJcIjsgXHJcbmxldCB1bml0cyA9IFwiXCI7XHJcblxyXG4vLyB3ZWF0aGVyIEFQSSBrZXlcclxuY29uc3QgS0VZID0gXCI4ZDNkZGY2ZjdiYjAwMzE2N2I5YzAxYjg4ODk5M2VmNFwiO1xyXG5cclxuLy8gcmV0cmlldmUgc2VhcmNoIGVsZW1lbnRzXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LWlucHV0XCIpO1xyXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlcmNoLWJ1dHRvblwiKTtcclxuY29uc3Qgc3dpdGNoVW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVuaXRzXCIpO1xyXG5cclxuLy8gc2VhcmNoIGJ1dHRvbiBldmVudCBoYW5kbGVyXHJcbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChpbnB1dC52YWx1ZSkge1xyXG4gICAgICAgIGNpdHlOYW1lID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgdW5pdHMgPSBzd2l0Y2hVbml0cy52YWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjaXR5TmFtZSwgdW5pdHMpO1xyXG4gICAgICAgIGdldEZvcmVjYXN0RGF0YShjaXR5TmFtZSwgS0VZLCB1bml0cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdldEZvcmVjYXN0RGF0YShcIm9zYWthXCIsIEtFWSwgXCJtZXRyaWNcIik7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblxyXG4vLyBmZXRjaCBjaXR5IGRhdGFcclxuYXN5bmMgZnVuY3Rpb24gZ2VvQ29kZUNpdHkobmFtZSwga2V5KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7bmFtZX0mYXBwaWQ9JHtrZXl9YCwgeyBtb2RlIDogJ2NvcnMnIH0pO1xyXG4gICAgICAgIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIHJldHVybiBjaXR5RGF0YTsgICAgICAgIFxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGZldGNoIGZvcmVjYXN0IGRhdGFcclxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3REYXRhKG5hbWUsIGtleSwgdW5pdHMpIHtcclxuICAgIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgZ2VvQ29kZUNpdHkobmFtZSwga2V5KTtcclxuICAgIGNvbnNvbGUubG9nKGNpdHlEYXRhKTtcclxuICAgIFxyXG5cclxuICAgIC8vIHRvIGdldCB0aGUgY291bnRyeSBuYW1lXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvdW50cnlSZXNwb25zZSA9IGF3YWl0IGZldGNoKCBgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmNvbS92My4xL25hbWUvJHtjaXR5RGF0YVswXS5jb3VudHJ5fWAsIHsgbW9kZSA6IFwiY29yc1wiIH0pXHJcbiAgICAgICAgY29uc3QgY291bnRyeURhdGEgPSBhd2FpdCBjb3VudHJ5UmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvdW50cnlEYXRhKVxyXG4gICAgICAgIHBvcHVsYXRlQ291bnRyeShjb3VudHJ5RGF0YSwgY2l0eURhdGEpICAgIFxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIHRvIGdldCB0aGUgZm9yZWNhc3RcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2NpdHlEYXRhWzBdLmxhdH0mbG9uPSR7Y2l0eURhdGFbMF0ubG9ufSZhcHBpZD0ke2tleX0mdW5pdHM9JHt1bml0c31gLCB7IG1vZGUgOiAnY29ycycgfSk7XHJcbiAgICAgICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0RGF0YSk7XHJcbiAgICAgICAgcG9wdWxhdGVVSShmb3JlY2FzdERhdGEsIHVuaXRzKTsgICAgICAgIFxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBVSVxyXG5mdW5jdGlvbiBwb3B1bGF0ZVVJKG9iaiwgdW5pdHMpIHtcclxuICAgIC8vIHBvcHVsYXRlIHRlbXBlcmF0dXJlIG5vd1xyXG4gICAgcG9wdWxhdGVUZW1wZXJhdHVyZU5vdyhvYmosIHVuaXRzKTtcclxuICAgIC8vIHBvcHVsYXRlIGluZm8gbm93XHJcbiAgICBwb3B1bGF0ZUluZm9Ob3cob2JqLCB1bml0cyk7XHJcbiAgICAvLyBwb3B1bGF0ZSBvdGhlciBpbmZvc1xyXG4gICAgcG9wdWxhdGVPdGhlckluZm9zKG9iaiwgdW5pdHMpO1xyXG4gICAgLy8gcG9wdWxhdGUgZm9yZWNhc3RcclxuICAgIHBvcHVsYXRlRm9yZWNhc3Qob2JqLCB1bml0cyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlVGVtcGVyYXR1cmVOb3cob2JqLCB1bml0cykge1xyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcFwiKTtcclxuICAgIGNvbnN0IGZlZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVscy1saWtlXCIpO1xyXG5cclxuICAgIHRlbXAudGV4dENvbnRlbnQgPSBgJHtvYmoubGlzdFswXS5tYWluLnRlbXB9ICR7dW5pdHMgPT09IFwibWV0cmljXCIgPyBcIsKwQ1wiIDogXCLCsEZcIn1gO1xyXG5cclxuICAgIGZlZWxzLnRleHRDb250ZW50ID0gYGZlZWxzIGxpa2UgJHtvYmoubGlzdFswXS5tYWluLmZlZWxzX2xpa2V9ICR7dW5pdHMgPT09IFwibWV0cmljXCIgPyBcIsKwQ1wiIDogXCLCsEZcIn1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiAgcG9wdWxhdGVJbmZvTm93KG9iaiwgdW5pdHMpIHtcclxuICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NcIik7XHJcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tbm93ID4gaW1nXCIpO1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZVwiKTtcclxuXHJcbiAgICBkZXNjLnRleHRDb250ZW50ID0gYCR7b2JqLmxpc3RbMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbn1gO1xyXG5cclxuICAgIGltZy5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7b2JqLmxpc3RbMF0ud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xyXG5cclxuICAgIGltZy5hbHQgPSBgJHtvYmoubGlzdFswXS53ZWF0aGVyWzBdLm1haW59YDtcclxuXHJcbiAgICAvLyB0byBkbzogZ2V0IGN1cnJlbnQgZGF0ZSBhbmQgdGltZSBvZiBjaXR5L2NvdW50cnkgaW4gcXVlcnlcclxuICAgIC8vLyAvLy8vXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlT3RoZXJJbmZvcyhvYmosIHVuaXRzKSB7XHJcbiAgICBjb25zdCBwcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlc3N1cmVcIik7XHJcbiAgICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIik7XHJcbiAgICBjb25zdCBjbG91ZGluZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG91ZGluZXNzXCIpO1xyXG4gICAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZFwiKTtcclxuICAgIGNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnJpc2VcIik7XHJcbiAgICBjb25zdCBzdW5zZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldFwiKTtcclxuXHJcbiAgICBwcmVzc3VyZS50ZXh0Q29udGVudCA9IGBwcmVzc3VyZTogJHtvYmoubGlzdFswXS5tYWluLnByZXNzdXJlfSBoUGFgO1xyXG4gICAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgaHVtaWRpdHk6ICR7b2JqLmxpc3RbMF0ubWFpbi5odW1pZGl0eX0gJWA7XHJcbiAgICBjbG91ZGluZXNzLnRleHRDb250ZW50ID0gYGNsb3VkaW5lc3M6ICR7b2JqLmxpc3RbMF0uY2xvdWRzLmFsbH0gJWA7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYHdpbmQgc3BlZWQ6ICR7b2JqLmxpc3RbMF0ud2luZC5zcGVlZH0gJHt1bml0cyA9PT0gXCJtZXRyaWNcIiA/IFwibWV0ZXIvc1wiIDogXCJtaWxlcy9oXCJ9YDtcclxuXHJcbiAgICAvLyB0byBkbzogcG9wdWxhdGUgc3VucmlzZSBhbmQgc3Vuc2V0XHJcbiAgICBzdW5yaXNlLnRleHRDb250ZW50ID0gYHN1bnJpc2U6YDtcclxuICAgIHN1bnNldC50ZXh0Q29udGVudCA9IGBzdW5zZXQ6YDtcclxuICAgIC8vLyAvLy8vL1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3B1bGF0ZUZvcmVjYXN0KG9iaiwgdW5pdHMpIHtcclxuICAgIGNvbnN0IGRhdGVQbHVzT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlLWQtb25lXCIpO1xyXG4gICAgY29uc3QgdGVtcFBsdXNPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtZC1vbmVcIik7XHJcbiAgICBjb25zdCBkZXNjUGx1c09uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzYy1kLW9uZVwiKTtcclxuICAgIGNvbnN0IGRhdGVQbHVzVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlLWQtdHdvXCIpO1xyXG4gICAgY29uc3QgdGVtcFBsdXNUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtZC10d29cIik7XHJcbiAgICBjb25zdCBkZXNjUGx1c1R3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzYy1kLXR3b1wiKTtcclxuICAgIGNvbnN0IGRhdGVQbHVzVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGUtZC10aHJlZVwiKTtcclxuICAgIGNvbnN0IHRlbXBQbHVzVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtZC10aHJlZVwiKTtcclxuICAgIGNvbnN0IGRlc2NQbHVzVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2MtZC10aHJlZVwiKTtcclxuXHJcbiAgICAvLyB0byBkbzogcG9wdWxhdGUgZGF0ZSsxLCBkYXRlKzIsIGRhdGUrM1xyXG4gICAgLy8vIC8vLy8vL1xyXG5cclxuICAgIC8vIHRvIGRvOiBwb3B1bGF0ZSB0ZW1wKzEsIHRlbXArMiwgdGVtcCszXHJcbiAgICAvLy8gLy8vLy8vXHJcblxyXG4gICAgLy8gdG8gZG86IHBvcHVsYXRlIGRlc2MrMSwgZGVzYysyLCBkZXNjKzNcclxuICAgIC8vLyAvLy8vLy9cclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVDb3VudHJ5KG9iakNvdW50cnksIG9iakNpdHkpIHtcclxuXHJcbiAgICBjb25zdCBjb3VudHJ5ID0gb2JqQ291bnRyeS5maWx0ZXIoKGNvdW50cnlJbkRhdGEpID0+IGNvdW50cnlJbkRhdGEuY2NhMiA9PT0gb2JqQ2l0eVswXS5jb3VudHJ5KVxyXG4gICAgY29uc3QgY291bnRyeU5hbWUgPSBjb3VudHJ5WzBdLm5hbWUuY29tbW9uO1xyXG5cclxuICAgIGNvbnN0IGNvdW50cnlGbGFnID0gY291bnRyeVswXS5mbGFncztcclxuICAgIGNvbnN0IGNpdHlOYW1lID0gb2JqQ2l0eVswXS5uYW1lO1xyXG5cclxuICAgIC8vIHBvcHVsYXRlIHRoZSBjaXR5IGFuZCBjb3VudHJ5IGVsZW1lbnRcclxuICAgIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktbmFtZVwiKVxyXG4gICAgY2l0eS5pbm5lckhUTUwgPSBgJHtjaXR5TmFtZX0sIDwvYnI+ICR7Y291bnRyeU5hbWV9YDtcclxuXHJcbiAgICAvLyBwb3B1bGF0ZSB0aGUgZmxhZyBpbWFnZSBhbmQgYWx0XHJcbiAgICBjb25zdCBmbGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5ID4gaW1nXCIpO1xyXG4gICAgZmxhZy5zcmMgPSBjb3VudHJ5RmxhZy5zdmc7XHJcbiAgICBmbGFnLmFsdCA9IGNvdW50cnlGbGFnLmFsdDtcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==