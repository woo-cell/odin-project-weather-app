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