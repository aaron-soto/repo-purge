import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SessionWrapper from '@/components/SessionWrapper';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Repo Purge',
  description: 'Github Repository bulk delete tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <TooltipProvider>
        <html lang="en">
          <head>
            <meta
              name="keywords"
              content="GitHub, Repository, Delete, Bulk, Tool, Repo Purge"
            />
            <meta name="author" content="Aaron Soto" />
            <meta name="robots" content="index, follow" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="canonical" href="https://www.repopurge.com" />

            <meta property="og:title" content="Repo Purge" />
            <meta
              property="og:description"
              content="Github Repository bulk delete tool"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.repopurge.com" />
            <meta property="og:image" content="/images/og-image.png" />
            <meta property="og:site_name" content="Repo Purge" />
            <meta property="og:locale" content="en_US" />

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/images/favicons/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/images/favicons/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/images/favicons/favicon-16x16.png"
            />
            <link rel="manifest" href="/images/favicons/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/images/favicons/safari-pinned-tab.svg"
              color="#5b94d5"
            />
            <link rel="shortcut icon" href="/images/favicons/favicon.ico" />
            <meta name="msapplication-TileColor" content="#ffc40d" />
            <meta
              name="msapplication-config"
              content="/images/favicons/browserconfig.xml"
            />
            <meta name="theme-color" content="#000000" />
          </head>
          <body className={cn(inter.className, 'dark bg-black flex flex-col')}>
            <Navbar />
            <main className="pt-18">{children}</main>
            <Footer />
            <div className="z-50">
              <Toaster />
            </div>
          </body>
        </html>
      </TooltipProvider>
    </SessionWrapper>
  );
}
