'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Em, Stack, Text } from '@chakra-ui/react';

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { deleteSketchbook } from '@/actions/sketchbook';

import { FullSketchbook } from '@/types/types';

function DeleteSketchbookDialog({ sketchbook }: { sketchbook: FullSketchbook }) {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);

  async function onDeleteClick() {
    setDisabled(true);
    await deleteSketchbook(sketchbook.id);

    router.push('/admin');
  }

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button colorPalette='red' className='mt-4'>
          Delete Sketchbook
        </Button>
      </DialogTrigger>
      <DialogContent className='ml-2 mr-2'>
        <DialogHeader>
          <DialogTitle>{`Delete "${sketchbook.name}"?`}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack>
            <Text>{`Delete "${sketchbook.name}" and all associated pages and days?`}</Text>
            <Text>
              <Em>This action cannot be undone!</Em>
            </Text>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette='red' onClick={onDeleteClick} disabled={disabled}>
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default DeleteSketchbookDialog;
