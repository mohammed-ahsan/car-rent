import React from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  return (
    <div className="w-[100svw] h-[100svh] bg-white text-white z-[100] fixed top-0 left-0 flex justify-center items-center">
      <Image priority src="/loading.gif" alt="loading" width={200} height={200} />
    </div>
  );
};

export default LoadingScreen;
