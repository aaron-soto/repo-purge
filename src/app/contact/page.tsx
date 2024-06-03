'use client';

import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { sendContactEmail } from '@/lib/emails';
import { useForm, SubmitHandler } from 'react-hook-form';

export type ContactFormData = {
  email: string;
  name: string;
  message: string;
};

const Page = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = data => {
    sendContactEmail({ data, form: 'contact' }).then(res => {
      if (res.ok) {
        toast({
          title: 'Message sent',
          variant: 'success',
          description: 'We will get back to you as soon as possible',
        });

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
    <div className="container py-20">
      <PageHeader>Contact Us</PageHeader>
      <p>
        Got a technical issue? Want to send feedback about a beta feature? Need
        details about our Business plan? Let us know.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 mb-8">
          <Label>Your Email</Label>
          <Input
            type="text"
            placeholder="JohnDoe@gmail.com"
            {...register('email', { required: true })}
          ></Input>
        </div>
        <div className="mb-8">
          <Label>Your Name</Label>
          <Input
            type="text"
            placeholder="John Doe"
            {...register('name', { required: true })}
          ></Input>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Your message</Label>
          <Textarea
            placeholder="Leave a comment..."
            id="message"
            {...register('message', { required: true })}
          />
        </div>
        <Button className="mt-8">Send message</Button>
      </form>
    </div>
  );
};

export default Page;
