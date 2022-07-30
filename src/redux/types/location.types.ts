export interface LocationInterface {
  lat: number;
  long: number;
}

export const GET_LOCATION = 'GET_LOCATION';
export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const LOCATION_PERMISSION_STATUS = 'LOCATION_PERMISSION_STATUS';

interface GetLocationAction {
  type: typeof GET_LOCATION;
  payload?: LocationInterface;
}

interface LocationPermissionStatuAction {
  type: typeof LOCATION_PERMISSION_STATUS;
  payload: boolean;
}

export type LocationActionTypes =
  | GetLocationAction
  | LocationPermissionStatuAction;
