"use client";

import * as z from "zod";
import { Heading } from "@/components/Heading";
import { Loader, Music, Shrink } from "lucide-react";
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

const SummarizePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [summarized, setSummarized] = useState<string | null>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const response = await axios.post("/api/summarize", values);
    setSummarized(response.data.summary);


    form.reset();
  } catch (error: any) {
    console.error("Error:", error);
  }
};


  return (
    <>
      <div>
        <Heading
          title="Text Summarizer"
          description="Our most useful AI tool for getting summarized version of the prompt ."
          icon={Shrink}
          iconColor="text-red-800"
          bgColor="bg-red-500/10"
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
          {!summarized && !isLoading && (
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
         {summarized && (
  <div className="w-full mt-8 p-4 rounded-lg border bg-muted">
    <p className="text-sm leading-relaxed">{summarized}</p>
  </div>
)}


        </div>
      </div>
    </>
  );
};

export default SummarizePage;
