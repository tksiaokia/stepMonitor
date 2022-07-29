import {ThunkAction, ThunkDispatch} from 'redux-thunk';

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

export const getWeather = () => async (dispatch: Dispatch<any>) => {
  dispatch(request());
  await weatherService.getWeather().then(
    response => {
      console.log(response);
      dispatch(getWeatherSuccess(response));
    },
    error => {
      dispatch(failure('Server error.'));
    },
  );
};
