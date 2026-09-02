import React from 'react';
import LatestOrderCard from "@/components/dashboard/LatestOrderCard";
import Link from 'next/link';
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

const LatestOrders = async () => {
  let latestOrders = [];
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/latest`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch latest orders: ${res.status}`);
    }

    const data = await res.json();
    console.log(data, 'latestOrderData')
    // যদি API অ্যারে না দেয়, তাহলে অ্যারে বের করে নিন
    latestOrders = Array.isArray(data) ? data : data.orders || [];
  } catch (err) {
    console.error('Error fetching latest orders:', err);
    error = err.message;
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">Error loading orders: {error}</div>;
  }

  if (latestOrders.length === 0) {
    return <div className="text-center p-10 text-gray-500">No orders found.</div>;
  }

  return (
    <div className='container mx-auto bg-slate-100 '>
      <h2 className='text-3xl font-bold text-center m-2'>Latest Orders</h2> {/* টেক্সট পরিবর্তন */}
      <div className='flex-col gap-2'>
        {latestOrders.map((order, index) => (
          <LatestOrderCard order={order} key={order._id || index} />  
        //  prop নাম 'order'
        ))}
      </div>
      <div className='container mt-4 flex justify-center'>
        {/* http://localhost:3000/dashboard/buyer/myorders */}
        <Link href='/dashboard/buyer/myorders'>  {/* লিংক পরিবর্তন */}
          <Button className='text-lg p-6 bg-white text-orange-600 rounded-2xl border-2'>
            View all Orders <span><FaArrowRight /></span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestOrders;





// // components/LatestProducts.js
// import React from 'react';
// import LatestOrderCard from "@/components/dashboard/LatestOrderCard";
// import Link from 'next/link'
// import {Button} from "@heroui/react"
// import { FaArrowRight } from "react-icons/fa";

// const LatestOrders = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/latest`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch latest products: ${res.status}`);
//   }

//   const latestOrders = await res.json();

//   return (
//     <div className='container mx-auto bg-white p-10'>
//       <h2 className='text-3xl font-bold text-center m-10'>Latest Products</h2>
//       <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
//         {latestOrders.map((orders, index) => (
//           <LatestOrderCard latestOrders={orders} key={index} />
//         ))}
//       </div>
//       <div className='container mt-4'>
//         <Link href = '/products'>
//         <Button className='text-lg p-6 ml-125 mx-auto bg-white text-orange-600 rounded-2xl 
//          border-2'> View all Orders <span > <FaArrowRight /></span></Button>
//         </Link>
//        </div>
//     </div>
//   );
// };

// export default LatestProducts;





// // import React from 'react';
// // import ProductCard from "@/components/shared/ProductCard"


// // // const FeaturedProducts = async() => {
// // // const res = await fetch(`${process.env.NEXT_SERVER_URL}/featured`),{
// // // cache:"no-store"
// // // }
// // const FeaturedProducts  = async() => {
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
// //     cache: "no-store",
// //   })
// //   if (!res.ok) {
// //       throw new Error(`Failed to fetch featured tutors: ${res.status}`);
// //     }

// // const topProducts = await res.json()
// //    console.log( "topTutors", topProducts); 




   



// //     return (
// //         <div className='container mx-auto bg-slate-100 p-10'>
// //             <div className =' text-3xl font-bold text-center m-10'>Top Featured Products</div>
// //               <div className='grid  md:grid-cols-2  lg:grid-cols-3 gap-6'>
// //                 {topProducts.map ((featuredProducts, ind) => {
// //                 return <ProductCard allProducts = {featuredProducts} key = {ind}/>
// //               })}
                
// //                 </div>
           
// //         </div>
// //     );
// // };

// // export default  FeaturedProducts;