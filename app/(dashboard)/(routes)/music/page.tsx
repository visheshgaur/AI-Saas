"use client";

import * as z from "zod";
import { Heading } from "@/components/Heading";
import { Loader, Music } from "lucide-react";
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

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MusicPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     setMusic(undefined);
  //     const response = await axios.post("/api/music", values);
  //     console.log(response)
  //     setMusic(response.data.audio)

  //     const assistantMessage: Message = {
  //       role: "assistant",
  //       content: response.data.response,
  //     };

      
  //     form.reset();
  //   } catch (error: any) {
  //     console.error("Error in onSubmit:", error);
  //     alert(error);
  //   } finally {
  //     // router.refresh();
  //   }
  // };
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    setMusic(undefined);
    const response = await axios.post("/api/music", values);

    // FIX: Use the data string directly. 
    // The browser can play "data:audio/wav;base64,..." natively.
    setMusic(response.data.audio);

    form.reset();
  } catch (error: any) {
    console.error("Error:", error);
  }
};


  return (
    <>
      <div>
        <Heading
          title="Music Generation"
          description="Our most useful AI tool for making music without any skills"
          icon={Music}
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
          {!music && !isLoading && (
            <Empty label="No Music yet" />
          )}
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              {/* This animates the spinner */}
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              <p className="text-sm text-muted-foreground">
                Generating your response...
              </p>
            </div>
          )}
         {music && (
  <div className="w-full mt-8">
    <audio 
      controls 
      className="w-full" 
      key={music} // <--- THIS IS COMPULSORY
    >
      <source src={music} type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
    <a 
      href={music} 
      download="music.wav" 
      className="text-xs text-blue-500 mt-2 block hover:underline"
    >
      Download Music
    </a>
  </div>
)}

        </div>
      </div>
    </>
  );
};

export default MusicPage;
