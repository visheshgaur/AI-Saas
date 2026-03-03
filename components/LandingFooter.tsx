import Link from "next/link";

const LandingFooter = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 px-6 py-8">
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Genius
        </h2>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <Link href="#" className="hover:text-white transition">
            About
          </Link>
          <Link href="#" className="hover:text-white transition">
            Pricing
          </Link>
          <Link href="#" className="hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Genius
        </p>

      </div>

    </footer>
  );
};

export default LandingFooter;