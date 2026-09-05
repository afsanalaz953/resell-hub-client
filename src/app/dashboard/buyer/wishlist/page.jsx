import React from 'react';
import Image from "next/image";
import Link from "next/link";
import WishCard from "@/components/dashboard/WishCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const Wishlistpage = async() => {
const tokenObj = await auth.api.getToken({
       headers: await headers()
     })
      console.log(tokenObj, "wishToken")


const session = await auth.api.getSession({
     headers: await headers(), // you need to pass the headers object.
 });
 const user = session?.user;
//  const buyerId = user?.id;
 const userId = user?.id;
 const buyerId = userId;
 
if (!userId || !tokenObj?.token) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        please log in
      </div>
    );
  }

// ৪. API কল করুন (এরর হ্যান্ডলিং যোগ করলাম)
  let wishlistData = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`, {
      // ?buyerId=${userId}
      cache: 'no-store',
      headers: {
        authorization: `Bearer ${tokenObj?.token}`
      }
    });

    // রেসপন্স চেক করুন
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    wishlistData = Array.isArray(data) ? data : []; // অ্যারে নিশ্চিত করুন
  } catch (error) {
    console.error("উইশলিস্ট আনতে সমস্যা:", error);
    wishlistData = [];
  }

  // ৫. UI রেন্ডার (খালি অবস্থা হ্যান্ডেল করুন)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-orange-700 text-3xl mb-6">
        My WishList ({wishlistData.length})
      </h1>

      {wishlistData.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          আপনার উইশলিস্ট খালি।
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistData.map((product) => (
            <WishCard key={product._id} product={product} buyerId={userId} />
          ))}
        </div>
      )}
    </div>





// const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`, {
//   cache: 'no-store',

//   headers:{
//     authorization: `Bearer ${tokenObj?.token}`
//      }    
// });
// const wishlistData = await res.json();

//  console.log(wishlistData, "buyer wishlist Data")





//     return (
//           <div className="">
//             <h1 className='font-bold text-orange-700 text-3xl'> My WishList  ({wishlistData.length} )   </h1>
//             <div className='m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 '>
//  {wishlistData.map((product) => (
//         <WishCard key={product._id} product={product} buyerId={user?.id} />
//       ))}
//       </div>
//     </div>
    );
};

export default Wishlistpage;