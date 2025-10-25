// import { Ghost, Menu } from "lucide-react";
// import { Button } from "./ui/button";
// import { UserButton } from "@clerk/nextjs";
// import MobileSidebar from "./Mobile-Sidebar";
// const Navbar=()=>{
//     return(
//         <>
//        <div className="flex items-center p-4 ">
//        <MobileSidebar/>
//         <div className="w-full flex justify-end">
//             <UserButton afterSignOutUrl="/"/>
//         </div>
//        </div>
//         </>
//     )
// }
// export default Navbar;

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import MobileSidebar from "./Mobile-Sidebar";
import dynamic from "next/dynamic";
import ClientUserButton from "./ClientUserButton";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="w-full flex justify-end">
        <ClientUserButton />
      </div>
    </div>
  );
};

export default Navbar;
