import LandingBanner from "@/components/LandingBanner";
import LandingFooter from "@/components/LandingFooter";
import LandingNavbar from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const landingPage = () => {
  return (
    <>
      <main className="h-full overflow-auto bg-[#111827]">
        <div className="mx-auto h-full w-full ">
          <LandingNavbar />
          <LandingBanner/>
          <LandingFooter/>
        </div>
      </main>
    </>
  );
};

export default landingPage;
