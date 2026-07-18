"use client";
import React from 'react';


import { ToastContainer, toast } from 'react-toastify';
import { AlertDialog, Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";

const AdminStatusUpdate = ({adminproductid, status, }) => {
   const router = useRouter(); 
  const normalizedStatus = status?.toLowerCase();
   
const handleApprove = async () =>{ 
//     const {data:tokenData} = await authClient.token()
//   console.log(tokenData, "tokendata")

try{    
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${adminproductid}`,{
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
    return <Chip className='bg-green-400' variant="flat">Approved</Chip>;
  }

  return null; // অন্য কোনো স্ট্যাটাসের জন্য কিছু দেখাবেন না
};


// if(status === status?.toLowerCase()){
//      return <Button onClick={handleCancelBooking} color="success" >Approved</Button>; 
// }

   


export default AdminStatusUpdate;




// const AdminStatusUpdate = async(adminproductid, data) => {
//      await fetch(`/api/products/${adminproductid}`, { method: 'PATCH' });
//     return (
//         <div>
            
//         </div>
//     );
// };

