import { cn } from '@/lib/shadcn/utils';
import { TRPCReactQueryProvider } from '@/lib/trpc/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Test',
  description: 'Test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full bg-gray-100" lang="en">
      <body className={cn(inter.className, 'h-full')}>
        <TRPCReactQueryProvider>{children}</TRPCReactQueryProvider>
      </body>
    </html>
  );
}
