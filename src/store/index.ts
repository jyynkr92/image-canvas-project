import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import commonReducer from 'store/common/reducer';
import commonSaga from 'store/common/saga';
import { Common } from 'store/common/types';
import galleryReducer from 'store/gallery/reducer';
import gallerySaga from 'store/gallery/saga';
import { Gallery } from 'store/gallery/types';

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
