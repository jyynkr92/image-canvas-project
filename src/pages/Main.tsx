import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGalleryList } from 'store/gallery/actions';

function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGalleryList());
  }, []);
  return <div>Main</div>;
}

export default Main;
