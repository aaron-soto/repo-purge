'use client';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import { CHANGELOG } from '@/lib/data';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';

const Links = [
  {
    text: 'Dashboard',
    href: 'repos',
  },
  {
    text: 'Help',
    href: 'help',
  },
  {
    text: 'Contact',
    href: 'contact',
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [changeLogOpen, setChangeLogOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b h-18 bg-black/60 backdrop-blur-lg">
      <div className="container">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="text-lg">
                Repo Purge
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {Links.map((link, idx) => {
                  return (
                    <a
                      key={idx}
                      href={link.href}
                      className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-secondary hover:text-white"
                    >
                      {link.text}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={() => setChangeLogOpen(!changeLogOpen)}
              className="relative p-2 text-gray-400 bg-black rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View Change Log</span>
              <History className="" />
            </button>

            <div className="relative ml-3">
              <div className="h-full">
                {session?.user ? (
                  <button
                    type="button"
                    className="relative flex h-full text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                      src={session?.user?.image as string}
                      alt=""
                    />
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="px-3 py-2 text-sm font-medium rounded-md bg-secondary hover:bg-gray-800 hover:text-white"
                  >
                    Get Started
                  </Link>
                )}
              </div>

              {userMenuOpen && (
                <div
                  className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white cursor-pointer hover:text-yellow-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Donate & Support
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white cursor-pointer hover:text-yellow-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-1"
                  >
                    Report a bug
                  </a>
                  <a
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-white cursor-pointer hover:text-yellow-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              )}

              {changeLogOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-[300px] max-h-96 origin-top-right rounded-lg bg-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto custom-scrollbar"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="change-log-button"
                  tabIndex={-1}
                >
                  {CHANGELOG.map((change, idx) => {
                    return (
                      <>
                        <div
                          key={idx}
                          className="block px-3 py-4 text-base font-medium text-gray-300 rounded-md"
                        >
                          <a
                            href={change.githubLink}
                            className="text-yellow-300 underline"
                          >
                            {change.date}
                          </a>
                          <span className="text-black font-mono ml-4 px-[6px] py-[2px] -translate-y-1 text-xs inline-block font-normal rounded-lg bg-white">
                            {change.version}
                          </span>
                          <ul className="py-2 ps-4">
                            {change.changes.map((text, changeIdx) => (
                              <li
                                key={changeIdx}
                                className="text-sm list-disc list-inside "
                              >
                                {text}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {idx !== CHANGELOG.length - 1 && (
                          <div className="px-2">
                            <Separator className="bg-[#434242] h-[.5px]" />
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {Links.map((link, idx) => {
              return (
                <a
                  key={idx}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  {link.text}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
