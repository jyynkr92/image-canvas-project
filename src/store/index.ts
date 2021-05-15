import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import galleryReducer from './gallery/reducer';
import gallerySaga from './gallery/saga';
import { Gallery } from './gallery/types';

export type Rootstate = {
  gallery: Gallery;
};

export function* rootSaga() {
  yield all([gallerySaga()]);
}

const rootReducer = combineReducers({
  gallery: galleryReducer,
});

export default rootReducer;
