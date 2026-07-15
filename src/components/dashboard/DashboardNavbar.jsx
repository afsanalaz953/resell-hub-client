"use client"
import React from 'react';
import Logo from "@/components/shared/Logo";
import {Button} from "@heroui/react";
import ThemeToggle from "@/components/shared/ThemeToggle"
import DropDownHober from "@/components/homePage/DropDownHober"
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { authClient } from "@/lib/auth-client"



const DashboardNavbar = () => {
// const { data: session,  isPending } = authClient.useSession();
 const { data: session } = authClient.useSession();
console.log (session, "session")

const user = session?.user;
const role = session?.user?.role;
console.log (user, "user");

// const handleSignOut = async () => {
//     await authClient.signOut();
// };

    const pathname = usePathname();
    console.log (pathname, "pathname");
   

    const isActive = (href) =>{
       return href === pathname;
    };

    



    return (
        <nav className='flex justify-between container mx-auto p-2 gap-35 bg-[#0F172B] '>
            <div className='m-6'>  <Logo /> logo </div>
            {/* linkpage */}
            <div className='flex gap-2  items-center'>
               <ul className='flex gap-4 text-orange-600 font-bold'>
                                   <li className=''><Link href={"/"} className={`${isActive ("/") ? "  border-b-4 border-b-orange-600": "" }`}  >Home</Link></li>
                                   <li><Link href={"/products"} className={`${isActive ("/products") ? " border-b-4 border-b-green-600" : ""}`} >Products</Link></li>
              </ul>
               </div>
               {/* user part */}
               <div className='rounded-full flex gap-2 '> 
         <DropDownHober />
        <h2 className='text-orange-600'>{user?.name}</h2> 
         <span className= {`font-bold ${role === "seller" ? "text-orange-400" : 
        role === "buyer" ? "text-orange-400" : "text-orange-600"}`}> {role} </span>
         <ThemeToggle />
      </div>
            
                  <div></div>
                    {/* login part */}
                        
                    
        </nav>
    );
};

export default DashboardNavbar;