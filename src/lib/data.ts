import { FAQ } from '@/types/types';

export const RP_INFO = {
  contactEmail: 'contact@repopurge.com',
};

export const CHANGELOG = [
  {
    version: '1.0.0',
    githubLink: 'https://github.com',
    date: '2024-06-03',
    changes: ['Initial release'],
  },
];

export const FAQS: FAQ[] = [
  {
    question: 'What is Repo Purge?',
    answer:
      'Repo Purge is a web application that allows you to bulk delete repositories from your GitHub account, streamlining the process of managing your repositories.',
  },
  {
    question: 'How do I sign in to Repo Purge?',
    answer:
      "You can sign in to Repo Purge using your GitHub account. Click on the 'Sign in with GitHub' button and authorize the app to access your repositories.",
  },
  {
    question: 'What permissions does Repo Purge need?',
    answer:
      "Repo Purge requires permission to access your GitHub repositories and delete them. It uses the 'repo', 'user', and 'delete_repo' scopes.",
  },
  {
    question: 'Can I select specific repositories to delete?',
    answer:
      'Yes, after signing in, you will see a list of all your repositories. You can select the ones you want to delete and confirm your selection.',
  },
  {
    question: 'Is there a way to undo a delete action?',
    answer:
      'No, once a repository is deleted, it cannot be undone. Please ensure you have selected the correct repositories before confirming deletion.',
  },
  {
    question: 'Is Repo Purge secure?',
    answer:
      "Yes, Repo Purge uses OAuth for authentication and does not store your GitHub credentials. All actions are performed securely using GitHub's API.",
  },
  {
    question: 'Does Repo Purge support GitHub organizations?',
    answer:
      'Currently, Repo Purge supports personal GitHub accounts. Support for GitHub organizations may be added in future updates.',
  },
  {
    question: 'Is Repo Purge free to use?',
    answer:
      'Yes, Repo Purge is completely free to use. There are no hidden charges or fees.',
  },
  {
    question: 'Who can I contact for support?',
    answer:
      'If you need support or have any questions, please contact us at support@repopurge.com.',
  },
];

export const FEATURES = [
  {
    title: 'Bulk Deletion',
    description:
      'Quickly and efficiently delete multiple GitHub repositories at once, saving you valuable time and effort.',
  },
  {
    title: 'Secure Authentication',
    description:
      'Utilize secure GitHub OAuth authentication to manage your repositories safely without compromising your account.',
  },
  {
    title: 'User-Friendly Interface',
    description:
      'Experience a clean and intuitive interface designed to make repository management straightforward and hassle-free.',
  },
  {
    title: 'Detailed Overview',
    description:
      'Get a detailed overview of your repositories, including size, last update, and more, to help you make informed decisions.',
  },
];

export const STEPS = [
  {
    title: 'Authenticate with GitHub',
    description:
      'Sign in securely with your GitHub account to start managing your repositories.',
  },

  {
    title: 'Select Repositories',
    description:
      'Choose the repositories you want to delete from a comprehensive list view.',
  },

  {
    title: 'Confirm Deletion',
    description:
      'Review your selection and confirm the deletion process with a single click.',
  },
];
