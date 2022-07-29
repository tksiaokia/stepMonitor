import { WeatherResponseInterface } from '../redux/types/weather.types';
import { httpGet } from './helpers.services';

export const weatherService = {
  getWeather,
};

async function getWeather(): Promise<WeatherResponseInterface> {
  return httpGet(
    'https://api.openweathermap.org/data/2.5/onecall?lat=3.147424&lon=101.694999&exclude=minutely&units=metric&appid=58b7da87728d27461956c2e57d51d4a4',
  );
}
