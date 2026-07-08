import React from 'react';
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import Logo from "@/components/shared/Logo"

export default function DashboardLayout({ children }) {
  return (
    
     <div className="  h-full bg-background container mx-auto " >
      <div className=''>
        <Logo />
             <div className="border-2" >Navbar</div>
         </div>
     

<div className=' flex flex-1 overflow-y-auto'>
      
 {/* sidebar */}
 <div className="border-2 min-h-screen bg-[#0F172B] px-4 "  > <DashboardSidebar />  </div>
 <main  className='p-2'> {children} </main>
</div>

   
 



     </div>

  );
}

