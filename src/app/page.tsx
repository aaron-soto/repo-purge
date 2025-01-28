"use client";

import { FEATURES, STEPS } from "@/lib/data";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export type NewsletterFormData = {
  email: string;
};

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className="bg-background">
        <div className="container px-3 sm:px-[2rem]">
          <div className="flex items-center justify-center py-32 ">
            <div className="text-center">
              <h1 className="mb-4 text-4xl sm:text-5xl font-semibold">
                <span className="text-primary">Effortlessly</span> Clean Up Your
                GitHub Repositories with Repo Purge
              </h1>
              <p className="mb-8 text-muted-foreground/70">
                Save time and streamline your workflow by bulk deleting
                unnecessary GitHub repositories with ease.
              </p>
              {!session ? (
                <Button onClick={() => signIn("github")}>
                  Sign in with github
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/repos">Go To Dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container py-20 px-3 sm:px-[2rem]">
        <h2 className="text-3xl font-semibold">Features</h2>
        <p className="mb-8 text-white/50">
          Why RepoPurge is a good tool to bookmark and use
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          {FEATURES.map((feature, idx) => {
            return (
              <div key={idx} className="p-8 border-secondary bg-secondary/10">
                <h2 className="mb-4 text-2xl font-semibold">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container py-14 px-3 sm:px-[2rem]">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <p className="mb-8 text-muted-foreground">
          The simple process of using RepoPurge
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-4 ">
          {STEPS.map((feature, idx) => {
            return (
              <div key={idx} className="">
                <h2 className="mb-1 sm:mb-4 text-xl font-semibold">
                  <span className="text-yellow-300">{idx + 1}</span>.{" "}
                  {feature.title}
                </h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
