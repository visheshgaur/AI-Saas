import Link from "next/link";
import { Button } from "./ui/button";

const LandingBanner = () => {
  return (
    <section className="w-full min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 h-full">
      
      <div className="max-w-5xl text-center">
        
        {/* Tag */}
        <p className="text-purple-400 font-medium mb-4 tracking-wide">
          🚀 All-in-One AI SaaS Platform
        </p>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Unlock the Power of AI with{" "}
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Genius
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          Access multiple powerful AI tools in one place — generate content,
          create images, automate workflows, and boost productivity effortlessly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/sign-up">
          <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg cursor-pointer">
            Get Started Free
          </Button></Link>

          
        </div>

      </div>
    </section>
  );
};

export default LandingBanner;