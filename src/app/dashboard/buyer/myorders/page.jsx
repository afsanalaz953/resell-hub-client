import React from 'react';
import OrderTable from "@/components/dashboard/OrderTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BuyerOrderPage = async() => {
    const session = await auth.api.getSession({
     headers: await headers(), // you need to pass the headers object.
 });
 const user = session?.user;
 const userId = user?.id;
 const customerEmail = user?.email;
console.log(session, "booking session")
if (!user) {
    // return <div className="p-5 text-red-500">দয়া করে লগইন করুন</div>;
    redirect('/login');  // চাইলে redirect না করে মেসেজ দেখাতে পারেন
  }

// from ticket
// const bookings = await fethMyBooking(user?.email);
//     // console.log(bookings);
// user id dhore ante hobe
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/buyer/myorders/${customerEmail}`, {
  cache: 'no-store',

//   headers:{
//     authorization: `Bearer ${tokenObjData.token}`
//      }    
});
const bookings = await res.json();

 console.log(bookings, "bookings Data")
  


    return (
        <div>
           <h1>My Order List</h1> 
           <div>
              <OrderTable bookings={bookings} />
              {/* ai props ta same same hobe both component and page. 
              means ordertable a je props pathiaso, sei props e hobe  */}
           </div>
        </div>
    );
   };


export default BuyerOrderPage;