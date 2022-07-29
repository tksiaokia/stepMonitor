export interface WeatherResponseInterface {
  timezone: string;
  current: CurrentWeatherInterface;
  daily: WeatherForecaseInterface[];
}

export interface CurrentWeatherInterface {
  dt: number;
  weather: WeatherInterface[];
  temp: number;
}

export interface WeatherForecaseInterface {
  dt: number;
  weather: WeatherInterface[];
  temp: WeatherTemperatureInterface;
}

export interface WeatherInterface {
  description: string;
  icon: string;
}

export interface WeatherTemperatureInterface {
  min: number;
  max: number;
}

export const GET_WEATHER = 'GET_WEATHER';

interface GetWeatherAction {
  type: typeof GET_WEATHER;
  payload: WeatherResponseInterface;
}

export type WeatherActionTypes = GetWeatherAction;
