'use client';

import { useRouter } from 'next/navigation';
import { Button, Heading, Input, Stack, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import DeleteSketchbookDialog from '@/components/dialog/DeleteSketchbookDialog';
import { Field } from '@/components/ui/field';

import { updateSketchbook } from '@/actions/sketchbook';

import { FullSketchbook } from '@/types/types';

interface SketchbookSettingsFormValues {
  name: string;
  shortDescription: string;
  description: string;
  pageRootUrl: string;
}

function SketchbookSettings({ sketchbook }: { sketchbook: FullSketchbook }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SketchbookSettingsFormValues>({
    defaultValues: {
      name: sketchbook.name,
      shortDescription: sketchbook.shortDescription || '',
      description: sketchbook.description || '',
      pageRootUrl: sketchbook.pageRootUrl
    }
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    await updateSketchbook(
      sketchbook.id,
      data.name,
      data.shortDescription,
      data.description,
      data.pageRootUrl
    );

    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack align='flex-start'>
        <Field label='Name' invalid={!!errors.name} errorText={errors.name?.message} required>
          <Input
            {...register('name', { required: 'Name is required.' })}
            placeholder='My Sketchbook'
          />
        </Field>
        <Field
          label='Short Description'
          invalid={!!errors.shortDescription}
          errorText={errors.shortDescription?.message}
        >
          <Input {...register('shortDescription')} placeholder='This is my sketchbook.' />
        </Field>
        <Field
          label='Description'
          invalid={!!errors.description}
          errorText={errors.description?.message}
        >
          <Textarea
            {...register('description')}
            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            h={40}
          />
        </Field>
        <Field
          label='Page Root URL'
          helperText='Include the full URL including the trailing slash.'
          invalid={!!errors.pageRootUrl}
          errorText={errors.pageRootUrl?.message}
          required
        >
          <Input
            {...register('pageRootUrl', {
              required: 'URL is required.',
              pattern: {
                value: /(https?:\/\/)(\w+)\.([A-Z-a-z]{2,24})([/\w.-]*)\/{1}$/,
                message: 'Invalid URL.'
              }
            })}
            placeholder='https://cdn.example.com/sketchbook/'
          />
        </Field>
        <Button type='submit' className='mt-4' disabled={!isValid}>
          Save
        </Button>
      </Stack>

      <Heading size='xl' className='mt-8'>
        Danger Zone
      </Heading>
      <DeleteSketchbookDialog sketchbook={sketchbook} />
    </form>
  );
}

export default SketchbookSettings;
