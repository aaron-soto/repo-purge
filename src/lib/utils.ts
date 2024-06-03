import { Repo } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapToRepos(rawData: any): Repo {
  console.log(rawData);
  return rawData.map((repo: any) => {
    return {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      url: repo.url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      visibility: repo.visibility,
      ownerName: repo.owner.login,
    };
  });
}

export const fetchRepos = async (sessionAccessToken: string) => {
  if (sessionAccessToken) {
    let page = 1;
    let allRepos: any[] = [];
    let fetchMore = true;

    while (fetchMore) {
      const response = await fetch(
        `https://api.github.com/user/repos?per_page=100&page=${page}`,
        {
          headers: {
            Authorization: `token ${sessionAccessToken}`,
          },
        }
      );
      const data = await response.json();
      allRepos = allRepos.concat(data);
      page += 1;
      if (data.length < 100) {
        fetchMore = false;
      }
    }

    return allRepos;
  }
};
