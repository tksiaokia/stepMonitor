import {GET_WEATHER, WeatherResponseInterface} from '../types/weather.types';

interface WeatherState {
  weatherResponse: WeatherResponseInterface;
  error?: string;
}

const initialState: WeatherState = {
  weatherResponse: <WeatherResponseInterface>{},
  error: undefined,
};
export function weatherReducer(
  state: WeatherState = initialState,
  action: any,
): WeatherState {
  switch (action.type) {
    case GET_WEATHER: {
      return {
        ...state,
        weatherResponse: action.payload,
      };
    }
    default:
      return state;
  }
}
