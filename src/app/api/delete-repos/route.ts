import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/utils';
import { Repo } from '@/types/types';

const deleteRepo = async (repo: Repo, token: string) => {
  const response = await fetch(
    `https://api.github.com/repos/${repo.ownerName}/${repo.name}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete repository: ${repo.name}`);
  }
};

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const itemsToDelete: Repo[] = await request.json();
  const token = session.accessToken as string;

  try {
    await Promise.all(itemsToDelete.map((repo) => deleteRepo(repo, token)));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
