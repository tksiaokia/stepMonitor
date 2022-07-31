export interface StepCountInterface {
  date: string;
  value: number;
}

export const GET_STEP_COUNT = 'GET_STEP_COUNT';
export const STEP_COUNT_PERMISSION_STATUS = 'STEP_COUNT_PERMISSION_STATUS';
export const GET_STEP_GOAL = 'GET_STEP_GOAL';

interface GetStepCountAction {
  type: typeof GET_STEP_COUNT;
  payload?: StepCountInterface[];
}

interface StepCountPermissionStatuAction {
  type: typeof STEP_COUNT_PERMISSION_STATUS;
  payload: boolean;
}

interface GetStepGoalAction {
  type: typeof GET_STEP_GOAL;
  payload: number;
}

export type StepActionTypes =
  | GetStepCountAction
  | StepCountPermissionStatuAction
  | GetStepGoalAction;
