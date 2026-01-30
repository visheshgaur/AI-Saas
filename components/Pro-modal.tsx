"use client";

import { useState } from "react"; // 1. Import useState
import { useProModal } from "@/hooks/pro-modal-ui";
import {
  Dialog,
  DialogContent,
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
import axios from "axios";
import { toast } from "sonner"; // Assuming you are using sonner or similar

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
  // 2. Add a loading state
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true); // Start loading
      
      const response = await axios.get("/api/stripe");

      // Check if we actually got a URL back
      if (response.data.url) {
         window.location.href = response.data.url;
      } else {
         toast.error("Failed to create checkout session");
      }

    } catch (error) {
      console.log(error, "STRIPE_CLIENT_ERR");
      toast.error("Something went wrong");
    } finally {
      // 3. Only turn off loading. DO NOT show success message here.
      setLoading(false); 
    }
  };

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
                  <Check />
                </div>
              </Card>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="border-none w-full cursor-pointer"
            onClick={onSubscribe}
            disabled={loading} // 4. Disable button while loading
          >
            {loading ? "Redirecting..." : "Upgrade Now"}
            <Zap className="w-4 h-4 ml-1 fill-white"></Zap>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};