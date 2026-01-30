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

// // import { Menu } from "lucide-react";
// // import { Button } from "./ui/button";
// // import MobileSidebar from "./Mobile-Sidebar";
// // import dynamic from "next/dynamic";
// // import ClientUserButton from "./ClientUserButton";

// // interface NavbarProps {
// //     apiLimitCount: number;
// // }

// // const Navbar = () => {
// //   return (
// //     <div className="flex items-center p-4">
// //       <MobileSidebar apiLimitCount={apiLimitCount} />
// //       <div className="w-full flex justify-end">
// //         <ClientUserButton />
// //       </div>
// //     </div>
// //   );
// // };

// export default Navbar;

import ClientUserButton from "./ClientUserButton";
import MobileSidebar from "./Mobile-Sidebar";

// 1. Define Interface
interface NavbarProps {
    apiLimitCount: number;
    isPro:boolean
}

// 2. Accept Prop
const Navbar = ({ apiLimitCount = 0 ,isPro}: NavbarProps) => {
    return (
        <div className="flex items-center p-4">
            {/* 3. Pass to MobileSidebar */}
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            
            <div className="flex w-full justify-end">
                 <ClientUserButton />
            </div>
        </div>
    );
}

export default Navbar;
