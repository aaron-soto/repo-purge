import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: { params: { scope: "user repo delete_repo" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      // Initial sign in
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.email) {
        session.user = session.user ?? {};
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
