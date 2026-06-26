import React from 'react';
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import Logo from "@/components/shared/Logo"

export default function DashboardLayout({ children }) {
  return (
    
     <div className="  h-screen bg-background container mx-auto" >
      <div className=''>
        <Logo />
             <div className="border-2" >Navbar</div>
         </div>
     

<div className=' flex flex-1 overflow-y-auto'>
      
 {/* sidebar */}
 <div className="border-2 "  > <DashboardSidebar />  </div>
 <main  className='p-10'> {children} </main>
</div>

   
 



     </div>

  );
}

