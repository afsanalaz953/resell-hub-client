import React from 'react';
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import Image from "next/image";
import { Table } from '@heroui/react';
//  import CancelledButton from "@/components/dashboard/CancelledButton";


const ManageSellerOrderPage = async() => {
const session = await auth.api.getSession({
     headers: await headers(), // you need to pass the headers object.
 });
 const user = session?.user;
console.log(session)
// from buyer manageorders
const buyerEmail = user?.email; // session থেকে ইমেইল
console.log(buyerEmail, "email")
   let orders = [];

  if (buyerEmail) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?buyerEmail=${encodeURIComponent(buyerEmail)}`,
        { cache: 'no-store' }
      );

      if (!res.ok) {
        console.error(`API Error: ${res.status}`);
      } else {
        orders = await res.json();
        console.log('✅ Fetched bookings:', orders);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error.message);
    }
  }


// const tokenObjData = await auth.api.getToken({
//         headers: await headers()
//     })
//      console.log(tokenObjData, "objData")

// user id dhore ante hobe
// const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/buyer/payment?customerEmail=${encodeURIComponent(customerEmail)}`,{
//    cache: 'no-store',
//   // headers:{
//   //   authorization: `Bearer ${tokenObjData.token}`
//   //    }    
// });

// const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${userId}`,{
// cache:"no-store",
// // headers:{
// //       authorization: `Bearer ${tokenObj.token}`
// //    }
// });




    return (
        <div>
           ManageOrderPage 
           <h1 className='font-bold text-3xl m-10'> My Orders</h1>
        ✅ Empty state check – put it here
      {!orders || orders.length === 0 ? (
        <div className="text-center m-6 p-10 bg-gray-100 rounded-lg shadow">
          <p className="text-gray-600 text-lg"> No bookings available yet.</p>
          <p className="text-gray-500">Click “Book Tutors” to get started.</p>
        </div>
      ) : 

       ( <div className='shadow-lg'>

 <Table className='lg:w-min-700 bg-yellow-200 my-10 md:w-[760px] '>
  <Table.ScrollContainer>
    <Table.Content aria-label="Team members" className='p-4'>
      <Table.Header>
        <Table.Column className= "font-bold text-lg">Product Name</Table.Column>
        <Table.Column className= "font-bold text-lg"  isRowHeader>Buyer</Table.Column>
        <Table.Column className= "font-bold text-lg">Category</Table.Column>
        <Table.Column className= "font-bold text-lg">Price</Table.Column>
        {/* <Table.Column>booking Id</Table.Column> */}
        <Table.Column className= "font-bold text-lg" >Status</Table.Column>
        <Table.Column className= "font-bold text-lg" >Action</Table.Column>
      </Table.Header>
      <Table.Body>
         {orders && orders.map((orderedData) => ( 
      
          <Table.Row key={orderedData?._id}>
            <Table.Cell>
              <Image
                src={orderedData.image}
                alt={orderedData.title}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              {/* _id
6a54c662927b898e5033f5ea
buyerName
"nuri"
buyerEmail
"lazafsana72@gmail.com"
productId
"6a4c72d4b41f7b7d5d339e70"
productName
"Used Suzuki Alto 2010"
productImage
"https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600"
productStatus
"available"
status
"PENDING" */}
            </Table.Cell>
            <Table.Cell>{orderedData.productName}</Table.Cell>
            <Table.Cell>{orderedData.buyerName}</Table.Cell>
            {/* <Table.Cell>{bookedData._id}</Table.Cell> */}
            <Table.Cell>{orderedData.buyerEmail}</Table.Cell>
            <Table.Cell>{orderedData.productId}</Table.Cell>
            <Table.Cell className="" > {orderedData.status}</Table.Cell> 
            {/* <Table.Cell className="" > {Success || Cancelled}</Table.Cell> */}
            {/* <Table.Cell> <Button bookingId = {bookedData._id} /> </Table.Cell> */}
            {/* <Table.Cell> <CancelledButton bookingId = {bookedData._id} status={bookedData.tutorStatus}  /> </Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>
 
 </div>)
} 
        </div>
    );
};

export default ManageSellerOrderPage;