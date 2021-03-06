import {
  DETAIL_GALLERY_REQUEST,
  DETAIL_GALLERY_SUCCESS,
  SET_GALLERY_RESET,
  ImageInfo,
  LIST_GALLERY_REQUEST,
  LIST_GALLERY_SUCCESS,
} from 'store/gallery/types';

export interface ListGalleryRequestAction {
  type: typeof LIST_GALLERY_REQUEST;
}

export interface ListGallerySuccessAction {
  type: typeof LIST_GALLERY_SUCCESS;
  list: Array<ImageInfo>;
}

export interface DetailGalleryRequestAction {
  type: typeof DETAIL_GALLERY_REQUEST;
  id: string;
}

export interface DetailGallerySuccessAction {
  type: typeof DETAIL_GALLERY_SUCCESS;
  image: ImageInfo;
}

export interface SetGalleryResetAction {
  type: typeof SET_GALLERY_RESET;
}

export type ListGalleryActionTypes = ListGalleryRequestAction | ListGallerySuccessAction;
export type DetailGalleryActionTypes = DetailGalleryRequestAction | DetailGallerySuccessAction;

export type GalleryActionTypes =
  | ListGalleryActionTypes
  | DetailGalleryActionTypes
  | SetGalleryResetAction;
