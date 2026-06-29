import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { TbPrism } from "react-icons/tb";
import { CiMoneyCheck1 } from "react-icons/ci";
const BuyerDashboardPage = () => {
    return (
         <div className='container mx-auto w-full bg-[#EFF6FF]'>
                buyer dashboard overview
                  <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-4 mt-4 px-20 py-10'> 
                   {/* card1 */}
        {/* <div className="card bg-slate-100 w-70 h-70 shadow-md border-0 rounded-2xl justify-start items-left" /> */}
                               
        <div className="card bg-white w-40 h-40 shadow-md border-0 rounded-2xl justify-start items-left "> 
          
          <figure className="">
            <TbPrism className='w-10 h-10 '/>
           
          </figure>
         
         
          <div className="card-body items-center text-center">
            <h2 className="card-title ">Total Orders </h2>
            <p className='line-clamp-3'>All tutors </p>
           </div>
         
          
        </div>
                  {/* card2 */}
                <div className="card text-left bg-white  w-40 h-40  shadow-md border-0 rounded-2xl">
        <figure className="px-10 pt-10">
         <FaRegHeart className='w-10 h-10'  />
           </figure>  
           <div className="card-body items-center text-center">
             <h2 className="card-title">Wishlist Count </h2>
             <p>Book sessions</p>
           </div>
         </div>
                   {/* card3 */}
         <div className="card bg-white w-40 h-40 shadow-md border-0 rounded-2xl items-center text-center">
          <figure className="px-10 pt-10  ">
            <CiMoneyCheck1 className='w-10 h-10'/>
           </figure>
           <div className="card-body items-center text-center">
             <h2 className="card-title">Recent Purchases</h2>
            <p>Simple and </p>
           </div>
         </div>
         </div>
         </div>
    );
};

export default BuyerDashboardPage;