'use client';

import { useRouter } from 'next/navigation';
import { Button, Input } from '@chakra-ui/react';
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

interface SketchbookCreationFormValues {
  name: string;
}

function CreateSketchbookDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SketchbookCreationFormValues>();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const sketchbook = await createSketchbook(data.name);

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
            <Field label='Name' invalid={!!errors.name} errorText={errors.name?.message} required>
              <Input
                {...register('name', { required: 'Name is required.' })}
                placeholder='My Sketchbook'
              />
            </Field>
          </form>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogActionTrigger>
          <Button type='submit'>Create</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default CreateSketchbookDialog;
