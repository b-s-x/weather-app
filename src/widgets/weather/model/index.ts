import { services } from "@/entities/Services";
import { useCurrentGeoPosition } from '@/shared/hooks/index';
import { useDewPoint } from "@/widgets/weather/model/hooks/index";
import type {
  WeatherDataResponse,
  WeatherData,
  ParamsWeatherData,
} from "./types";

export class Weather {
  public isFetchingWeather: boolean
  public data: WeatherData

  constructor () {
    this.isFetchingWeather = true;
    this.data = {};
  }

  async getParams () {
    const { latitude, longitude } = await useCurrentGeoPosition();

    const params: ParamsWeatherData = {
      lat: latitude,
      lon: longitude,
    }

    return params;
  }

  async getData() {
    const params = await this.getParams();
    try {
      this.isFetchingWeather = true;
      const { data } = await services.openweather.getWeather(params);
      this.parseData(data);
      this.isFetchingWeather = false;
    } catch(err) {
      console.error(err);
    }
  }

  parseData (data: WeatherDataResponse) {
    this.data = {
      city: data?.name,
      country: data?.sys?.country,
      description: data?.weather[0]?.description,
      type: data?.weather[0]?.main,
      windSpeed: data?.wind?.speed,
      pressure: data?.main?.pressure,
      humidity: data?.main?.humidity,
      visibility: data?.visibility,
      dew: useDewPoint(data?.main?.temp, data?.main?.humidity),
      temp: data?.main?.temp,
    }
  }
}

