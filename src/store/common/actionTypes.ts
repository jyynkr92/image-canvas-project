import { CANCEL_LOADING, SET_LOADING } from './types';

export interface SetLoadingAction {
  type: typeof SET_LOADING;
}

export interface CancelLoadingAction {
  type: typeof CANCEL_LOADING;
}

export type CommonActionTypes = SetLoadingAction | CancelLoadingAction;
