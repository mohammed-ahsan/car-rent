'use client';

import Image from 'next/image';

import { useState } from 'react';

interface ImageBoxTypes {
  customStyles?: string;
  imageUrl: string;
  customImageStyles?: string;
}

const ImageBox = ({ customStyles, imageUrl, customImageStyles }: ImageBoxTypes) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative w-full h-24 bg-primary-blue-100 rounded-lg ${
        !isLoaded && 'animate-pulse'
      } ${customStyles}`}
    >
      <Image
        src={imageUrl}
        alt="car model"
        fill
        priority
        className={`object-contain ${customImageStyles}`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ImageBox;
