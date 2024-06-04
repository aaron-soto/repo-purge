'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { FEATURES, STEPS, FUNNY_EMAILS } from '@/lib/data';
import { sendContactEmail } from '@/lib/emails';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Loader } from 'lucide-react';

export type NewsletterFormData = {
  email: string;
};

export default function Home() {
  const { data: session } = useSession();
  const [randomEmail, setRandomEmail] = useState<string>('');
  const { toast } = useToast();
  const [isNewsletterLoading, setIsNewsletterLoading] = useState<boolean>(false);

  useEffect(() => {
    setRandomEmail(
      FUNNY_EMAILS[Math.floor(Math.random() * FUNNY_EMAILS.length)],
    );
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>();

  const onSubmit: SubmitHandler<NewsletterFormData> = (
    data: NewsletterFormData,
  ) => {
    setIsNewsletterLoading(true);
    sendContactEmail({ data, form: 'newsletter' }).then(res => {
      if (res.ok) {
        toast({
          title: 'Successfully Joined List',
          variant: 'success',
          description: 'We promise not to spam you with emails',
        });

        setIsNewsletterLoading(false);
        reset();
      } else {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: 'Something went wrong, please try again',
        });
      }
    });
  };

  return (
    <>
      <div className="custom-black-background">
        <div className="container py-8 px-3 sm:px-[2rem]">
          <div className="flex items-center justify-center py-32 ">
            <div className="text-center">
              <h1 className="mb-4 text-4xl sm:text-5xl font-semibold">
                <span className="text-yellow-300">Effortlessly</span> Clean Up
                Your GitHub Repositories with Repo Purge
              </h1>
              <p className="mb-8 text-white/60">
                Save time and streamline your workflow by bulk deleting
                unnecessary GitHub repositories with ease.
              </p>
              {!session ? (
                <button
                  className="px-6 py-2 rounded-md bg-secondary hover:bg-secondary-lighter"
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
      <div className="container py-20 px-3 sm:px-[2rem]">
        <h2 className="text-3xl font-semibold">Features</h2>
        <p className="mb-8 text-white/50">
          Why RepoPurge is a good tool to have
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
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
      <div className="container py-20 px-3 sm:px-[2rem]">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <p className="mb-8 text-white/50">
          The simple process of using RepoPurge
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-4 ">
          {STEPS.map((feature, idx) => {
            return (
              <div key={idx} className="">
                <h2 className="mb-1 sm:mb-4 text-xl font-semibold">
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
        <div className="container py-16 md:py-32 px-3 sm:px-[2rem]">
          <h2 className="text-2xl font-semibold">Get in touch</h2>
          <p>Join our mail list to get updates on RepoPurge</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('email', { required: true })}
              type="text"
              placeholder={randomEmail}
              className="mt-2 bg-white"
            ></Input>

            <Button variant="secondary" className="mt-4 min-w-32" disabled={isNewsletterLoading}>{
              isNewsletterLoading ? <Loader className="spinner" size={20} /> : 'Join List'
            }
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
