import {WeatherResponseInterface} from '../redux/types/weather.types';
import {httpGet} from './helpers.services';
import {weatherUrl} from '../constants/constant';

export const weatherService = {
  getWeather,
};

async function getWeather(
  lat: number,
  long: number,
): Promise<WeatherResponseInterface> {
  //'?lat=3.147424&lon=101.694999&exclude=minutely&units=metric&appid=58b7da87728d27461956c2e57d51d4a4',

  return httpGet(
    weatherUrl +
      `?lat=${lat}&lon=${long}&exclude=minutely&units=metric&appid=58b7da87728d27461956c2e57d51d4a4`,
  );
}
