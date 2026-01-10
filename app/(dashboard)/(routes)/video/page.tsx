"use client";

import * as z from "zod";
import { Heading } from "@/components/Heading";
import { Loader, Music, Shrink, Video } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { UserAvatar, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Empty } from "@/components/ui/empty";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { toast } from "sonner";



const VideoPage = () => {
  // const { user } = useUser();
  // const router = useRouter();
  const [video, setVideo] = useState<string | null>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const response = await axios.post("/api/video", values);
    setVideo(response.data.video);


    form.reset();
  } catch (error: any) {
    if(error?.response?.status===429){
      toast.error("Free Tier Reached");
    }
    else{
      toast.error("Something Went Wrong");
      console.log("Api error",error);
      
    }
  }
};


  return (
    <>
      <div>
        <Heading
          title="Video Generation"
          description="Convert you text into video."
          icon={Video}
          iconColor="text-emerald-800"
          bgColor="bg-emerald-500/10"
        />
      </div>

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-gray-800"
                      disabled={isLoading}
                      placeholder="Enter your prompt"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Form>
         

        <div className="space-y-4 mt-4 text-gray-800">
          {!video && !isLoading && (
            <Empty label="No Video Generated yet..." />
          )}
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              {/* This animates the spinner */}
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              <p className="text-sm text-muted-foreground">
                Generating your video...
              </p>
            </div>
          )}
         {video && (
  <div className="w-full mt-8 p-4 rounded-lg border bg-muted">
    <video 
    controls 
    className="w-full aspect-video mt-2 rounded-lg border bg-black"
    key={video} // ⚠️ Important: This forces the player to update when the video changes
  >
    <source src={video} />
    Your browser does not support the video tag.
  </video>
  </div>
)}


        </div>
      </div>
    </>
  );
};

export default VideoPage;
