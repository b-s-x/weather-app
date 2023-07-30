import { services } from "@/entities/Services";
import { useCurrentGeoPosition } from '@/shared/hooks/index';
import { useDewPoint } from "@/widgets/weather/model/hooks/index";
import { LocalStorageManager } from "@/entities/LocalStorageManager/index";
import type {
  WeatherDataResponse,
  WeatherData,
  SelectedCity,
} from "./types";

const KEY_SELECTED = 'SELECTED';
const DEFAULT_ID = 4930956;

export class Weather {
  public isFetchingWeather: boolean
  public isFindingCityWeather: boolean
  public data: WeatherData
  public selectedCities: SelectedCity[]
  public isNotFind: boolean
  private localStorageManager: LocalStorageManager

  constructor () {
    this.isFetchingWeather = true;
    this.data = {};
    this.isNotFind = false;
    this.isFindingCityWeather = false;
    this.localStorageManager = new LocalStorageManager();
    this.selectedCities = [];
  }

  async getParams () {
    if (this.selectedCities.length > 0) {
      return {
        id: this.selectedCities[0]?.id,
      }
    }

    const { latitude, longitude } = await useCurrentGeoPosition();

    if (latitude && longitude) {
      return {
        lat: latitude,
        lon: longitude,
      }
    }

    return { id: DEFAULT_ID };
  }

  public async getData() {
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
      id: data?.id,
    }
  }

  public changeSelectedCities (values: SelectedCity[]) {
    this.selectedCities = values;
    this.setInLocalStorageSelectedCity();
  }

  public deleteSelectedCity (deleteId: number) {
    this.selectedCities = this.selectedCities.filter(({ id }) => id !== deleteId);
  }

  public addSelectedCity (data: SelectedCity) {
    this.selectedCities = [
      ...this.selectedCities,
      data,
    ];
  }

  public async findCity (city: string) {
    if (!city) {
      return;
    }
    this.resetIsNotFind();
    try {
      this.isFindingCityWeather = true;
      const { data } = await services.openweather.getWeather({ q: city });
      this.parseData(data);
      this.addToSelected(data);
    } catch(err) {
      this.isNotFind = true;
      console.error(err);
    } finally {
      this.isFindingCityWeather = false;
    }
  }

  resetIsNotFind () {
    this.isNotFind = false;
  }

  public addToSelected (data: WeatherDataResponse) {
    const value: SelectedCity = {
      city: data?.name,
      country: data?.sys?.country,
      id: data?.id,
    }

    this.addSelectedCity(value);
    this.setInLocalStorageSelectedCity();
  }

  public checkLocalStorage() {
    this.parseFromLocalStorageSelectedCity()
  }

  setInLocalStorageSelectedCity () {
    this.localStorageManager.set(KEY_SELECTED, this.selectedCities)
  }

  parseFromLocalStorageSelectedCity () {
    const data = this.localStorageManager.get(KEY_SELECTED);
    const status = this.checkValidationData(data);

    if (status) {
      this.selectedCities = data;
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
}

