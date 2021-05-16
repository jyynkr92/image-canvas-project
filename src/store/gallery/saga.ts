import { all, takeLatest, put, call } from '@redux-saga/core/effects';
import { getGalleryList } from 'lib/api/galleryApi';
import { push } from 'lib/browserHistory';
import { DetailGalleryRequestAction } from './actionTypes';
import { DETAIL_GALLERY_REQUEST, DETAIL_GALLERY_SUCCESS, GALLERY_FAILURE, LIST_GALLERY_REQUEST, LIST_GALLERY_SUCCESS } from './types';

export interface GalleryResponseData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
export interface ResponseGenerator {
  config?: any;
  data?: Array<GalleryResponseData>;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* list() {
  try {
    const response: ResponseGenerator = yield call(getGalleryList);
    const { data, status } = response;

    if (status === 200 && data) {
      const list = data.map((image) => {
        return {
          id: image.id,
          author: image.author,
          width: image.width,
          height: image.height,
          url: image.url,
          downloadUrl: image.download_url,
        };
      });

      yield put({
        type: LIST_GALLERY_SUCCESS,
        list,
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
    const response: ResponseGenerator = yield call(getGalleryList);
    const { data, status } = response;

    if (status === 200 && data) {
      const image = data.filter((image) => image.id === id)[0];

      if (image) {
        yield put({
          type: DETAIL_GALLERY_SUCCESS,
          image: {
            id: image.id,
            author: image.author,
            width: image.width,
            height: image.height,
            url: image.url,
            downloadUrl: image.download_url,
          },
        });

        push(`/gallery/${image.id}`);
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
