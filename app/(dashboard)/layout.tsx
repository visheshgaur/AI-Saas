import { getApiLimitCount } from "@/lib/rate-limit";
import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { checkSubscription } from "@/lib/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  // 1. Pass userId to this (It still needs it)
  const apiLimitCount = await getApiLimitCount(userId || "");
  
  // 2. DO NOT pass userId to this (It finds it automatically now)
  const isPro = await checkSubscription(); 

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar isPro={isPro} apiLimitCount={apiLimitCount} />
        {children}
        <Toaster/>
      </main>
    </div>
  );
}