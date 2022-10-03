import React from 'react';
import {ImageType} from '../../utils/types';

import ImageCarouselPreview from './ImageCarouselPreview';
import ImageCarousel from './ImageCarousel';

interface ImageCarouselProps {
  data: ImageType[];
  setData?: (value: ImageType[]) => void;
  imageCarouselPreview?: boolean;
}

const ImageCarouselComponent: React.FC<ImageCarouselProps> = ({
  data,
  setData,
  imageCarouselPreview,
}) => {
  if (imageCarouselPreview && setData) {
    return <ImageCarouselPreview images={data} setImages={setData} />;
  }

  return <ImageCarousel data={data} />;
};

export default ImageCarouselComponent;
