"use client"
import React from 'react';
// import logo from "@/assets/logo.png"
import Image from "next/image"
import {Button} from "@heroui/react";
import ThemeToggle from "@/components/shared/ThemeToggle"
import DropDownHober from "@/components/homePage/DropDownHober"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { authClient } from "@/lib/auth-client"
import Logo from "@/components/shared/Logo"

const Navbar = () => {
const { data: session,  isPending } = authClient.useSession();
console.log (session, "session")

const user = session?.user;
const role = session?.user?.role;
console.log (user, "user");

// const handleSignOut = async () => {
//     await authClient.signOut();
// };

    const pathname = usePathname();
    console.log (pathname, "pathname");
    if(pathname.includes('dashboard')){
      return null;
    }

    const isActive = (href) =>{
       return href === pathname;
    };

    
    return (
        <div className='flex flex-col-3 justify-between container mx-auto my-5 shadow-md p-4 '>
            <div className='flex flex-col gap-6'>
              <Logo />
              <p className=' mt-5 text-orange-600 font-bold text-lg'>ReSell Hub </p>
            
            </div>
            
                <ul className='flex gap-4'>
                    <li><Link href={"/"} className={`${isActive ("/") ? " border-b-4 border-b-green-600": "" }`}  >Home</Link></li>
                    <li><Link href={"/products"} className={`${isActive ("/products") ? " border-b-4 border-b-green-600" : ""}`} >Products</Link></li>
                    {user && (
                      <>
                       <li><Link href={"/categories"} className={`${isActive ("/categories") ? " border-b-4 border-b-green-600" : ""}`} >Categories</Link></li>
                    <li><Link href={`/dashboard/${user?.role}`} className={`${isActive (`/dashboard/${user?.role}`) ? " border-b-4 border-b-green-600" : ""}`} >Dashboard</Link></li> 
                    <li><Link href={"/pricing"} className={`${isActive ("/pricing") ? " border-b-4 border-b-green-600" : ""}`} >Pricing</Link></li>
                      </>
                    )}
                    {/* <li><Link href={"/profile"} className={`${isActive ("/profile") ? " border-b-4 border-b-green-600" : ""}`} >My Profile</Link></li>
                     */}
                </ul> 
  <div className='flex gap-2  items-center'>
   {isPending ? <span className="loading loading-spinner text-success"></span> :
    user ? ( <div className='flex gap-2 items-center'> 
           
    <div className='rounded-full flex gap-2'> 
        {/* <Image src={user.image || userAvatar  }
        // referrerPolicy='no-referrer'
      alt=" author"
      width={50}
      height={50} 
      />   */}
      <DropDownHober />
      <div>
        <h2>{user.name}</h2> 
         <span className= {`font-bold ${role === "admin" ? "text-yellow-400" : 
        role === "buyer" ? "text-indigo-400" : "text-orange-600"}`}> {role} </span>
      </div>
    
                  </div>
                  <div></div>
                  
                  {/* <Link href="/login">
                    <button className='btn btn-success' 
                    onClick={async () => await authClient.signOut()} >
                       Log Out</button>
                       </Link> */}
   </div>)
   
                 :( <div className='flex gap-3'>
                   
                    
                   <Link href="/login">
  <Button type="submit" className="bg-green-500">
    Log In
  </Button>
</Link> 
          <Link href="/register">
  <Button type="submit" className="bg-green-500">
    Register
  </Button>
</Link>
                   
  {/* <Button type="submit"  className=' bg-green-500' ><Link href = {'/login'}></Link> Log In </Button>  */}
 {/* <Button type="submit"  className=' bg-green-500' ><Link href = {'/register'}></Link> Register </Button> */}
                    {/* <button className='btn btn-success'>
                        <Link href ={"/register"}>Register</Link>
                        </button> */}
                    
                    </div>)}
                    <div> <ThemeToggle />  </div>
        </div>
        </div>
    );
};

export default Navbar;