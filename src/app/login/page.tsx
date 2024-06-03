"use client";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <Card className="w-full max-w-sm mx-auto mt-32">
      <CardHeader>
        <CardTitle className="text-2xl">Login with Github</CardTitle>
        <CardDescription>
          You must login using github, how else would we know what repos to
          delete?
        </CardDescription>
      </CardHeader>
      {/* <CardContent className="grid gap-4">
        <p></p>
      </CardContent> */}
      <CardFooter>
        <Button onClick={() => signIn("github")} className="w-full">
          Login Using Github
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Page;
