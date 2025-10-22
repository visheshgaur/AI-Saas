import { Heading } from "@/components/Heading"
import { BotMessageSquareIcon, MessageSquare } from "lucide-react"
const conversationPage=()=>{
    return(
        <>
        <div> 
            <Heading title="Conversation"
            description="Our Most advanced conversation Model "
            icon={MessageSquare}
            iconColor="text-violet-800"
            bgColor="bg-violet-500/10"/>
        </div>
        </>
    )
}

export default conversationPage