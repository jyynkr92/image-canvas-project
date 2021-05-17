import {
  DETAIL_GALLERY_REQUEST,
  LIST_GALLERY_REQUEST,
  SET_GALLERY_RESET,
} from 'store/gallery/types';

export const getGalleryList = () => ({
  type: LIST_GALLERY_REQUEST,
});

export const getGalleryDetail = ({ id }: { id: string }) => ({
  type: DETAIL_GALLERY_REQUEST,
  id,
});

export const setGalleryReset = () => ({
  type: SET_GALLERY_RESET,
});
