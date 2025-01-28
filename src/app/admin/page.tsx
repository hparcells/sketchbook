import Link from 'next/link';
import { Link as ChakraLink, Heading, List, Stack } from '@chakra-ui/react';

import CreateSketchbookDialog from '@/components/dialog/CreateSketchbookDialog';

import { getSketchbooks } from '@/actions/sketchbook';

async function Admin() {
  const sketchbooks = await getSketchbooks();

  return (
    <div className='max-w-[1000px] w-full m-auto p-4'>
      <Stack align='flex-start '>
        <Heading size='xl'>Sketchbooks</Heading>
        <CreateSketchbookDialog />
        <List.Root>
          {sketchbooks.map((sketchbook) => {
            return (
              <List.Item key={sketchbook.id}>
                <ChakraLink variant='underline' asChild>
                  <Link href={`admin/${sketchbook.id}`}>{sketchbook.name}</Link>
                </ChakraLink>
              </List.Item>
            );
          })}
        </List.Root>
      </Stack>
    </div>
  );
}

export default Admin;
