import React from 'react';
import Image from "next/image";
import Link from "next/link";
import WishCard from "@/components/dashboard/WishCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const session = await auth.api.getSession({
     headers: await headers(), // you need to pass the headers object.
 });
 const user = session?.user;
 const buyerId = user?.id;




const Wishlistpage = async() => {
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist?${buyerId}`, {
  cache: 'no-store',

//   headers:{
//     authorization: `Bearer ${tokenObjData.token}`
//      }    
});
const wishlistData = await res.json();

 console.log(wishlistData, "buyer wishlist Data")





    return (
          <div className="">
            <h1 className='font-bold text-orange-700 text-3xl'> My WishList  ({wishlistData.length} )   </h1>
            <div className='m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 '>
 {wishlistData.map((product) => (
        <WishCard key={product._id} product={product} buyerId={buyerId} />
      ))}
      </div>
    </div>
    );
};

export default Wishlistpage;