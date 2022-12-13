import nextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sign } from "jsonwebtoken";

export default nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session) {
        session.token = sign(token, process.env.JWT_SECRET!);
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
