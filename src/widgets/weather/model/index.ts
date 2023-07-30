import { services } from "@/entities/Services";
import { useCurrentGeoPosition } from '@/shared/hooks/index';
import { useDewPoint } from "@/widgets/weather/model/hooks/index";
import type {
  WeatherDataResponse,
  WeatherData,
  ParamsWeatherData,
  SelectedCity,
} from "./types";

export class Weather {
  public isFetchingWeather: boolean
  public isFindingCityWeather: boolean
  public data: WeatherData
  public selectedCities: SelectedCity[]
  public isNotFind: boolean

  constructor () {
    this.isFetchingWeather = true;
    this.data = {};
    this.isNotFind = false;
    this.isFindingCityWeather = false;
    this.selectedCities = [
      {
        id: 1,
        city: 'fff',
        country: 'GE',
      },
      {
        id: 2,
        city: 'aaa',
        country: 'GE',
      },
    ]
  }

  async getParams () {
    const { latitude, longitude } = await useCurrentGeoPosition();

    const params: ParamsWeatherData = {
      // lat: latitude,
      // lon: longitude,
      id: 4930956
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
      id: data?.id,
    }
  }

  changeSelectedCities (values: SelectedCity[]) {
    this.selectedCities = values
  }

  deleteSelectedCity (deleteId: number) {
    this.selectedCities = this.selectedCities.filter(({ id }) => id !== deleteId);
  }

  addSelectedCity (data: SelectedCity) {
    this.selectedCities = [
      ...this.selectedCities,
      data,
    ];
  }

  async findCity (city: string) {
    if (!city) {
      return;
    }
    this.resetIsNotFind();
    try {
      this.isFindingCityWeather = true;
      const { data } = await services.openweather.getWeather({ q: city });
      console.log('data', data);
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

  addToSelected (data: WeatherDataResponse) {
    const value: SelectedCity = {
      city: data?.name,
      country: data?.sys?.country,
      id: data?.id,
    }

    this.addSelectedCity(value);
  }
}

