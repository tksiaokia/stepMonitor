import {ActionCreator, AnyAction, Dispatch} from 'redux';

import {weatherService} from '../../services/weather.services';
import {
  GET_WEATHER,
  WeatherActionTypes,
  WeatherResponseInterface,
} from '../types';
import {failure, request} from './common.actions';

const getWeatherSuccess: ActionCreator<WeatherActionTypes> = (
  weather: WeatherResponseInterface,
) => {
  return {type: GET_WEATHER, payload: weather};
};

export const getWeather =
  (lat: number, long: number) => async (dispatch: Dispatch<any>) => {
    dispatch(request());
    await weatherService.getWeather(lat, long).then(
      response => {
        dispatch(getWeatherSuccess(response));
      },
      error => {
        dispatch(failure('Server error.'));
      },
    );
  };
