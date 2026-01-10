// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import { Toaster } from "@/components/ui/sonner"


// const DashboardLayout=({
//     children
// }:{children:React.ReactNode})=>{
//     return(
// <div className="h-full relative">
//     <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
//         <Sidebar/>
//     </div>
//     <main className="md:pl-72 text-red-800 z-[99]">
//       <Navbar></Navbar>
//       {children}
//       <Toaster />
//     </main>
// </div>
//     )
// }

// export default DashboardLayout;


import { getApiLimitCount } from "@/lib/rate-limit"; // Import the fetcher
import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the count on the server
  const { userId } = await auth();
  const apiLimitCount = await getApiLimitCount(userId || "");

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        {/* Pass the count to the Sidebar */}
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar apiLimitCount={apiLimitCount} />
        {children}
        <Toaster/>
      </main>
    </div>
  );
}