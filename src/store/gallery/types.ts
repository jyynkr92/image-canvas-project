export interface Gallery {
  list: Array<ImageInfo>;
  image: ImageInfo;
}

export interface ImageInfo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  downloadUrl: string;
  next?: string;
  prev?: string;
}

export const LIST_GALLERY_REQUEST = 'LIST_GALLERY_REQUEST';
export const LIST_GALLERY_SUCCESS = 'LIST_GALLERY_SUCCESS';

export const DETAIL_GALLERY_REQUEST = 'DETAIL_GALLERY_REQUEST';
export const DETAIL_GALLERY_SUCCESS = 'DETAIL_GALLERY_SUCCESS';

export const GALLERY_FAILURE = 'GALLERY_FAILURE';

export const SET_GALLERY_RESET = 'SET_GALLERY_RESET';
