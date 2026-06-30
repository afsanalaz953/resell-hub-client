"use client"
import React from 'react';


import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

import { usePathname } from 'next/navigation';



const Footer = () => {
  const pathname = usePathname();
    console.log (pathname, "pathname");
    if(pathname.includes('dashboard')){
      return null;
    }



    const currentYear = new Date ().getFullYear();
    return (
        <div className='bg-[#101828] container mx-auto text-white pt-10 pb-5'>
            <div className='space-y-2'>
           <h2 className='text-4xl text-orange-600 font-bold text-center'>
            ReSell Hub
            </h2>
            <p className='text-sm text-center text-[#96aaa4]'>Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
             <h2 className='text-center text-orange-600'>Social Links </h2>
            </div>
             
               <div className='flex flex-cols-3 justify-center items-center gap-2'>
                 {/* <div> <Image src={instraImg} className="mx-auto" alt="" /></div> */}
                 <div className='text-orange-500'> <BsInstagram /> </div>
                <div className='text-orange-600'> <FaFacebook /></div>
                <div className='text-orange-600'> <FaXTwitter /></div>
               </div>
               
<div className="border-t border-gray-800 p-8 text-center mt-4 flex gap-10 justify-between">
    <div>
<p className="text-gray-400 text-sm">
            © {currentYear} ReSell Hub. All rights reserved.
          </p>
    </div>   
          <div>
            <ul className='flex gap-3 text-gray-400 justify-center'>
                <li>Privacy Policy</li>
                <li> Terms of Service  </li>
                <li>Cookies</li>
            </ul>
          </div>
        </div>



        </div>

        
        

    );
};

export default Footer;