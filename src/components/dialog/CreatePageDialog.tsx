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

import { createPage } from '@/actions/page';

import { FullSketchbook, PageCreationFormValues } from '@/types/types';

function CreatePageDialog({ sketchbook }: { sketchbook: FullSketchbook }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<PageCreationFormValues>({
    defaultValues: {
      name: '',
      fileName: ''
    }
  });

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setDisabled(true);
    await createPage(sketchbook.id, data);

    router.refresh();
    setOpen(false);
    reset();
    setDisabled(false);
  });

  return (
    <DialogRoot
      open={open}
      onOpenChange={(details) => {
        return setOpen(details.open);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <RiAddFill /> Create Page
        </Button>
      </DialogTrigger>
      <DialogContent className='ml-2 mr-2'>
        <DialogHeader>
          <DialogTitle>Create Page</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {/* FIXME: Form works but only when one field is present. */}
          {/* <form onSubmit={onSubmit}> */}
          <Stack>
            <Field label='Name' invalid={!!errors.name} errorText={errors.name?.message} required>
              <Input
                {...register('name', { required: 'Name is required.' })}
                placeholder='Day 500'
              />
            </Field>
            <Field
              label='File Name'
              invalid={!!errors.fileName}
              errorText={errors.fileName?.message}
              required
            >
              <Input
                {...register('fileName', {
                  required: 'File Name is required.',
                  pattern: {
                    value: /^[a-zA-Z0-9-_]+\.(png|jpg)$/,
                    message: 'Invalid File Name.'
                  }
                })}
                placeholder='727.jpg'
              />
            </Field>
          </Stack>
          {/* </form> */}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogActionTrigger>
          <Button type='submit' disabled={!isValid || disabled} onClick={onSubmit}>
            Create
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default CreatePageDialog;
