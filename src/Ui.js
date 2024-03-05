import Url from "./Url";
import {
  getCurrentTimeOfCity,
  getSunrise,
  getSunset,
  getThreeDaysForecastData,
  getDescription,
  getWeatherImage,
  getForecastDates,
  getFutureDate,
  meanTemp,
  formatCurrentTime,
  formatSunHours,
} from "./lib";

export default class Ui {
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
      this.units === "metric" ? "°C" : "°F"
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

    img.src = new Url().getIconUrl(this.obj.list[0].weather[0].icon);
    img.alt = `${this.obj.list[0].weather[0].description}`;

    const currentTime = getCurrentTimeOfCity(this.obj);
    date.textContent = formatCurrentTime(currentTime);
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
    const sunriseDate = getSunrise(this.obj);
    sunrise.textContent = `sunrise: ${formatSunHours(sunriseDate)}`;

    const sunsetDate = getSunset(this.obj);
    sunset.textContent = `sunset: ${formatSunHours(sunsetDate)}`;
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

    // get date+1, date+2, date+3 objects then populate forecast dates with those
    const forecastDates = getForecastDates(this.obj);

    datePlusOne.textContent = getFutureDate(forecastDates.dPlusOne);
    datePlusTwo.textContent = getFutureDate(forecastDates.dPlusTwo);
    datePlusThree.textContent = getFutureDate(forecastDates.dPlusThree);

    // mean the min and max temp of the days populate temp+1, temp+2, temp+3
    const threeDaysForecastData = getThreeDaysForecastData(this.obj);
    const meanTempDayPlusOne = meanTemp(
      threeDaysForecastData.dayPlusOneForecast,
    );
    const meanTempDayPlusTwo = meanTemp(
      threeDaysForecastData.dayPlusTwoForecast,
    );
    const meanTempDayPlusThree = meanTemp(
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
