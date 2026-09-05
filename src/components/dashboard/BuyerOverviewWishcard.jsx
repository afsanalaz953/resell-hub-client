import React from 'react';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BuyerOverviewWishcard = async() => {
  const tokenObj = await auth.api.getToken({
       headers: await headers()
     })

const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const userId = user?.id;
  const buyerId = userId;

  // উইশলিস্ট ডেটা ফেচ (ঠিক উইশলিস্ট পেজের মতো)
  let wishlistData = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`,
      {
        cache: 'no-store',
        headers:{
      authorization: `Bearer ${tokenObj?.token}`
   }
        // প্রয়োজনে হেডার যোগ করুন
      }
    );
    wishlistData = await res.json();
  } catch (error) {
    console.error('Wishlist fetch error:', error);
  }



    return (
        <div>
             <div className="card-body items-center text-center">
            <h2 className="card-title">Wishlist Count</h2>
            <p className='text-2xl font-bold text-orange-700' >{wishlistData.length || 0}</p>  {/* কাউন্ট দেখানো */}
          </div>
        </div>
    );
};

export default BuyerOverviewWishcard;