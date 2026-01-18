    // import { useProModal } from "@/hooks/pro-modal-ui";
    // import {
    // Dialog,
    // DialogContent,
    // DialogDescription,
    // DialogHeader,
    // DialogTitle,
    // } from "./ui/dialog";
    // import { Badge } from "./ui/badge";
    // import {
    //     Check,
    // Code,
    // ImageIcon,
    // MessageSquare,
    // Music,
    // Shrink,
    // VideoIcon,
    // } from "lucide-react";
    // import { Card } from "./ui/card";
    // import { cn } from "@/lib/utils";
    // const tools = [
    // {
    //     label: "Conversation",
    //     icon: MessageSquare,
    //     color: "text-violet-700",
    //     bgColor: "bg-violet-500/10",
    // },
    // {
    //     label: "Image Generation",
    //     icon: ImageIcon,
    //     color: "text-pink-700",
    //     bgColor: "bg-violet-500/10",
    // },
    // {
    //     label: "Video Generation",
    //     icon: VideoIcon,
    //     color: "text-emerald-700",
    //     bgColor: "bg-violet-500/10",
    // },
    // {
    //     label: "Music Generation",
    //     icon: Music,
    //     color: "text-orange-700",
    //     bgColor: "bg-violet-500/10",
    // },
    // {
    //     label: "Code Generation",
    //     icon: Code,
    //     color: "text-green-700",
    //     bgColor: "bg-violet-500/10",
    // },
    // {
    //     label: "Text Summarizer",
    //     icon: Shrink,
    //     color: "text-red-700",
    //     bgColor: "bg-red-500/10",
    // },
    // ];

    // export const ProModal = () => {
    // const proModal = useProModal();

    // return (
    //     <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
    //     <DialogContent>
    //         <DialogHeader>
    //         {/* FIX:
    //                     1. Removed the outer <div> entirely.
    //                     2. Added 'flex', 'justify-center', 'items-center', and 'gap-x-2' to DialogTitle.
    //                     3. Removed 'flex-col' so items sit side-by-side.
    //                     */}
    //         <DialogTitle className="flex justify-center items-center gap-x-2 font-bold py-1">
    //             Upgrade
    //             <Badge className="uppercase text-sm py-1" variant="premium">
    //             pro
    //             </Badge>
    //         </DialogTitle>
    //         <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
    //             {tools.map((tool) => (
    //             <Card
    //                 key={tool.label}
    //                 className="flex justify-between p-3 border-black/5"
    //             >
    //                 <div className="flex  items-center gap-x-4 ">
    //                 <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
    //                     <tool.icon className={cn("w-6 h-6 ", tool.color)} />
    //                 </div>
    //                  <div>{tool.label}</div>
    //                 </div>
    //                <Check/>
    //             </Card>
    //             ))}
    //         </div>
    //         </DialogHeader>
    //     </DialogContent>
    //     </Dialog>
    // );
    // };
    import { useProModal } from "@/hooks/pro-modal-ui";
    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    } from "./ui/dialog";
    import { Badge } from "./ui/badge";
    import {
        Check,
    Code,
    ImageIcon,
    MessageSquare,
    Music,
    Shrink,
    VideoIcon,
    Zap,
    } from "lucide-react";
    import { Card } from "./ui/card";
    import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
    const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-700",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-emerald-700",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-orange-700",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-green-700",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Text Summarizer",
        icon: Shrink,
        color: "text-red-700",
        bgColor: "bg-red-500/10",
    },
    ];

    export const ProModal = () => {
    const proModal = useProModal();

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader>
            
            <DialogTitle className="flex justify-center items-center gap-x-2 font-bold py-1">
                Upgrade
                <Badge className="uppercase text-sm py-1" variant="premium">
                pro
                </Badge>
            </DialogTitle>
            <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                {tools.map((tool) => (
                <Card
                    key={tool.label}
                    className="flex flex-row  items-center p-3 border-black/5"
                >
                    <div className="flex items-center  gap-x-4  w-full ">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                        <tool.icon className={cn("w-6 h-6 ", tool.color)} />
                    </div>
                     <div>{tool.label}</div>
                    </div>
                    <div className="flex items-center  justify-end">
                   <Check/>
                    </div>
                   
                </Card>
                ))}
            </div>
            </DialogHeader>
            <DialogFooter>
                <Button size="lg" variant="premium" className="border-none w-full cursor-pointer">
                    
                    Upgrade Now
                    <Zap className="w-4 h-4 ml-1 fill-white"></Zap>
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
    };
