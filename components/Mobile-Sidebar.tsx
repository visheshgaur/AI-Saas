"use client";

import { Button } from "@/components/ui/button"; // Adjusted import path if needed
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar"; // Adjusted import path
import { useEffect, useState } from "react";

// 1. Define the interface
interface MobileSidebarProps {
    apiLimitCount: number;
}

// 2. Accept the prop
const MobileSidebar = ({ apiLimitCount = 0 }: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SheetTitle className="sr-only">Main Navigation</SheetTitle>
                
                
                <Sidebar apiLimitCount={apiLimitCount} />
                
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;