import { ApiClient } from "@/entities/Api";

export class OpenWeatherService {
  api: ApiClient

  constructor (api: ApiClient) {
    this.api = api;
  }

  getData(params: {}) {
    return this.api.get('', params);
  }
}
