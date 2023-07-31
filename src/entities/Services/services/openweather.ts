import { ApiClient } from "@/entities/Api";
import { ParamsWeatherData } from "@/widgets/weather/model/types";

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class OpenWeatherService {
  api: ApiClient

  constructor (api: ApiClient) {
    this.api = api;
  }

  getWeather(params?: ParamsWeatherData) {
    const key = import.meta.env.VITE_OPENWEATHER_KEY;
    const url = `${BASE_URL}/weather?appid=${key}&units=metric`;
    return this.api.get(url, { params });
  }
}
