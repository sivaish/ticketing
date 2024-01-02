import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import React from 'react';
import { Providers } from '@/components/providers/ChakraThemeProvider';

import '@/styles/globals.css';
import { ReactChildren } from '@/lib/types';
import config from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.siteName,
  description: config.siteDescription,
};

export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body suppressHydrationWarning={true} className="scrollbar-thin bg-neutrals-900 text-neutrals-50 antialiased selection:bg-primary selection:text-neutrals-50">
        <main>
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
