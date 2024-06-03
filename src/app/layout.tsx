import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionWrapper from '@/components/SessionWrapper';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';
import BuyMeACoffee from '@/components/BuyMeACoffee';
import Script from 'next/script';
import BuyMeACoffeeButton from '@/components/BuyMeACoffee';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Repo Purge',
  description: 'Github Repository bulk delete tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <TooltipProvider>
        <html lang="en">
          <body className={cn(inter.className, 'dark bg-black flex flex-col')}>
            <Navbar></Navbar>
            <main className="pt-18">{children}</main>
            <Footer></Footer>
            <div className="z-50">
              <Toaster />
            </div>
          </body>
        </html>
      </TooltipProvider>
    </SessionWrapper>
  );
}
