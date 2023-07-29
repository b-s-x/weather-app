import { ApiClient } from "@/entities/Api";
import { ParamsWeatherData } from "@/widgets/weather/model/types";

export class OpenWeatherService {
  api: ApiClient

  constructor (api: ApiClient) {
    this.api = api;
  }

  getWeather(params?: ParamsWeatherData) {
    console.log(2, params);
    // const params = {
    //   // q: 'London',
    //   lat: '41.7864013',
    //   lon: '44.7501177',
    // };
    const key = '5c853db7cbe36938d17ff8078d21ff3e';
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric`;
    return this.api.get(url, { params });
  }
}
