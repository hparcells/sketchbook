import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Link as ChakraLink, Em, Heading, Tabs, Text } from '@chakra-ui/react';
import { FaCalendar, FaCog, FaImage } from 'react-icons/fa';

import SketchbookDays from '@/components/tabs/SketchbookDays';
import SketchbookPages from '@/components/tabs/SketchbookPages';
import SketchbookSettings from '@/components/tabs/SketchbookSettings';

import { getSketchbook } from '@/actions/sketchbook';

async function AdminSketchbook({ params }: { params: Promise<{ sketchbookId: string }> }) {
  const sketchbookId = (await params).sketchbookId;
  const sketchbook = await getSketchbook(sketchbookId);

  if (!sketchbook) {
    redirect('/admin');
  }

  return (
    <div className='max-w-[1000px] w-full m-auto p-4'>
      <ChakraLink asChild className='mb-4'>
        <Link href='/admin'>Back</Link>
      </ChakraLink>

      <div className='mb-4'>
        <Heading size='2xl'>{`Manage "${sketchbook.name}"`}</Heading>
        <Text textStyle='sm' color='gray.400'>
          <Em>{sketchbook.id}</Em>
        </Text>
      </div>

      <Tabs.Root defaultValue='pages' variant='line'>
        <Tabs.List>
          <Tabs.Trigger value='pages'>
            <FaImage />
            Pages
          </Tabs.Trigger>
          <Tabs.Trigger value='days'>
            <FaCalendar />
            Days
          </Tabs.Trigger>
          <Tabs.Trigger value='settings'>
            <FaCog />
            Settings
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='pages'>
          <SketchbookPages />
        </Tabs.Content>
        <Tabs.Content value='days'>
          <SketchbookDays />
        </Tabs.Content>
        <Tabs.Content value='settings'>
          <SketchbookSettings sketchbook={sketchbook} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default AdminSketchbook;
