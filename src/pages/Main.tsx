import GalleryImage from 'components/gallery/GalleryImage';
import { push } from 'lib/browserHistory';
import { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from 'store';
import { getGalleryList, setGalleryReset } from 'store/gallery/actions';

function Main() {
  const dispatch = useDispatch();
  const { list } = useSelector((state: Rootstate) => state.gallery);

  useEffect(() => {
    dispatch(getGalleryList());

    return () => {
      dispatch(setGalleryReset());
    };
  }, [dispatch]);

  const onImageClick = (e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    id && push(`/gallery/${id}`);
  };

  return (
    <div className='main_wrapper'>
      {list.map((data) => (
        <GalleryImage image={data} onClick={onImageClick} key={data.id} />
      ))}
    </div>
  );
}

export default Main;
