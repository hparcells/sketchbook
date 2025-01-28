'use server';

import { redirect } from 'next/navigation';

import { getSession } from '@/util/auth';

export async function auth(formData: FormData) {
  const session = await getSession();

  const shouldAuthenticate = formData.get('password') === process.env.IRON_SESSION_PASSWORD;
  const redirectPath = (formData.get('redirect') as string) || '/';

  session.isAuthenticated = shouldAuthenticate;

  await session.save();

  if (!shouldAuthenticate) {
    redirect(`/sign-in?redirect=${encodeURIComponent(redirectPath)}`);
  }

  redirect(redirectPath.at(0) === '/' ? redirectPath : '/');
}
