import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/nextjs/server"; 

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = await auth();

  if (!userId) return false;

  try {
    const user = await clerk.users.getUser(userId);
    const userMetadata = user.publicMetadata;

    // 👇 DEBUG: Print the ENTIRE object to see the real keys
    console.log("--- CLERK METADATA DUMP ---");
    console.log(JSON.stringify(userMetadata, null, 2)); 
    // ☝️ This is the most important line
    
    const stripePriceId = userMetadata.stripePriceId as string;
    
    // 👇 POTENTIAL FIX: Check if it's saved with a different name?
    const stripeCurrentPeriodEnd = 
      userMetadata.stripeCurrentPeriodEnd || // camelCase
      userMetadata.stripe_current_period_end; // snake_case (Try this too)

    if (!stripePriceId || !stripeCurrentPeriodEnd) {
      return false;
    }

    // Ensure it's treated as a number
    const isValid = Number(stripeCurrentPeriodEnd) + DAY_IN_MS > Date.now();

    return !!isValid;
  } catch (error) {
    console.log(error);
    return false;
  }
};