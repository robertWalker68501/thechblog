import { inferAdditionalFields } from 'better-auth/client/plugins';
import { nextCookies } from 'better-auth/next-js';
import { createAuthClient } from 'better-auth/react';

import { auth } from './auth';

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
  plugins: [inferAdditionalFields<typeof auth>(), nextCookies()],
});
