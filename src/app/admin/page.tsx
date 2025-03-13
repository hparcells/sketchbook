import Link from 'next/link';
import { Link as ChakraLink, Em, Heading, List, Stack, Text } from '@chakra-ui/react';

import CreateSketchbookDialog from '@/components/dialog/CreateSketchbookDialog';

import { getAllSketchbooks } from '@/actions/sketchbook';

export const dynamic = 'force-dynamic';

async function Admin() {
  const sketchbooks = await getAllSketchbooks();

  return (
    <div className='max-w-[1000px] w-full m-auto p-4'>
      <ChakraLink asChild className='mb-4'>
        <Link href='/'>Home</Link>
      </ChakraLink>

      <Stack align='flex-start '>
        <Heading size='2xl'>Manage Sketchbooks</Heading>
        <CreateSketchbookDialog />
        <List.Root>
          {sketchbooks.map((sketchbook) => {
            return (
              <List.Item key={sketchbook.id}>
                <ChakraLink variant='underline' asChild>
                  <Link href={`admin/${sketchbook.id}`}>
                    {sketchbook.name}
                    {sketchbook.unlisted && <Em>(Unlisted)</Em>}
                  </Link>
                </ChakraLink>
              </List.Item>
            );
          })}
          {sketchbooks.length === 0 && <Text>No configured sketchbooks.</Text>}
        </List.Root>
      </Stack>
    </div>
  );
}

export default Admin;
