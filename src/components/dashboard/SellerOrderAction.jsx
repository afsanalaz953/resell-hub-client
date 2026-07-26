"use client";
import React from 'react';


import { ToastContainer, toast } from 'react-toastify';
import { AlertDialog, Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";

const SellerOrderAction = ({orderId, status, }) => {
   const router = useRouter(); 
  const normalizedStatus = status?.toLowerCase();
   
const handleApprove = async () =>{ 
//     const {data:tokenData} = await authClient.token()
//   console.log(tokenData, "tokendata")

try{    
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${orderId}`,{
method: "PATCH",
headers:{
    "content-type" : "application/json"},
//  authorization: `Bearer ${tokenData?.token}`

 body: JSON.stringify({ status: "Approved" }) 

});

const data = await res.json();
console.log(data);
// window.location.reload();
if (res.ok)  {
 toast.success('Product Approved');
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

if (normalizedStatus === "pending") {
    return <Chip as="button"  onClick={handleApprove} className='bg-orange-300'>Pending</Chip>;
  }

  if (normalizedStatus === "approved") {
    return <Chip className='bg-green-400' variant="flat">Accepted</Chip>;
  }

  return null; // অন্য কোনো স্ট্যাটাসের জন্য কিছু দেখাবেন না
};


// if(status === status?.toLowerCase()){
//      return <Button onClick={handleCancelBooking} color="success" >Approved</Button>; 
// }

   


export default SellerOrderAction ;




// const AdminStatusUpdate = async(adminproductid, data) => {
//      await fetch(`/api/products/${adminproductid}`, { method: 'PATCH' });
//     return (
//         <div>
            
//         </div>
//     );
// };







// // components/OrderAction.jsx
// 'use client';

// import { useState } from 'react';
// import { Button } from '@heroui/react';

// export default function OrderAction({ orderId, currentStatus }) {
//   const [loading, setLoading] = useState(false);

//   const handleUpdate = async (newStatus) => {
//     if (loading || currentStatus !== 'pending') return;
//     setLoading(true);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/update`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId, status: newStatus }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Update failed');
//       }

//       window.location.reload();
//     } catch (error) {
//       console.error('Failed to update status:', error);
//       alert('Error updating order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // সব সময় বাটন দেখাবে, কিন্তু pending না হলে ডিসেবল থাকবে
//   const isPending = currentStatus === 'pending';

//   return (
//     <div className="flex items-center gap-2">
//       <Button
//         size="sm"
//         color="success"
//         variant="flat"
//         isDisabled={!isPending || loading}
//         isLoading={loading}
//         onClick={() => handleUpdate('accepted')}
//       >
//         Accept
//       </Button>
//       <Button
//         size="sm"
//         color="danger"
//         variant="flat"
//         isDisabled={!isPending || loading}
//         isLoading={loading}
//         onClick={() => handleUpdate('rejected')}
//       >
//         Reject
//       </Button>
//       {!isPending && (
//         <span className="text-xs text-gray-500 ml-1">
//           (Already {currentStatus})
//         </span>
//       )}
//     </div>
//   );
// }