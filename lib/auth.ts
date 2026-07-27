import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import prisma from './prisma';
import { sendVerificationEmail } from './send-verification-email';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'USER',
        input: false,
      },
      bio: { type: 'string', required: false },
      location: { type: 'string', required: false },
      websiteUrl: { type: 'string', required: false },
      instagramUrl: { type: 'string', required: false },
      tiktokUrl: { type: 'string', required: false },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail({
        to: user.email,
        verificationUrl: url,
        userName: user.name,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
