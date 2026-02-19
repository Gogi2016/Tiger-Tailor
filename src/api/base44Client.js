import { createClient } from '@base44/sdk';
import { appParams } from '../lib/app-params'; // <-- relative path is safer locally

const { appId, token, functionsVersion, appBaseUrl } = appParams;

export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  appBaseUrl,
  requiresAuth: false,
});
