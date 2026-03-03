import Link from "next/link";
import { Button } from "./ui/button";

const LandingNavbar = () => {
  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 z-50">
      
      {/* Left - Logo */}
      <Link href="/">
        <div className="text-2xl font-extrabold cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Genius
        </div>
      </Link>

      {/* Right - Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <Button
            variant="outline"
            className="border-white/20 hover:cursor-pointer"
          >
            Login
          </Button>
        </Link>

        <Link href="/sign-up">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
          >
            Register
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;