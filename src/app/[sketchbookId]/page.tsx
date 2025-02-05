import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Link as ChakraLink, Collapsible, Heading, Image, Text } from '@chakra-ui/react';

import { getSketchbook } from '@/actions/sketchbook';

import { chunkArray } from '@/util/array';

async function Sketchbook({ params }: { params: Promise<{ sketchbookId: string }> }) {
  const sketchbookId = (await params).sketchbookId;
  const sketchbook = await getSketchbook(sketchbookId);

  if (!sketchbook) {
    redirect('/');
  }

  const chunks = chunkArray(sketchbook.pages, 10);

  return (
    <div className='max-w-[1200px] w-full m-auto p-4'>
      <ChakraLink asChild className='mb-4'>
        <Link href='/'>Back</Link>
      </ChakraLink>

      <div className='mb-4'>
        <Heading size='2xl'>{sketchbook.name}</Heading>
        <Text className='whitespace-pre-line mb-2'>{sketchbook.description}</Text>
        <Text>Click to expand/collapse the below categories.</Text>
      </div>
      {chunks.map((pages, i) => {
        return (
          <Collapsible.Root
            className='mt-2'
            // defaultOpen={chunks.length === i + 1}
            key={i}
          >
            <Collapsible.Trigger className='cursor-pointer'>
              <Heading size='xl' className='mb-2'>
                Pages {1 + i * 20}-
                {pages.length === 10 ? (i + 1) * 20 : (chunks.length - 1) * 20 + 2 * pages.length}
              </Heading>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div className='flex flex-col gap-1'>
                {pages.map((page, j) => {
                  return (
                    <Image
                      src={
                        process.env.NODE_ENV === 'production'
                          ? `${sketchbook.pageRootUrl}${page.fileName}`
                          : 'https://picsum.photos/3200/2500'
                      }
                      id={`${i * 20 + j * 2 + 1}`}
                      alt={page.name}
                      key={page.id}
                      loading='lazy'
                    />
                  );
                })}
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        );
      })}
    </div>
  );
}

export default Sketchbook;
