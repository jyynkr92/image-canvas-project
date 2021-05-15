import { DETAIL_GALLERY_REQUEST, LIST_GALLERY_REQUEST } from './types';

export const getGalleryList = () => ({
  type: LIST_GALLERY_REQUEST,
});

export const getGalleryDetail = ({ id }: { id: string }) => ({
  type: DETAIL_GALLERY_REQUEST,
  id,
});
