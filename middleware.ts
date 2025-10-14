import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes should be protected
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Check if current request path matches a protected route
  if (isProtectedRoute(req)) {
    await auth.protect({
      // Redirect unauthenticated users to absolute sign-up URL
      unauthenticatedUrl: new URL("/sign-up", req.url).toString(),
    });
  }
});

export const config = {
  matcher: [
    // Run Clerk middleware on all routes except static assets
    "/((?!_next|.*\\..*|favicon.ico).*)",
  ],
};
