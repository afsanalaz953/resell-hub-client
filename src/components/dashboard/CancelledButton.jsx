"use client";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { AlertDialog, Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";

const CancelledBookingButton = ({id, orderStatus}) => {
   const router = useRouter(); 
 const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
   
const handleCancelBooking = async () =>{ 
//     const {data:tokenData} = await authClient.token()
//   console.log(tokenData, "tokendata")
setIsLoading(true);

try{    
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`,{
method: "PATCH",
headers:{
    "content-type" : "application/json"},
//  authorization: `Bearer ${tokenData?.token}`
 body: JSON.stringify({ orderStatus: "cancelled" })
});

const data = await res.json();
console.log(data, 'buyercancelledData');
// window.location.reload();
if (res.ok)  {
 toast.success('Order cancelled');
                // duration: 2000,
                // position: 'top-center'})

       router.refresh();           

}else{
   toast.error(data.message || 'problem in cancel');  
     }
    } catch (error) {
      toast.error('try later');
    }
    finally {
      setIsLoading(false);
    }
}

if(orderStatus === "cancelled"){
     return <Button variant="danger" isDisabled>Cancelled</Button>; 
}
if (orderStatus !== 'pending') {
  return <Button variant="danger" isDisabled>Cancel</Button>; // অথবা <span>Cannot cancel</span>
}

// if (status=== "pending") {
//     return <Chip as="button"  isDisabled className='bg-orange-300'>Pending</Chip>;
//   }

//   if (status === "accepted") {
//     return <Chip  className='bg-green-400' variant="flat">Accepted</Chip>;
//   }

//   return null; // অন্য কোনো স্ট্যাটাসের জন্য কিছু দেখাবেন না
// };

//   const buttonColor = status === "pending" ? "danger" : "warning";
//   const buttonLabel = status === "pending" ? "Cancel Booking" : "Cancel Booking";
  
//   const chipColor = status === "pending" ? "danger" : "warning";
//   const chipLabel = status === "pending" ? "Cancel Booking" : "Cancel Booking";

//   const buttonColor = status === "pending" ? "danger" : "warning";
//   const buttonLabel = status === "pending" ? "Cancel Booking" : "Cancel Booking";

return (
        
        <AlertDialog>
            
             <AlertDialog.Trigger>
                <Button variant="danger">Cancel</Button> 
             </AlertDialog.Trigger>
           <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon orderStatus="danger" />
                            <AlertDialog.Heading>Confirm Cancellation</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p className="text-slate-600">
                                Are you sure you want to cancel this enrollment? This action cannot be undone and you
                                will lose access to the course materials.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button
                                slot="close"
                                variant="tertiary"
                            >
                                Keep Booking
                            </Button>
                            <Button
                            onClick = { handleCancelBooking }
                                slot="close"
                                color="danger"
                                className="font-bold"

                            >
                                Yes, Cancel
                            </Button>
                             
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default CancelledBookingButton;