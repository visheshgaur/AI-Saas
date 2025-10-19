import { Button } from "@/components/ui/button";
import Link from "next/link";

const landingPage=()=>{
    return(
        <>
        <div className="p-5 gap-5 flex">
            <div>
           <Link href="/sign-in"><Button className="cursor-pointer">Login</Button></Link> 
        </div>
        <div>
           <Link href="/sign-up"><Button className="cursor-pointer">Register</Button></Link> 
        </div>
        <div className="button">unprotected</div>
        </div>
        </>
    )
}

export default landingPage;