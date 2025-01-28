"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Links = [
  {
    text: "Repos",
    href: "repos",
  },
];

const Navbar = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b h-18 bg-black/80 backdrop-blur-lg"
      id="blurred-bg"
    >
      <div className="container px-3 sm:px-[2rem]">
        <div className="relative flex items-center justify-between py-1">
          <Link href="/" className="text-xl">
            Repo Purge
          </Link>
          <div className="flex gap-2">
            <div className="flex space-x-4">
              {Links.map((link, idx) => {
                return (
                  <Button
                    key={idx}
                    className="text-white"
                    variant="link"
                    asChild
                  >
                    <Link href={link.href}>{link.text}</Link>
                  </Button>
                );
              })}
            </div>
            {session?.user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Image
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    src={session?.user?.image as string}
                    alt=""
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuItem>
                    <Link
                      href="https://buymeacoffee.com/aaron.soto.dev"
                      target="_blank"
                      className=""
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Donate & Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="https://github.com/aaron-soto/repo-purge/issues/new?template=bug-report-%F0%9F%90%9E.md"
                      target="_blank"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Report a bug
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="https://github.com/aaron-soto/repo-purge/issues/new?template=feature-request-%F0%9F%9A%80.md"
                      target="_blank"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Request a feature
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-medium rounded-md bg-secondary hover:bg-secondary-lighter hover:text-white"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
