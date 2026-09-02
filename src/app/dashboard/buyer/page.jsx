
import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { TbPrism } from "react-icons/tb";
import { CiMoneyCheck1 } from "react-icons/ci";
import BuyerOverviewWishcard from '@/components/dashboard/BuyerOverviewWishcard'
import BuyerOverviewOrderscard from '@/components/dashboard/BuyerOverviewOrderscard'
import BuyerOverviewPaycard from '@/components/dashboard/BuyerOverviewPaycard'
import RecentPurchase from '@/components/dashboard/RecentPurchase'
import OverviewWishData  from'@/components/dashboard/OverviewWishData'
import { motion } from "framer-motion";


const BuyerOverviewPage = () => {
    return (
         <div className='container text-orange-700 mx-auto w-full bg-[#EFF6FF]'>
                Buyer overview
                  <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-4 mt-4 px-20 py-10'> 
                   {/* card1 */}
        {/* <div className="card bg-slate-100 w-70 h-70 shadow-md border-0 rounded-2xl justify-start items-left" /> */}
                               
        <div className="card bg-linear-to-br from-orange-400 via-green-500 to-teal-600  w-70 h-80 shadow-md border-0 rounded-2xl justify-start items-left "> 
          
          <figure className="px-10 pt-10">
            <TbPrism className='w-16 h-16'   />
           
          </figure>
         
         
          <div className="card-body items-center text-center">
            {/* <h2 className="card-title ">Total Orders </h2>
            // <p className='line-clamp-3'>100 </p> */}
            <BuyerOverviewOrderscard />
           </div>
         
          
        </div>
                  {/* card2 */}
                <div className="card text-left bg-linear-to-br from-orange-400 via-green-500 to-teal-600  w-70 h-80 shadow-md border-0 rounded-2xl">
        <figure className="px-10 pt-10">
         <FaRegHeart className='w-16 h-16 bg-red-600'  />
           </figure>  
           <div className="card-body items-center text-center">
            
             <BuyerOverviewWishcard />
           
           </div>
         </div>
                   {/* card3 */}
         <div className="card bg-linear-to-br from-orange-400 via-green-500 to-teal-600  w-70 h-80 shadow-md border-0 rounded-2xl items-center text-center">
         {/* <motion.div
          className="card  w-70 h-80 max-w-md mx-auto bg-linear-to-br from-emerald-400 via-green-500 to-teal-600 shadow-2xl shadow-green-500/30 overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
        > */}
         
          <figure className="px-10 pt-10  ">
            <CiMoneyCheck1 className='w-16 h-16'/>
           </figure>
           <div className="card-body items-center text-center">
            <BuyerOverviewPaycard />
           </div>
           </div>
         {/* </motion.div> */}
         </div>
<div className='container w-full bg-slate-200 shadow-accent-soft'>
  <RecentPurchase />
</div>
<div>
  <OverviewWishData />
</div>

         </div>
    );
};

export default BuyerOverviewPage;