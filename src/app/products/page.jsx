import React from 'react';
import ProductCard from "@/components/shared/ProductCard";
import ProductPagination from "@/components/dashboard/Pagination";
import CategorySidebar from "@/components/shared/CategorySidebar"; // নতুন কম্পোনেন্ট (নিচে দেখুন)

export const dynamic = 'force-dynamic'; // প্রয়োজনে

const AllProducts = async ({ searchParams }) => {
  // ইউআরএল থেকে প্যারামিটার পড়া
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 8;
  const category = params.category || ''; // ফিল্টার

  // API কল – ক্যাটাগরি থাকলে পাঠাব
  let apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/products?page=${page}&limit=${limit}`;
  if (category) {
    apiUrl += `&category=${encodeURIComponent(category)}`;
  }

  const res = await fetch(apiUrl, { cache: 'no-store' });
  const allProductsData = await res.json();
  const { total_page, data } = allProductsData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-3xl text-center mb-6">{category || "All Products"}</h1>

      {/* দুই কলাম লেআউট */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* বাম পাশে – ক্যাটাগরি সাইডবার (ক্লায়েন্ট কম্পোনেন্ট) */}
        <aside className="md:w-1/4 w-full">
          <CategorySidebar selectedCategory={category} />
        </aside>

        {/* ডান পাশে – প্রোডাক্ট গ্রিড + পেজিনেশন */}
        <section className="md:w-3/4 w-full">
          {data?.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No products found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((product) => (
                  <ProductCard key={product._id} allProducts={product} />
                ))}
              </div>

              {/* পেজিনেশন – কম্পোনেন্ট অপরিবর্তিত */}
              <div className="mt-8 flex justify-center">
                <ProductPagination page={page} total_page={total_page} />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default AllProducts;








// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button, Card, Chip, Spinner } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link";
// import ProductCard from "@/components/shared/ProductCard"
// import ProductPagination from "@/components/dashboard/Pagination"
// import Categories from '@/components/homePage/Categories'

// // import SearchBar from "@/components/shared/SearchBar"
// // import SearchStartDate from "@/components/shared/SearchStartDate"
// // import SearchEndDate from "@/components/shared/SearchEndDate"
// // import ResetFilter from "@/components/shared/ResetFilter"


// const AllProducts = async({searchParams}) => {
//   const searchQuery = await searchParams;
//   const page = searchQuery.page|| 1;
//   const limit = searchQuery.limit|| 8;

// const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/products?page=${page}&limit=${limit}`);
// const allProductsData = await res.json();
  
// const { total_page, data} = allProductsData
   
// // // unlock korlam for tutor search
// //   const res = await fetch(url);
// //   const allTutors = await res.json();

// //  const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`);
// // const allTutorsData = await res.json();

// console.log(allProductsData, "allproducts");

//     return (
//         <div className='container mx-auto '> 
//             <h1 className='font-bold text-3xl text-center m-4'>All Products</h1>
//            <div className='productbody flex flex-col'>
//           <div>
//             <Categories />
//           </div>
//             <div className='container mx-auto grid md:grid-cols-2  lg:grid-cols-4 gap-6'>
                
//            {data?.map(allProducts =>  < ProductCard key = {allProducts?._id}
//             allProducts = {allProducts} 
            
//             />
           
   

    
              
       
//         )}
//         <div className='m-8 container text-orange-800'>
//           <ProductPagination page={page} total_page={total_page}    />
//         </div>
       
//       </div>  
//       </div>

//         </div> 
//     );
//   };

// export default AllProducts;