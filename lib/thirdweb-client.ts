import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

type ThirdwebClient = ReturnType<typeof createThirdwebClient>;

// Create thirdweb client - only if we have a clientId
// This prevents build errors when env vars aren't set
export const client: ThirdwebClient | null = clientId
  ? createThirdwebClient({ clientId })
  : null;
