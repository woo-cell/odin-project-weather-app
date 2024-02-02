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