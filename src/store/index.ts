import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import commonReducer from './common/reducer';
import commonSaga from './common/saga';
import { Common } from './common/types';
import galleryReducer from './gallery/reducer';
import gallerySaga from './gallery/saga';
import { Gallery } from './gallery/types';

export type Rootstate = {
  gallery: Gallery;
  common: Common;
};

export function* rootSaga() {
  yield all([gallerySaga(), commonSaga()]);
}

const rootReducer = combineReducers({
  gallery: galleryReducer,
  common: commonReducer,
});

export default rootReducer;
