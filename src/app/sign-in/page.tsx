import { redirect } from 'next/navigation';
import { Button, Input } from '@chakra-ui/react';

import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';

import { auth } from '@/actions/auth';

import { getSession } from '@/util/auth';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function SignIn(props: Props) {
  const searchParams = await props.searchParams;
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect('/');
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form action={auth} className='flex flex-col gap-4'>
        <Field>
          <Input name='redirect' type='hidden' defaultValue={searchParams.redirect} />
        </Field>
        <Field label='Password' className='max-w-[250px] w-full'>
          <PasswordInput name='password' />
        </Field>
        <Button className='max-w-[250px] w-full' type='submit'>
          Log in
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
