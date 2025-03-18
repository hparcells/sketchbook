import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

import GalleryInfiniteScroll from '@/components/GalleryInfiniteScroll';

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
      <GalleryInfiniteScroll images={images} />
    </>
  );
}

export default GalleryPage;
