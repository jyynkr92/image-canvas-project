import { all, takeLatest, put, call } from '@redux-saga/core/effects';
import { getGalleryList } from 'lib/api/galleryApi';
import { DetailGalleryRequestAction } from './actionTypes';
import { DETAIL_GALLERY_REQUEST, DETAIL_GALLERY_SUCCESS, GALLERY_FAILURE, ImageInfo, LIST_GALLERY_REQUEST, LIST_GALLERY_SUCCESS } from './types';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* list() {
  try {
    const response: ResponseGenerator = yield call(getGalleryList);
    console.log(response);
    const { data, status } = response;

    if (status === 200) {
      yield put({
        type: LIST_GALLERY_SUCCESS,
        list: data,
      });
    } else {
      throw new Error('error occured');
    }
  } catch (error) {
    yield call(failure, error);
  }
}

function* detail({ id }: DetailGalleryRequestAction) {
  try {
    const response: ResponseGenerator = yield getGalleryList;
    const { data, status } = response;

    if (status === 200) {
      const image = data.filter((data: ImageInfo) => data.id === id)[0];

      if (image) {
        yield put({
          type: DETAIL_GALLERY_SUCCESS,
          image,
        });
      } else {
        throw new Error('no data');
      }
    } else {
      throw new Error('error occured');
    }
  } catch (error) {
    yield call(failure, error);
  }
}

function* failure(error: any) {
  const { message } = error;

  message && alert(message);

  yield put({
    type: GALLERY_FAILURE,
  });
}

function* galleryRequest() {
  yield takeLatest(LIST_GALLERY_REQUEST, list);
  yield takeLatest(DETAIL_GALLERY_REQUEST, detail);
}

export default function* gallerySaga() {
  yield all([galleryRequest()]);
}
