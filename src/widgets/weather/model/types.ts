export type WeatherDataResponse = {
  base: string
  clouds: {
    all: number
  }
  cod: number
  coord: {
    lat: number
    lon: number
  }
  dt: number
  id: number
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string
  sys: {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
  }
  timezone: number
  visibility: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  wind: {
    deg: number
    gust: number
    speed: number
  }
}

export type WeatherData = {
  city?: string
  country?: string
  description?: string
  windSpeed?: number
  pressure?: number
  humidity?: number
  visibility?: number
  temp?: number
  type?: string
  dew?: number
}

export type ParamsWeatherData = {
  q?: string
  lat?: number
  lon?: number
};
