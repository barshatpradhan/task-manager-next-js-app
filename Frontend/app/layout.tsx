import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// @ts-ignore: side-effect CSS import (no type declarations)
import  './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A fullstack task management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}