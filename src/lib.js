import Url from "./Url";

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
  const url = new Url().getIconUrl(arr.weather[0].icon);
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

function formatCurrentTime(currentTime) {
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
  return `${day} ${month} ${currentTime.getFullYear()}, ${hour}:${minute}`;
}

function getFutureDate(datePlus) {
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

  const dayOfDayPlus =
    datePlus.getDate() < 10 ? `0${datePlus.getDate()}` : datePlus.getDate();
  const monthOfDayPlus = months[datePlus.getMonth()];
  const yearOfDayPlus = datePlus.getFullYear();
  return `${dayOfDayPlus} ${monthOfDayPlus} ${yearOfDayPlus}`;
}

function formatSunHours(date) {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
}

export {
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
};
