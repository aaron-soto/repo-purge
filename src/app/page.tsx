'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FEATURES, STEPS } from '@/lib/data';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
  }

  return (
    <>
      <div className="custom-black-background">
        <div className="container py-8">
          <div className="flex items-center justify-center py-32 ">
            <div className="text-center">
              <h1 className="mb-4 text-5xl font-semibold">
                <span className="text-yellow-300">Effortlessly</span> Clean Up
                Your GitHub Repositories with Repo Purge
              </h1>
              <p className="mb-8 text-white/60">
                Save time and streamline your workflow by bulk deleting
                unnecessary GitHub repositories with ease.
              </p>
              {!session ? (
                <button
                  className="px-6 py-2 rounded-md bg-secondary"
                  onClick={() => signIn('github')}
                >
                  Sign in with github
                </button>
              ) : (
                <Link
                  className="px-6 py-2 rounded-md bg-secondary"
                  href="repos"
                >
                  Go To Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container py-20">
        <h2 className="text-3xl font-semibold">Features</h2>
        <p className="mb-8 text-white/50">
          Why RepoPurge is a good tool to have
        </p>
        <div className="grid grid-cols-2 gap-4 ">
          {FEATURES.map((feature, idx) => {
            return (
              <div
                key={idx}
                className="p-8 border border-secondary rounded-xl bg-secondary/10"
              >
                <h2 className="mb-4 text-3xl font-semibold">{feature.title}</h2>
                <p className="text-white/60">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container py-20">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <p className="mb-8 text-white/50">
          The simple process of using RepoPurge
        </p>
        <div className="grid grid-cols-3 gap-4 ">
          {STEPS.map((feature, idx) => {
            return (
              <div key={idx} className="">
                <h2 className="mb-4 text-xl font-semibold">
                  <span className="text-yellow-300">{idx + 1}</span>.{' '}
                  {feature.title}
                </h2>
                <p className="text-white/60">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grainy">
        <div className="container py-20">
          <h2 className="text-2xl font-semibold">Get in touch</h2>
          <p>Join our mail list to get updates on RepoPurge</p>

          <Input
            type="text"
            placeholder="johnDoe@gmail.com"
            className="mt-2 bg-white"
          ></Input>

          <Button variant="secondary" className="mt-4">
            Join List
          </Button>
        </div>
      </div>
    </>
  );
}
