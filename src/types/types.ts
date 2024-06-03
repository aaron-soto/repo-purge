export type Repo = {
  id: string;
  name: string;
  full_name: string;
  html_url: string;
  description?: string;
  url?: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  visibility: "public" | "private";
  ownerName: string;
};

export type FAQ = {
  question: string;
  answer: string;
};
