import React from 'react';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BuyerOverviewOrderscard = async() => {
const tokenObj = await auth.api.getToken({
       headers: await headers()
     })
      console.log(tokenObj, "overviewOrder")


const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const userId = user?.id;
   const buyerEmail = user?.email;

  // উইশলিস্ট ডেটা ফেচ (ঠিক উইশলিস্ট পেজের মতো)
  let totalOrdersData = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/buyer/myorders`,
      {
        cache: 'no-store',
        headers:{
      Authorization: `Bearer ${tokenObj.token}`
   }
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