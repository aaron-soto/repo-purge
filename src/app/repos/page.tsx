"use client";

import { DataTable } from "@/app/repos/data-table";
import PageHeader from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/app/repos/columns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Repos() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="container pt-20 px-3 sm:px-[2rem]">
        <PageHeader>Your Repos</PageHeader>
        <Skeleton className="w-[200px] h-[40px] mb-4" />
        <Skeleton className="w-full h-[600px]" />
        <Skeleton className="w-full h-[40px] mt-4" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
  }

  return (
    <div className="container pt-8 px-3 sm:px-[2rem]">
      <PageHeader>Your Repos</PageHeader>
      <DataTable columns={columns} />
    </div>
  );
}
