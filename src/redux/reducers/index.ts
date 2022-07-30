import {combineReducers} from 'redux';
import {weatherReducer} from './weather.reducer';
import {locationReducer} from './location.reducer';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
