// components/LatestProducts.js
import React from 'react';
import ProductCard from "@/components/shared/ProductCard";
import Link from 'next/link'
import {Button} from "@heroui/react"
import { FaArrowRight } from "react-icons/fa";

const LatestProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/latest`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch latest products: ${res.status}`);
  }

  const latestProducts = await res.json();

  return (
    <div className='container mx-auto bg-white p-10'>
      <h2 className='text-3xl font-bold text-center m-10'>Latest Products</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {latestProducts.map((product, index) => (
          <ProductCard allProducts={product} key={index} />
        ))}
      </div>
      <div className='container'>
        <Link href = '/products'>
        <Button className='text-lg p-6 ml-125 mx-auto bg-white text-orange-600 rounded-2xl 
         border-2'> View all Products <span > <FaArrowRight /></span></Button>
        </Link>
       </div>
    </div>
  );
};

export default LatestProducts;





// import React from 'react';
// import ProductCard from "@/components/shared/ProductCard"


// // const FeaturedProducts = async() => {
// // const res = await fetch(`${process.env.NEXT_SERVER_URL}/featured`),{
// // cache:"no-store"
// // }
// const FeaturedProducts  = async() => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
//     cache: "no-store",
//   })
//   if (!res.ok) {
//       throw new Error(`Failed to fetch featured tutors: ${res.status}`);
//     }

// const topProducts = await res.json()
//    console.log( "topTutors", topProducts); 




   



//     return (
//         <div className='container mx-auto bg-slate-100 p-10'>
//             <div className =' text-3xl font-bold text-center m-10'>Top Featured Products</div>
//               <div className='grid  md:grid-cols-2  lg:grid-cols-3 gap-6'>
//                 {topProducts.map ((featuredProducts, ind) => {
//                 return <ProductCard allProducts = {featuredProducts} key = {ind}/>
//               })}
                
//                 </div>
           
//         </div>
//     );
// };

// export default  FeaturedProducts;