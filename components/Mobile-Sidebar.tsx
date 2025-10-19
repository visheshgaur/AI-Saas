"use client";

import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger,SheetTitle } from "./ui/sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
    return (
        <div className="mobile-sidebar">
           <Sheet>
               {/* 👇 Add asChild to SheetTrigger */}
               <SheetTrigger asChild> 
                   <Button variant="ghost" size="icon" className="md:hidden"> 
                       <Menu/>
                   </Button>
               </SheetTrigger>
               <SheetContent side="left" className="p-0">
                <SheetTitle className="sr-only">Main Navigation</SheetTitle>
                   <Sidebar/>
               </SheetContent>
           </Sheet>
        </div>
    )
}
export default MobileSidebar;