
import React from 'react';
import PaymentTable from "@/components/dashboard/PaymentTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BuyerPaymentPage = async () => {

const tokenObj = await auth.api.getToken({
       headers: await headers()
     })
      console.log(tokenObj, "buyerpaymentToken")

    const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const buyerEmail = user?.email; // session থেকে ইমেইল

  let payments = [];

  if (buyerEmail) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/buyer/payment?buyerEmail=${encodeURIComponent(buyerEmail)}`,
        { cache: 'no-store',
        headers:{
      authorization: `Bearer ${tokenObj.token}`
   }
    });

      if (!res.ok) {
        console.error(`API Error: ${res.status}`);
      } else {
        payments = await res.json();
        console.log('✅ Fetched bookings:', payments);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error.message);
    }
  }

    return (
        <div>
<h1>Payment History</h1>
      <PaymentTable payments={payments} /> 
            
        </div>
    );
}; 

export default BuyerPaymentPage;