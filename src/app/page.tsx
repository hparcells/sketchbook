import Link from 'next/link';
import { Heading, Stack, Text } from '@chakra-ui/react';

import { getSketchbooks } from '@/actions/sketchbook';

async function Home() {
  const sketchbooks = await getSketchbooks();

  return (
    <div className='max-w-[1000px] w-full m-auto p-4'>
      <Stack>
        <Heading size='2xl'>Sketchbooks</Heading>
        <ul className='list-disc list-inside'>
          {sketchbooks.map((sketchbook) => {
            return (
              <li key={sketchbook.id}>
                <Link href={sketchbook.id} className='underline text-blue-500 hover:text-blue-700'>
                  {sketchbook.name}
                </Link>{' '}
                — {sketchbook.shortDescription || '(No description provided)'}
              </li>
            );
          })}
        </ul>
        {sketchbooks.length === 0 && <Text>No published sketchbooks.</Text>}
      </Stack>
    </div>
  );
}

export default Home;
