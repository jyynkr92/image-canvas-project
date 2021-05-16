import { push } from 'lib/browserHistory';
import { useEffect, useRef, useState, WheelEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rootstate } from 'store';
import { getGalleryDetail, setGalleryReset } from 'store/gallery/actions';

type Params = {
  imageId: string;
};

type GalleryDetailProps = RouteComponentProps<Params>;

function Gallery({ match }: GalleryDetailProps) {
  const { imageId } = match.params;
  const { image } = useSelector((state: Rootstate) => state.gallery);
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rightClick, setRightClick] = useState(false);
  const [leftClick, setLeftClick] = useState(false);
  const scale = 1.1;
  const width = 500;
  const height = 500;

  useEffect(() => {
    return () => {
      dispatch(setGalleryReset());
    };
  }, []);

  useEffect(() => {
    if (!image.id || image.id !== imageId) {
      dispatch(getGalleryDetail({ id: imageId }));
    }
  }, [imageId]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const img = new Image();
    img.onload = function () {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.drawImage(img, 0, 0, width, height);
    };

    img.src = image.downloadUrl;
  }, [image.id]);

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e) {
      const isScrollUp = e.deltaY < 0;

      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      if (leftClick) {
        const img = new Image();
        const { x, y } = getMousePosition({ canvas, clientX: e.clientX, clientY: e.clientY });

        img.onload = function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.translate(x, y);
          const factor = Math.pow(scale, isScrollUp ? -1 : 1);
          context.scale(factor, factor);
          context.translate(-x, -y);
          context.drawImage(img, 0, 0, width, height);
        };

        img.src = image.downloadUrl;
      } else if (rightClick) {
        const img = new Image();

        img.onload = function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.translate(width / 2, height / 2);
          context.rotate(isScrollUp ? Math.PI / 2 : -Math.PI / 2);
          context.translate(-width / 2, -height / 2);
          context.drawImage(img, 0, 0, width, height);
        };

        img.src = image.downloadUrl;
      } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();

        isScrollUp && push(`/gallery/${image.prev}`);
        !isScrollUp && push(`/gallery/${image.next}`);
      }
    }
  };

  const getMousePosition = ({
    canvas,
    clientX,
    clientY,
  }: {
    canvas: HTMLCanvasElement;
    clientX: number;
    clientY: number;
  }) => {
    var rect = canvas.getBoundingClientRect();

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    switch (e.button) {
      case 0:
        setLeftClick(true);
        console.log('Left button clicked.');
        break;
      case 2:
        setRightClick(true);
        console.log('Right button clicked.');
        break;
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setLeftClick(false);
    setRightClick(false);
  };

  return (
    <div
      className="detail_wrapper"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}

export default Gallery;
