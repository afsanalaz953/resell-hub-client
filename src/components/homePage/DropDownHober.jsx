import React from 'react';
import Link from "next/link"
import { usePathname } from 'next/navigation';
import Image from "next/image"
import { authClient } from "@/lib/auth-client"


const DropDownHober = () => {
    const { data: session,  isPending } = authClient.useSession();
    console.log (session, "session")
    
    const user = session?.user;
    console.log (user, "user");
    
     const pathname = usePathname();
        console.log (pathname, "pathname");
    
        const isActive = (href) =>{
           return href === pathname;
        };
    return (
        <div className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="m-1">
     {/* <Image src={user?.image || userAvatar  } */}
     <Image src={user?.image || "https://via.placeholder.com/50?text=User"} 
            // referrerPolicy='no-referrer'
          alt=" author"
          width={50}
          height={50} 
          />
    </div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-2 w-25 shadow-sm">
    <li className='text-blue-800 font-bold'><Link href={"/profile"} className={`${isActive ("/profile") ? " border-b-4 border-b-green-600" : ""}`} >Profile</Link></li>
    <li> 
                    <button className='btn btn-primary text-sm' 
                    onClick={async () => {
                      await authClient.signOut();
                       window.location.href = "/login";
                    }} >
                       Log Out</button>
                       </li>
  </ul>
</div>
    );
};

export default DropDownHober;