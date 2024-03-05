import Url from "./Url";
import Ui from "./Ui";

// retrieve input elements
const cityInput = document.getElementById("city-input");
const unitInput = document.getElementById("units");
const searchButton = document.getElementById("search-button");

// fetch the city data
async function geoCodeCity(name) {
  const url = new Url();
  try {
    const response = await fetch(url.getGeocodeUrl(name), { mode: "cors" });
    const cityData = await response.json();
    return cityData;
  } catch (error) {
    console.log(error);
  }
}

// fetch the country name
async function getCountryName(country) {
  const url = new Url();
  try {
    const countryResponse = await fetch(url.getRestcountriesUrl(country), {
      mode: "cors",
    });
    const countryData = await countryResponse.json();
    return countryData;
  } catch (error) {
    console.log(error);
  }
}

// fetch the forecast
async function getForecast(latitude, longitude, units) {
  const url = new Url();
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

// fetch the forecast data
async function getForecastData(name, units) {
  try {
    const cityData = await geoCodeCity(name);
    const forecastData = await getForecast(
      cityData[0].lat,
      cityData[0].lon,
      units,
    );
    return forecastData;
  } catch (error) {
    console.log(error);
  }
}

// initialize the screen
async function initialize(cityName, units) {
  const forecastData = await getForecastData(cityName, units);
  const ui = new Ui(forecastData, units);
  ui.populateUI();

  const cityData = await geoCodeCity(cityName);
  const countryData = await getCountryName(cityData[0].country);
  Ui.populateCountry(countryData, cityData);
}

// search button event handler
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const cityName = cityInput.value;
  const units = unitInput.value;
  if (cityName) {
    initialize(cityName, units);
  } else {
    initialize("osaka", "metric");
  }
});

// default: osaka - metric
initialize("osaka", "metric");
