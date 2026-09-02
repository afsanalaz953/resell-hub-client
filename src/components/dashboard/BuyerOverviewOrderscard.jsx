import React from 'react';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BuyerOverviewOrderscard = async() => {
const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const buyerId = user?.id;
   const buyerEmail = user?.email;

  // উইশলিস্ট ডেটা ফেচ (ঠিক উইশলিস্ট পেজের মতো)
  let totalOrdersData = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?buyerId=${buyerId}`,
      {
        cache: 'no-store',
        // প্রয়োজনে হেডার যোগ করুন
      }
    );
    totalOrdersData  = await res.json();
  } catch (error) {
    console.error('Orders fetch error:', error);
  }



    return (
        <div>
             <div className="card-body items-center text-center">
            <h2 className="card-title">Total Orders</h2>
            <p className='text-2xl font-bold text-orange-700'>{totalOrdersData.length || 0}</p>  {/* কাউন্ট দেখানো */}
          </div>
        </div>
    );
};

export default BuyerOverviewOrderscard;