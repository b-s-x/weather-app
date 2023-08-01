import { ApiClient } from "@/entities/Api";

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class OpenWeatherService {
  api: ApiClient
  key: string

  constructor (api: ApiClient) {
    this.api = api;
    this.key = import.meta.env.VITE_OPENWEATHER_KEY;
  }

  getWeather(params?: object) {
    const url = `${BASE_URL}/weather?appid=${this.key}&units=metric`;
    return this.api.get(url, { params });
  }
}
