import Link from 'next/link';
import { Heading } from '@chakra-ui/react';

import { getSketchbooks } from '@/actions/sketchbook';

async function Home() {
  const sketchbooks = await getSketchbooks();

  return (
    <div className='max-w-[1000px] w-full m-auto p-4'>
      <Heading size='2xl'>Sketchbooks</Heading>
      <ul className='list-disc list-inside'>
        {sketchbooks.map((sketchbook) => {
          return (
            <li key={sketchbook.id}>
              <Link href={sketchbook.id} className='underline text-blue-500 hover:text-blue-700'>
                {sketchbook.name}
              </Link>
              : {sketchbook.shortDescription || '(No description provided)'}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
