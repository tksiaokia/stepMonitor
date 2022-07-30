import {combineReducers} from 'redux';
import {weatherReducer} from './weather.reducer';
import {locationReducer} from './location.reducer';
import {stepReducer} from './step.reducer';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
  step: stepReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
