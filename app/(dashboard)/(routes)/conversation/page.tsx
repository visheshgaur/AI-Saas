"use client";

import * as z from "zod";
import { Heading } from "@/components/Heading";
import { Loader, MessageSquare } from "lucide-react";
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

const ConversationPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.response,
      };

      setMessages((current) => [...current, userMessage, assistantMessage]);
      form.reset();
    } catch (error: any) {
      console.error("Error in onSubmit:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Conversation"
          description="Our most advanced Gemini-powered conversation model"
          icon={MessageSquare}
          iconColor="text-violet-800"
          bgColor="bg-violet-500/10"
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
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversations yet" />
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
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg flex gap-2 ${
                  message.role === "user"
                    ? "bg-violet-100 text-gray-900"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <strong>
                  {message.role === "user"
                    ? <UserAvatar/>
                    : "Genius :  "}
                </strong>
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationPage;
