import NextAuth, { NextAuthOptions } from "next-auth";
// Types
import { WorldUser } from "@/types/auth";
import { getUserByWorldUserId, createUser } from "../../../services/users";
import { UserTypeBorrower } from "../../../services/users/types";
const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/home",
  },
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  callbacks: {
    async signIn({ user }) {
      const worldUser = user as WorldUser;
      
      // Check if user exists
      const existingUser = await getUserByWorldUserId(worldUser.id);
      
      if (!existingUser) {
        // Create new user if doesn't exist
        const newUser = await createUser({
          user_type: UserTypeBorrower,
          verification_level: worldUser.verificationLevel,
          world_user_id: worldUser.id,
        });

        if (!newUser) {
          return false; // Prevent sign in if user creation fails
        }
      }
      
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}/home`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };