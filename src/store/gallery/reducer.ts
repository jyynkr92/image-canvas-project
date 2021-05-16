import { GalleryActionTypes } from './actionTypes';
import { DETAIL_GALLERY_SUCCESS, Gallery, SET_GALLERY_RESET, LIST_GALLERY_SUCCESS } from './types';

const initialState: Gallery = {
  list: [],
  image: {
    id: '',
    author: '',
    width: 0,
    height: 0,
    url: '',
    downloadUrl: '',
  },
};

const galleryReducer = (state = initialState, action: GalleryActionTypes) => {
  switch (action.type) {
    case LIST_GALLERY_SUCCESS:
      return {
        ...state,
        list: action.list,
      };
    case DETAIL_GALLERY_SUCCESS:
      return {
        ...state,
        image: action.image,
      };
    case SET_GALLERY_RESET:
      return {
        ...state,
        image: initialState.image,
        list: initialState.list,
      };
    default:
      return state;
  }
};

export default galleryReducer;
