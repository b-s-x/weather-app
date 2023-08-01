import { useDewPoint } from "@/widgets/weather/model/hooks/index";
import { services } from "@/entities/Services";
import { LocalStorageManager } from "@/entities/LocalStorageManager/index";
import type {
  WeatherDataResponse,
  ParamsWeatherData,
  SelectedCity,
} from "../types";

export class DataLayer {
  public isFetchingWeather: boolean
  private localStorageManager: LocalStorageManager

  constructor () {
    this.isFetchingWeather = true;
    this.localStorageManager = new LocalStorageManager();
  }

  public async getDataWeather(params: ParamsWeatherData) {
    this.isFetchingWeather = true;
    try {
      const { data } = await services.openweather.getWeather(params);
      const dataParse = this.parseData(data);
      return { data: dataParse, status: true };
    } catch(err) {
      console.error(err);
      return { status: false };
    } finally {
      this.isFetchingWeather = false;
    }
  }

  parseData (data: WeatherDataResponse) {
    return {
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
      id: data?.id,
    }
  }

  checkValidationData (data: SelectedCity) {
    if (!Array.isArray(data)) {
      return false;
    }

    if (data.length > 0) {
      const item = data[0];

      if (!('id' in item)) {
        return false;
      }

      if (!('city' in item)) {
        return false;
      }

      if (!('country' in item)) {
        return false;
      }
    }

    return true;
  }

  parseFromLocalStorageSelectedCity (key: string) {
    const data = this.localStorageManager.get(key);
    const status = this.checkValidationData(data);
    return { status, data };
  }

  setInLocalStorageSelectedCity (key: string, data: any) {
    this.localStorageManager.set(key, data)
  }
}