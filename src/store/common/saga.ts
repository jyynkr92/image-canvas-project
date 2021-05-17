import { all, takeEvery, put } from '@redux-saga/core/effects';
import { CANCEL_LOADING, SET_LOADING } from 'store/common/types';

function* setLoading() {
  yield put({
    type: SET_LOADING,
  });
}

function* cancelLoading() {
  yield put({
    type: CANCEL_LOADING,
  });
}

function* commonRequest() {
  yield takeEvery(
    (action: any) => action.type.substring(action.type.lastIndexOf('_') + 1) === 'REQUEST',
    setLoading
  );
  yield takeEvery(
    (action: any) =>
      action.type.substring(action.type.lastIndexOf('_') + 1) === 'FAILURE' ||
      action.type.substring(action.type.lastIndexOf('_') + 1) === 'RESET' ||
      action.type.substring(action.type.lastIndexOf('_') + 1) === 'SUCCESS',
    cancelLoading
  );
}

export default function* commonSaga() {
  yield all([commonRequest()]);
}
