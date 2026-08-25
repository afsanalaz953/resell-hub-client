import React from 'react';
import Image from "next/image"
import { HiUsers } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
// import { Table } from '@heroui/react';
import SellerProfilePage from '@/components/dashboard/SellerProfilePage'

const SellerDashboardHomepage = () => {
    return (
    <div className='container mx-auto w-full bg-[#EFF6FF]'>
    
          <div className='grid md:grid-cols-2 lg:grid-cols-4  gap-4 mt-4 px-20 py-10'> 
           {/* card1 */}
{/* <div className="card bg-slate-100 w-70 h-70 shadow-md border-0 rounded-2xl justify-start items-left" /> */}
                       
<div className="card bg-white w-50 h-40 shadow-md border-0 rounded-2xl justify-start items-left "> 
  
  <figure className="">
    <HiUsers className='w-6 h-6' />
  </figure>
 
 
  <div className="card-body items-center text-center">
    <h2 className="card-title ">Total Products </h2>
    <p className='text-2xl text-orange-800'>100 </p>
   </div>
 
  
</div>
          {/* card2 */}
        <div className="card text-left bg-white w-50 h-40 shadow-md border-0 rounded-2xl">
<figure className="px-10 pt-10">
 <SlCalender className='w-6 h-6'  />
   </figure>  
   <div className="card-body items-center text-center">
     <h2 className="card-title">Total Sales</h2>
     <p className='text-2xl text-orange-800'>234$</p>
   </div>
 </div>
           {/* card3 */}
 <div className="card bg-white w-50 h-40 shadow-md border-0 rounded-2xl items-center text-center">
  <figure className="px-10 pt-10  ">
    <FaArrowUpRightFromSquare  className='w-6 h-6'/>
   </figure>
   <div className="card-body items-center text-center">
     <h2 className="card-title">Total Revenue</h2>
    <p className='text-2xl text-orange-800'>$10000</p>
   </div>
 </div>
           {/* card4 */}
<div className="card bg-white w-50 h-40 shadow-md border-0 rounded-2xl items-center text-center">
  <figure className="px-10 pt-10  ">
    <FaArrowUpRightFromSquare  className='w-6 h-6'/>
   </figure>
   <div className="card-body items-center text-center">
     <h2 className="card-title text-md p-0 m-0">
      <span> Pending</span>
      <span>Orders </span>
       </h2>
    <span className='text-2xl text-orange-800'>50</span>
   </div>
 </div>
 </div> 

 <div>  <SellerProfilePage/>   </div>

 </div>

        
    );
};

export default SellerDashboardHomepage;

