"use client";
import React from 'react';


import { ToastContainer, toast } from 'react-toastify';
import { AlertDialog, Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";

const SellerOrderAction = ({orderId, orderStatus }) => {
   const router = useRouter(); 
  // const orderStatus = orderStatus?.toLowerCase();
   
const handleApprove = async () =>{ 
//     const {data:tokenData} = await authClient.token()
//   console.log(tokenData, "tokendata")

try{    
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${orderId}`,{
method: "PATCH",
headers:{
    "content-type" : "application/json"},
//  authorization: `Bearer ${tokenData?.token}`

 body: JSON.stringify({orderStatus: "approved"}) 

});

const data = await res.json();
console.log(data);
// window.location.reload();
if (res.ok)  {
 toast.success('Order Approved');
                // duration: 2000,
                // position: 'top-center'})
  // window.location.reload(); 
       router.refresh();           

}else{
   toast.error(data.message || 'problem in cancel');  
     }
    } catch (error) {
      toast.error('try later');
    }
}

  // ✅ শুধু pending বা paid থাকলেই Approve বাটন দেখাবে
if (orderStatus === "pending") {
    return <Chip as="button"  onClick={handleApprove} className='bg-orange-300'>Approve</Chip>;
  }
  
// ✅ Approved থাকলে শুধু দেখাবে, clickable নয়
  if (orderStatus === "approved") {
    return <Chip className='bg-green-400' isDisabled  variant="flat">Already Approved</Chip>;
  }

  return null; // অন্য কোনো স্ট্যাটাসের জন্য কিছু দেখাবেন না
};


// if(status === status?.toLowerCase()){
//      return <Button onClick={handleCancelBooking} color="success" >Approved</Button>; 
// }

   


export default SellerOrderAction ;












