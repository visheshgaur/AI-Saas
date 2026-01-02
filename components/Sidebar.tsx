"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessagesSquare, Music, Settings, Shrink, VideoIcon } from "lucide-react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

const routes=[
    {label:'Dashboard',
    icon:LayoutDashboard,
    href:"/dashboard",
    color:"text-sky-700"
    },
    {label:'Conversation',
    icon:MessagesSquare,
    href:"/conversation",
    color:"text-violet-700"
    },
    {label:'Image Generation',
    icon:ImageIcon,
    href:"/image",
    color:"text-pink-700"
    },
    {label:'Video Generation',
    icon:VideoIcon,
    href:"/video",
    color:"text-emerald-700"
    },
    {label:'Music Generation',
    icon:Music,
    href:"/music",
    color:"text-orange-700"
    },
    {label:'Code Generation',
    icon:Code,
    href:"/code",
    color:"text-green-700"
    },
    {label:'Summarizer',
    icon:Shrink,
    href:"/summarize",
    color:"text-red-700"
    },
    {label:'Settings',
    icon:Settings,
    href:"/settings",
   
    },
]
const Sidebar = () => {
    const pathname=usePathname()
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex
          items-center pl-3 mb-14"
        >
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              alt="Logo"
              src="/logo.png"
            />
          </div>
          <h1 className={cn("text-2xl font-bold",
            montserrat.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-4">
            {routes.map((route)=>(
            // Inside your Sidebar component, within the routes.map:

// Inside your Sidebar component, within the routes.map:

<Link
  href={route.href}
  key={route.href}
  className={cn(
    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition", 
    
    // 👇 NEW Hover Background: Apply subtle emerald background on hover
    pathname !== route.href && "hover:bg-emerald-400/10",
    
    // 👇 NEW Active/Inactive Colors:
    pathname === route.href 
      // ACTIVE: Pure white text on a subtle emerald background
      ? "text-white bg-emerald-400/10" 
      // INACTIVE: Soft grey text (no custom background)
      : "text-zinc-400"          
  )}
>
  <div className="flex items-center flex-1">
    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
    {route.label}
  </div>
</Link>
        ))}
        </div>
        
      </div>
    </div>
  );
};


export default Sidebar;