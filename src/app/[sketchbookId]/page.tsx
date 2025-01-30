import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Link as ChakraLink, Heading, Image, Text } from '@chakra-ui/react';

import { getSketchbook } from '@/actions/sketchbook';

async function Sketchbook({ params }: { params: Promise<{ sketchbookId: string }> }) {
  const sketchbookId = (await params).sketchbookId;
  const sketchbook = await getSketchbook(sketchbookId);

  if (!sketchbook) {
    redirect('/');
  }

  const pages = sketchbook.pages;

  return (
    <div className='max-w-[1200px] w-full m-auto p-4'>
      <ChakraLink asChild className='mb-4'>
        <Link href='/'>Back</Link>
      </ChakraLink>

      <div className='mb-4'>
        <Heading size='2xl'>{sketchbook.name}</Heading>
        <Text className='whitespace-pre-line'>{sketchbook.description}</Text>
      </div>
      <div className='flex flex-col gap-1'>
        {pages.map((page) => {
          return (
            <Image
              src={`${sketchbook.pageRootUrl}${page.fileName}`}
              alt={page.name}
              key={page.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sketchbook;
