import Link from 'next/link';
import { Link as ChakraLink, Image } from '@chakra-ui/react';

import { getSketchbooks } from '@/actions/sketchbook';

export const dynamic = 'force-dynamic';

async function GalleryPage() {
  const sketchbooks = await getSketchbooks();
  const images = sketchbooks
    .map((sketchbook) => {
      return sketchbook.pages.map((page) => {
        return `${sketchbook.pageRootUrl}${page.fileName}`;
      });
    })
    .flat();

  return (
    <>
      <div className='p-4'>
        <ChakraLink asChild className='mb-4'>
          <Link href='/'>Back</Link>
        </ChakraLink>
      </div>
      <div className='flex flex-wrap'>
        {images.map((image, i) => {
          return (
            <Image
              src={image}
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
      </div>
    </>
  );
}

export default GalleryPage;
