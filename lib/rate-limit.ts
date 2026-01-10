// // lib/rate-limit.ts

// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// export async function checkApiLimit(identifier: string) {
//   const ratelimit = new Ratelimit({
//     redis: Redis.fromEnv(),
    
//     limiter: Ratelimit.slidingWindow(2, "24 h"), 
//     analytics: true,
//     prefix: "@upstash/ratelimit",
//   });

//   // Check the limit for the user
//   const result = await ratelimit.limit(identifier);
  
//   return result;
// }


import { Redis } from "@upstash/redis";

export const MAX_FREE_COUNTS = 2;

const redis = Redis.fromEnv();

export const increaseApiLimit = async (userId: string) => {
  if (!userId) return;

  const userApiLimitKey = `user_api_limit:${userId}`;

  // Increment the counter
  const count = await redis.incr(userApiLimitKey);

  // If this is the first time (count is 1), set it to expire in 24 hours
  if (count === 1) {
    await redis.expire(userApiLimitKey, 86400); // 24 hours in seconds
  }
};

export const checkApiLimit = async (userId: string) => {
  if (!userId) return false;

  const userApiLimitKey = `user_api_limit:${userId}`;
  const count = await redis.get(userApiLimitKey);

  // If count doesn't exist or is less than max, allow access
  if (!count || Number(count) < MAX_FREE_COUNTS) {
    return true;
  }
  
  return false;
};

export const getApiLimitCount = async (userId: string) => {
  if (!userId) return 0;

  const userApiLimitKey = `user_api_limit:${userId}`;
  const count = await redis.get(userApiLimitKey);

  // If no count exists yet, return 0
  if (!count) return 0;

  return Number(count);
};