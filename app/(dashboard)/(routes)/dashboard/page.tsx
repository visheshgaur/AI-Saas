"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs"
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";


const tools=[
  {label:'Conversation',
    icon:MessageSquare,
    href:"/conversation",
    color:"text-violet-700",
    bgColor:"bg-violet-500/10"
    },
    {label:'Image Generation',
    icon:ImageIcon,
    href:"/image",
    color:"text-pink-700",
    bgColor:"bg-violet-500/10"
    },
    {label:'Video Generation',
    icon:VideoIcon,
    href:"/video",
    color:"text-emerald-700",
    bgColor:"bg-violet-500/10"
    },
    {label:'Music Generation',
    icon:Music,
    href:"/music",
    color:"text-orange-700",
    bgColor:"bg-violet-500/10"
    },
    {label:'Code Generation',
    icon:Code,
    href:"/code",
    color:"text-green-700",
    bgColor:"bg-violet-500/10"
    },
]

const Dashboard=()=>{
  const router=useRouter();
  return (
    <>
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-semibold text-center text-gray-800"> Explore the Power Of AI</h2>
      <p className=" text-muted-foreground text-sm md:text-lg text-center">Chat with the smartest AI Experience the power of AI</p>
    </div>
    <div className="px-4 md:px-20 lg:px-32 space-y-4">

    {tools.map((tool)=>(
      <Card  onClick={()=>{
        router.push(tool.href)
      }} key={tool.href} className="p-4 flex  justify-between  border-black/5 hover:shadow-md transition cursor-pointer">
       <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-2">
         <div className={cn("p-2 w-fit flex rounded-md",tool.bgColor)}>
            <tool.icon className={cn("w-5 h-5",tool.color)}></tool.icon></div>
        <div className="font-semibold">{tool.label}</div>
       </div>
       <div>
        <ArrowRight className="w-5 h-5" ></ArrowRight>
       </div>
       </div>
      </Card>
    ))}
    </div>
    </>
  )
}
export default Dashboard