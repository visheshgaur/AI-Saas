// import { Redis } from "@upstash/redis";
// import { checkSubscription } from "@/lib/subscription"; // Import your subscription helper

// export const MAX_FREE_COUNTS = 2;

// const redis = Redis.fromEnv();

// export const increaseApiLimit = async (userId: string) => {
//   if (!userId) return;

//   // 1. Check if user is Pro. 
//   // If they are Pro, do NOT increment the counter. They have unlimited usage.
//   const isPro = await checkSubscription(userId);
//   if (isPro) {
//     return; 
//   }

//   const userApiLimitKey = `user_api_limit:${userId}`;

//   // Increment the counter only for free users
//   const count = await redis.incr(userApiLimitKey);

//   // If this is the first time (count is 1), set it to expire in 24 hours
//   if (count === 1) {
//     await redis.expire(userApiLimitKey, 86400); // 24 hours in seconds
//   }
// };

// export const checkApiLimit = async (userId: string) => {
//   if (!userId) return false;

//   // 1. FIRST CHECK: Is the user a Pro member?
//   // If they are Pro, we return true immediately (unlimited access)
//   const isPro = await checkSubscription(userId);
//   if (isPro) {
//     return true;
//   }

//   // 2. If NOT Pro, check the Redis counter
//   const userApiLimitKey = `user_api_limit:${userId}`;
//   const count = await redis.get(userApiLimitKey);

//   // If count doesn't exist or is less than max, allow access
//   if (!count || Number(count) < MAX_FREE_COUNTS) {
//     return true;
//   }
  
//   return false;
// };

// export const getApiLimitCount = async (userId: string) => {
//   if (!userId) return 0;

//   // Optional: You can check isPro here if you want to force return 0 for pro users, 
//   // but since we stopped incrementing above, it will naturally stay at 0 or stop growing.
  
//   const userApiLimitKey = `user_api_limit:${userId}`;
//   const count = await redis.get(userApiLimitKey);

//   if (!count) return 0;

//   return Number(count);
// };

import { Redis } from "@upstash/redis";
import { checkSubscription } from "@/lib/subscription"; 
import { MAX_FREE_COUNTS } from "./constant";
export const MAX_FREE_COUNTS1 = MAX_FREE_COUNTS;

const redis = Redis.fromEnv();

export const increaseApiLimit = async (userId: string) => {
  if (!userId) return;

  // 👇 FIX: Called with NO arguments (it finds user automatically now)
  const isPro = await checkSubscription();
  
  if (isPro) {
    return; // Do not count usage for Pro users
  }

  const userApiLimitKey = `user_api_limit:${userId}`;

  // Increment the counter only for free users
  const count = await redis.incr(userApiLimitKey);

  // If this is the first time (count is 1), set it to expire in 24 hours
  if (count === 1) {
    await redis.expire(userApiLimitKey, 86400); // 24 hours in seconds
  }
};

export const checkApiLimit = async (userId: string) => {
  if (!userId) return false;

  // 👇 FIX: Called with NO arguments
  const isPro = await checkSubscription();

  if (isPro) {
    return true; // Unlimited access for Pro
  }

  const userApiLimitKey = `user_api_limit:${userId}`;
  const count = await redis.get(userApiLimitKey);

  if (!count || Number(count) < MAX_FREE_COUNTS1) {
    return true;
  }
  
  return false;
};

export const getApiLimitCount = async (userId: string) => {
  if (!userId) return 0;

  const userApiLimitKey = `user_api_limit:${userId}`;
  const count = await redis.get(userApiLimitKey);

  if (!count) return 0;

  return Number(count);
};