import { ApiClient } from '@/entities/Api';
import { OpenWeatherService } from './services/openweather';

export class ServicesManager {
  api: ApiClient

  openweather: OpenWeatherService

  constructor () {
    this.api = new ApiClient();

    this.openweather = new OpenWeatherService(this.api);
  }
}
