import { Stack } from '@chakra-ui/react';

import CreatePageDialog from '@/components/dialog/CreatePageDialog';

import { FullSketchbook } from '@/types/types';

function SketchbookPages({ sketchbook }: { sketchbook: FullSketchbook }) {
  return (
    <Stack align='flex-start'>
      <CreatePageDialog sketchbook={sketchbook} />
      <p>{JSON.stringify(sketchbook.pages)}</p>
    </Stack>
  );
}

export default SketchbookPages;
