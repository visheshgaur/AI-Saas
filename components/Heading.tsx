import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface HeadingProps{
    title:string,
    description:string,
    icon:LucideIcon,
    iconColor?:string,
    bgColor?:string
}


export const Heading=({
    title,description,icon:Icon,iconColor,bgColor
}:HeadingProps)=>{
    return(
        <>
        <div className="px-4 flex items-center gap-x-3 lg:px-8 mb-10">
            <div className={cn("p-3 rounded-md w-fit",bgColor)}>
                <Icon className={cn("w-7 h-7",iconColor)}/>
            </div>
        <div>
            <h2 className="text-2xl text-gray-700 font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        </div>
        </>
    )
}