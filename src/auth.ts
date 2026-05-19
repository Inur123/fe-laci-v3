/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";

const ssoUrl = process.env.NEXT_PUBLIC_SSO_URL || "";
const ssoApiUrl = process.env.NEXT_PUBLIC_SSO_API_URL || "";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "sso-ipnu",
      name: "SSO IPNU Magetan",
      type: "oauth",
      authorization: {
        url: `${ssoUrl}/oauth/authorize`,
        params: { scope: "basic_info email phone" },
      },
      token: `${ssoApiUrl}/oauth/token`,
      userinfo: `${ssoApiUrl}/v1/user/me`,
      clientId: process.env.SSO_CLIENT_ID,
      clientSecret: process.env.SSO_CLIENT_SECRET,
      profile(profile: any) {
        // The endpoint GET /v1/user/me returns: { success: true, message: "...", data: { id, name, email, role, ... } }
        const u = profile.data || profile;
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          image: u.image || null,
          role: u.role,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token as string;
      }
      if (profile) {
        const u = (profile as any).data || profile;
        token.role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.sub || token.id;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "laci3.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
});
