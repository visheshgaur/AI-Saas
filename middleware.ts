import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define routes that MUST be protected
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

// 2. Define routes that MUST be public (Explicitly allow Webhooks)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook", // 👈 This is the key fix
]);

export default clerkMiddleware(async (auth, req) => {
  // If it's a protected route and NOT a public route, enforce login
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|.*\\..*|favicon.ico).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};