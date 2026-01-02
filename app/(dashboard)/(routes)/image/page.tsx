"use client";

import * as z from "zod";
import { Heading } from "@/components/Heading";
import { ImageIcon, Loader, Download } from "lucide-react"; // Added Download icon
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Empty } from "@/components/ui/empty";
import { Card, CardFooter } from "@/components/ui/card"; // Assuming you have a Card component
import Image from "next/image";

const ImagePage = () => {
  const router = useRouter();
  // State to store the list of generated image URLs (Base64 strings)
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "1024x1024", // Note: Gemini usually handles aspect ratio, not strict px resolution
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]); // Clear previous images

      // Call your backend API
      const response = await axios.post("/api/image", values);

      // The backend returns { b64_json: "...", prompt: "..." }
      // We construct a data URL so the <img> tag can read it
      const imageSrc = `data:image/png;base64,${response.data.b64_json}`;

      setImages([imageSrc]);
      
      form.reset();
    } catch (error: any) {
      console.error("Error in onSubmit:", error);
      // Optional: Add a toast notification here
      // toast.error("Something went wrong");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="h-full p-4 space-y-8"> {/* Added container wrapper */}
      <Heading
        title="Image Generation"
        description="Our most advanced Gemini-powered image Generation model"
        icon={ImageIcon}
        iconColor="text-pink-800"
        bgColor="bg-pink-500/10"
      />

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
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="A cyberpunk robot skateboarding..."
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
      </div>

      <div className="space-y-4 mt-4 px-4 lg:px-8">
        {isLoading && (
          <div className="p-20">
            <div className="flex flex-col items-center justify-center gap-y-4">
              <Loader className="h-10 w-10 animate-spin text-pink-500" />
              <p className="text-sm text-muted-foreground">
                Gemini is painting your masterpiece...
              </p>
            </div>
          </div>
        )}

        {images.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-video"> {/* Maintain aspect ratio */}
                <Image
                  alt="Generated Image"
                  fill
                  src={src}
                  className="object-cover"
                />
              </div>
              <CardFooter className="p-2">
                <Button 
                  onClick={() => window.open(src)} 
                  variant="secondary" 
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;