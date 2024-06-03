'use client';

import { columns } from '@/app/repos/columns';
import { DataTable } from '@/app/repos/data-table';
import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Repos() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="container pt-20">
        <PageHeader>Your Repos</PageHeader>
        <Skeleton className="w-[200px] h-[40px] mb-4" />
        <Skeleton className="w-full h-[600px]" />
        <Skeleton className="w-full h-[40px] mt-4" />
      </div>
    );
  }

  if (!session) {
    router.push('/login');
  }

  return (
    <div className="container pt-20">
      <PageHeader>Your Repos</PageHeader>
      <DataTable columns={columns} />
    </div>
  );
}
