import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import connectToDB from "@utils/database";
import { CustomProfile, CustomSession } from "@global-types";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "default",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "default",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });

      (session.user as CustomSession).id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({
          email: profile?.email,
        });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.toLowerCase(),
            image: (profile as CustomProfile)?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
