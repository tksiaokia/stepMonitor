import {ActionCreator, Dispatch} from 'redux';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import {StepActionTypes} from '../types';
import {
  GET_STEP_COUNT,
  GET_STEP_GOAL,
  StepCountInterface,
  STEP_COUNT_PERMISSION_STATUS,
} from '../types/step.types';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

const getStepCountSuccess: ActionCreator<StepActionTypes> = (
  stepCount: StepCountInterface[],
) => {
  return {type: GET_STEP_COUNT, payload: stepCount};
};

const stepCountPermissionStatus: ActionCreator<StepActionTypes> = (
  status: boolean,
) => {
  return {type: STEP_COUNT_PERMISSION_STATUS, payload: status};
};

const getStepGoalSuccess: ActionCreator<StepActionTypes> = (
  stepGoal: number,
) => {
  return {type: GET_STEP_GOAL, payload: stepGoal};
};

export const getStepGoal = () => async (dispatch: Dispatch<any>) => {
  try {
    const goal = await AsyncStorage.getItem('@step_goal');
    //default 1k
    dispatch(getStepGoalSuccess(Number.parseInt(goal ?? '1000')));
  } catch (e) {
    // saving error
  }
};

export const setStepGoal =
  (goal: number) => async (dispatch: Dispatch<any>) => {
    try {
      await AsyncStorage.setItem('@step_goal', goal.toString());
      dispatch(getStepGoalSuccess(goal));
    } catch (e) {
      // saving error
    }
  };
export const getStepCount = () => async (dispatch: Dispatch<any>) => {
  AppleHealthKit.initHealthKit(
    permissions,
    (error: string, value: HealthValue) => {
      if (error) {
        dispatch(stepCountPermissionStatus(false));
        console.log('[ERROR] Cannot grant permissions!');
      }
      dispatch(stepCountPermissionStatus(true));

      let today = new Date();
      let last7Day = new Date(today.getDate() - 7);
      let options = {
        startDate: last7Day.toISOString(), // required
        endDate: today.toISOString(), // optional; default now
      };
      AppleHealthKit.getDailyStepCountSamples(
        options,
        (err: Object, results: HealthValue[]) => {
          if (err) {
            return;
          }

          var groupedResult: any[] = [];
          results.reduce(function (res: any, value) {
            let date = moment(value.startDate).format('yyyy/MM/DD');
            if (!res[date]) {
              res[date] = {startDate: date, endDate: date, value: 0};
              groupedResult.push(res[date]);
            }
            res[date].value += value.value;
            return res;
          }, {});
          dispatch(getStepCountSuccess(groupedResult));
        },
      );
    },
  );
};
