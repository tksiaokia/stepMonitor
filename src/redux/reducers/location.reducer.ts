import {GET_WEATHER, WeatherResponseInterface} from '../types/weather.types';
import {
  GET_LOCATION,
  LocationInterface,
  LOCATION_PERMISSION_STATUS,
} from '../types/location.types';

interface LocationState {
  location?: LocationInterface;
  status?: boolean;
}

const initialState: LocationState = {
  location: undefined,
  status: undefined,
};

export function locationReducer(
  state: LocationState = initialState,
  action: any,
): LocationState {
  switch (action.type) {
    case GET_LOCATION: {
      return {
        ...state,
        location: action.payload,
      };
    }
    case LOCATION_PERMISSION_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}
