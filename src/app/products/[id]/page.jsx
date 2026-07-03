import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button, Chip, Input } from "@heroui/react";
// import { BookOpen, Clock } from "lucide-react";
//  import BuyModal from "@/components/shared/BuyModal"
// import { auth } from '@/lib/auth';
// import { headers } from 'next/headers';

const ProductDetailsPage = async({params}) => {
    const {id} = await params;
    
// //  const tokenObj = await auth.api.getToken({
// //        headers: await headers()
// //      })
//       console.log(tokenObj)
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/products/${id}`,{
cache:"no-store",
// headers:{
//       authorization: `Bearer ${tokenObj.token}`
//    }
});

if (!res.ok) {
  throw new Error(`Failed to fetch tutor: ${res.status}`);
}
const singleProduct = await res.json();
console.log(singleProduct,"buy product")
const {_id, title, category, condition, price, status, 
    description, image } = singleProduct;
    // console.log( id,"Details", tutorDetails); 
// const safeImage = image && image.trim() !== "" ? image : null;

//  const isSlotAvailable = availableSlots > 0;
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // ignore time
//   const startDate = new Date(sessionStartDate);
//   startDate.setHours(0, 0, 0, 0);
//   const isBookingAllowed = isSlotAvailable && (today >= startDate);



    return (
        <div className="container "> 
        <div className='w-200 p-2 border-0 shadow-lg  grid grid-cols-2 gap-12 rounded-2xl h-150 bg-white container my-12 mx-auto '>
             <div className='divright w-100 h-full'>
               <Image
             alt="product Image"
         className=" cover w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        src={image}
            width={1500}
        height={1000}         
           /> 
           {/* {safeImage ? (
    <Image
      alt="Tutor Image"
      className="cover w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      src={safeImage}
      width={1500}
      height={1000}         
    />
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
      No Image Available
    </div>
  )} */}
             </div>
<div className='cardleft mt-6 space-y-4'>
 <h1 className="text-3xl font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                            {title}
                        </h1>   
<h2
 
  className=" items-center font-bold  text-blue-800"
                    >
    {category}
 </h2> 

<div className="grid grid-cols-2 items-center gap-4 text-xs text-slate-500 font-bold">
                    {/* <span className="flex items-center gap-1 bg-blue-100 p-3 rounded-2xl">
                        <Clock className="w-3.5 h-3.5 bg-pink-100" />Time Slot: {timeSlot}
                    </span> */}
                    <span className="flex items-center gap-1  bg-pink-50 p-4 rounded-2xl">
                        {/* <BookOpen className="w-3.5 h-3.5" /> 24 Lessons */}
                        <p>Condition: {condition}</p>
                    </span>
                </div>
         <div className=" grid grid-cols-2 mt-auto border-t border-slate-100  gap-3 items-center">
                    {/* <span className="text-sm  bg-purple-100 p-4 rounded-2xl font-black text-blue-600">
                         Hourly Fee: ${singleProduct.hourlyFee}</span> */}
               <p className="text-sm  bg-sky-100 p-4 rounded-2xl text-slate-500 font-medium flex items-center gap-1">
                       <span className="text-slate-900">{status}</span>
                    </p>
                </div>
                {/* <div>
                    <p className='font-bold text-black text-lg'> Institution: </p>
                      <p className='text-slate-500 '> {institution} </p>     
                </div> */}
                {/* <div>
                     <p className='font-bold text-black text-lg'> </p>
                      <p className='text-slate-500 ' > {status} </p>  
                     
                </div> */}
                <div>
                  <p className='font-bold text-black text-lg'> Description: </p>
                      <p className='text-slate-500 ' > {description} </p> 
                </div>
                 <div>
                  <p className='font-bold text-black text-xl'> Price: </p>
                      <p className='text-orange-800 font-bold, text-3xl' > {price} </p> 
                </div>
                {/* ----- */}
                <div>
 {/* {!isSlotAvailable && (
              <p className="text-red-500 text-sm mt-2">No available slots left.</p>
            )} 
            {isSlotAvailable && !isBookingAllowed && today < startDate && (
              <p className="text-red-500 text-sm mt-2">
                Booking opens on {new Date(sessionStartDate).toLocaleDateString()}.
              </p>
             
            )} */}
            <div>
  {/* <BuyModal singleProduct = {singleProduct} />    */}
  <form action={"/api/payment"} method="POST">
                  <input type="hidden" name="price" value={price} />
                  <input type="hidden" name="title" value={title} />
                  <input type="hidden" name="productId" value={_id} />

                  <button
                    type="submit"
                    className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold"
                  >
                    Buy Now
                  </button>
                </form>
            </div>
 

                   
                </div>
        </div>
             </div>
          
        </div>
    );
};

export default ProductDetailsPage;