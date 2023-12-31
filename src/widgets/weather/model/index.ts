import { useCurrentGeoPosition } from '@/shared/hooks/index';
import { DataLayer } from '../data/index';

import type {
  WeatherData,
  SelectedCity,
} from "../types";

const KEY_SELECTED = 'SELECTED';
const DEFAULT_ID = 4930956;

export class Weather {
  public isFindingCityWeather: boolean
  public data: WeatherData
  public selectedCities: SelectedCity[]
  public isNotFind: boolean
  private dataLayer: DataLayer

  constructor () {
    this.data = {};
    this.isNotFind = false;
    this.isFindingCityWeather = false;
    this.selectedCities = [];
    this.dataLayer = new DataLayer();
  }

  private async getParams () {
    if (this.selectedCities.length > 0) {
      return { id: this.selectedCities[0]?.id }
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

  get isFetchingWeather () {
    return this.dataLayer.isFetchingWeather
  }

  public async getData() {
    const params = await this.getParams();
    const { data } = await this.dataLayer.getDataWeather(params);
    if (data) {
      this.data = data;
    } else {
      console.log('Ошибка при загрузке данных');
    }
  }

  public changeSelectedCities (values: SelectedCity[]) {
    this.selectedCities = values;
    this.setInLocalStorageSelectedCity();
    this.fetchData()
  }

  public deleteSelectedCity (deleteId: number) {
    this.selectedCities = this.selectedCities.filter(({ id }) => id !== deleteId);
    this.setInLocalStorageSelectedCity();
  }

  public addSelectedCity (data: SelectedCity) {
    this.selectedCities = [ ...this.selectedCities, data];
  }

  public async findCity (city: string) {
    if (!city) {
      return;
    }
    this.resetIsNotFind();
    this.isFindingCityWeather = true;
    const { data } = await this.dataLayer.getDataWeather({ q: city });
    this.isFindingCityWeather = false;
    if (data) {
      this.addToSelected(data);
    } else {
      console.log('Ошибка при добавлении в избранное');
    }
  }

  public resetIsNotFind () {
    this.isNotFind = false;
  }

  public addToSelected (data: WeatherData) {
    const value: SelectedCity = {
      city: data?.city,
      country: data?.country,
      id: data?.id,
    }

    this.addSelectedCity(value);
    this.setInLocalStorageSelectedCity();
  }

  public checkLocalStorage() {
    const { status, data } = this.dataLayer.parseFromLocalStorageSelectedCity(KEY_SELECTED);
    if (status) {
      this.selectedCities = data;
    }
  }

  public setInLocalStorageSelectedCity () {
    this.dataLayer.setInLocalStorageSelectedCity(KEY_SELECTED, this.selectedCities)
  }

  async fetchData () {
    this.checkLocalStorage();
    await this.getData()
  }

  public getHeaderName(isSettingActive: boolean) {
    if (isSettingActive) {
      return 'Settings';
    }
    const city = this.data.city;
    const country = this.data.country
    if (city && country) {
      return `${city}, ${country}`
    }
    return '';
  }
}

