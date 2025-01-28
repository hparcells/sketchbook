'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { RiAddFill } from 'react-icons/ri';

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
import { Field } from '@/components/ui/field';

import { createSketchbook } from '@/actions/sketchbook';

import { SketchbookCreationFormValues } from '@/types/types';

function CreateSketchbookDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SketchbookCreationFormValues>();

  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setDisabled(true);
    const sketchbook = await createSketchbook(data);

    router.push(`/admin/${sketchbook.id}`);
  });

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>
          <RiAddFill /> Create Sketchbook
        </Button>
      </DialogTrigger>
      <DialogContent className='ml-2 mr-2'>
        <DialogHeader>
          <DialogTitle>Create Sketchbook</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={onSubmit}>
            <Stack>
              <Field label='Name' invalid={!!errors.name} errorText={errors.name?.message} required>
                <Input
                  {...register('name', { required: 'Name is required.' })}
                  placeholder='My Sketchbook'
                />
              </Field>
            </Stack>
          </form>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogActionTrigger>
          <Button type='submit' disabled={!isValid || disabled}>
            Create
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default CreateSketchbookDialog;
