"use client"

import { Heading } from "@/components/Heading"
import { Settings} from "lucide-react"

const settings=()=>{
    return(
        <div>
            <Heading
        title="Settings"
        description=""
        icon={Settings}
        iconColor="text-pink-800"
        bgColor="bg-pink-500/10"
      />
        </div>
    )
}
export default settings