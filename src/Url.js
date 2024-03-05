export default class Url {
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