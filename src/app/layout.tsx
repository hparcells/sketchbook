import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { Provider } from '@/components/ui/provider';

import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Sketchbook',
  description: 'Online sketchbook explorer.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
