import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rootstate } from 'store';
import { getGalleryDetail, setGalleryReset } from 'store/gallery/actions';
import { isModifier } from 'typescript';

type Params = {
  imageId: string;
};

type GalleryDetailProps = RouteComponentProps<Params>;

function Gallery({ match }: GalleryDetailProps) {
  const { imageId } = match.params;
  const { image } = useSelector((state: Rootstate) => state.gallery);
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = window.innerWidth - 80;
  const height = window.innerHeight - 80;

  useEffect(() => {
    if (!image.id) {
      dispatch(getGalleryDetail({ id: imageId }));
    }
    return () => {
      dispatch(setGalleryReset());
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const img = new Image();
    img.onload = function () {
      context.drawImage(img, 0, 0, width, height);
    };

    img.src = image.downloadUrl;
  }, [image.id]);

  return (
    <div className='detail_wrapper'>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}

export default Gallery;
