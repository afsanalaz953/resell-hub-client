import React from 'react';
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";


export default function DashboardLayout({ children }) {
  return (
    
     <div className="  h-full bg-background container mx-auto " >
      <div className=''>
        {/* <Logo />
             <div className="border-2" >Navbar</div> */}
             <DashboardNavbar />
         </div>
     

<div className=' flex flex-1 overflow-y-auto'>
      
 {/* sidebar */}
 <div className="border-2 min-h-screen bg-[#0F172B] px-4 "  > <DashboardSidebar />  </div>
 <main  className='p-2'> {children} </main>
</div>

   
 



     </div>

  );
}

