import {
  GET_STEP_COUNT,
  GET_STEP_GOAL,
  StepCountInterface,
  STEP_COUNT_PERMISSION_STATUS,
} from '../types';

interface StepState {
  stepCounts?: StepCountInterface[];
  permissionStatus?: boolean;
  stepGoal: number;
}

const initialState: StepState = {
  stepCounts: undefined,
  permissionStatus: undefined,
  stepGoal: 1000,
};

export function stepReducer(
  state: StepState = initialState,
  action: any,
): StepState {
  switch (action.type) {
    case GET_STEP_COUNT: {
      return {
        ...state,
        stepCounts: action.payload,
      };
    }
    case STEP_COUNT_PERMISSION_STATUS: {
      return {
        ...state,
        permissionStatus: action.payload,
      };
    }
    case GET_STEP_GOAL: {
      return {
        ...state,
        stepGoal: action.payload,
      };
    }
    default:
      return state;
  }
}
