import { MouseEvent } from 'react';
import { ImageInfo } from 'store/gallery/types';

interface GalleryImageProps {
  image: ImageInfo;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

function GalleryImage({ image, onClick }: GalleryImageProps) {
  return (
    <div className="image_wrapper">
      <img
        src={image.downloadUrl}
        id={image.id}
        width={image.width}
        height={image.height}
        onClick={onClick}
        alt={image.author}
      />
    </div>
  );
}

export default GalleryImage;
