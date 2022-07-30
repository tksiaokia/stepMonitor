import {ActionCreator, Dispatch} from 'redux';
import RNLocation from 'react-native-location';

import {
  GET_LOCATION,
  LocationActionTypes,
  LocationInterface,
  LOCATION_PERMISSION_STATUS,
} from '../types/location.types';
import {failure, request} from './common.actions';

const getLocationSuccess: ActionCreator<LocationActionTypes> = (
  location: LocationInterface,
) => {
  return {type: GET_LOCATION, payload: location};
};

const locationPermissionStatus: ActionCreator<LocationActionTypes> = (
  status: boolean,
) => {
  return {type: LOCATION_PERMISSION_STATUS, payload: status};
};

export const getLocation = () => async (dispatch: Dispatch<any>) => {
  let permission = await RNLocation.checkPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse', // or 'fine'
    },
  });
  var location = null;
  if (permission) {
    location = await RNLocation.getLatestLocation({timeout: 100});
    console.log(location);
    dispatch(locationPermissionStatus(permission));
  } else {
    let granted = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    });
    dispatch(locationPermissionStatus(granted));
    if (granted) {
      location = await RNLocation.getLatestLocation({timeout: 100});
    }
  }

  if (location != null)
    dispatch(
      getLocationSuccess({
        lat: location.latitude,
        long: location.longitude,
      }),
    );
  else dispatch(getLocationSuccess(null));
};
