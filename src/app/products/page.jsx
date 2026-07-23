import React from 'react';
import ProductCard from "@/components/shared/ProductCard"
// import SearchBar from "@/components/shared/SearchBar"
// import SearchStartDate from "@/components/shared/SearchStartDate"
// import SearchEndDate from "@/components/shared/SearchEndDate"
// import ResetFilter from "@/components/shared/ResetFilter"


const AllProducts = async() => {
const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/products/all`);
const allProductsData = await res.json();
  

   
// // unlock korlam for tutor search
//   const res = await fetch(url);
//   const allTutors = await res.json();

//  const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`);
// const allTutorsData = await res.json();

console.log(allProductsData, "allproducts");

    return (
        <div className='container mx-auto '> 
            <h1 className='font-bold text-3xl text-center m-4'>All Products</h1>
            {/* <div className='flex lg:flex-2  md: flex-1 gap-2'>
              <SearchBar />
              <SearchStartDate />
              <SearchEndDate />
              <ResetFilter />
            </div> */}
          
            <div className='container mx-auto grid md:grid-cols-2  lg:grid-cols-4 gap-6'>
                
           {allProductsData?.map(allProducts =>  < ProductCard key = {allProducts?._id} allProducts = {allProducts} />
           
    //        key = {allTutor?._id}>
    // <h2  >  {allTutor.tutorName} </h2>

          
        //    < TutorCard key = {allTutor?._id} allTutor = {allTutor} />

    
              
       
        )};
      </div>    

        </div> 
    );
  };

export default AllProducts;