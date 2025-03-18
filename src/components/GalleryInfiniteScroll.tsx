'use client';

import { useState } from 'react';
import { Image } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

const BATCH_SIZE = 30;

function GalleryInfiniteScroll({ images }: { images: string[] }) {
  const [displayImages, setDisplayImages] = useState(images.slice(0, BATCH_SIZE));

  function fetchMore() {
    setDisplayImages((prev) => {
      return [...prev, ...images.slice(prev.length, prev.length + BATCH_SIZE)];
    });
  }

  return (
    <InfiniteScroll
      dataLength={displayImages.length}
      next={fetchMore}
      hasMore={displayImages.length < images.length}
      loader={<></>}
      className='flex flex-wrap'
    >
      {displayImages.map((image, i) => {
        return (
          <Image
            src={
              process.env.NODE_ENV === 'production'
                ? image
                : `https://picsum.photos/3200/2500?i=${i}`
            }
            alt={image}
            key={i}
            loading='lazy'
            className='
            sm:w-1/2
            md:w-1/3
            lg:w-1/4
            xl:w-1/5
          '
          />
        );
      })}
    </InfiniteScroll>
  );
}

export default GalleryInfiniteScroll;
