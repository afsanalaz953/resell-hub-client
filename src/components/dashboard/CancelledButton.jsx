"use client";

import { ToastContainer, toast } from 'react-toastify';
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const CancelledBookingButton = ({bookingId, status}) => {
   const router = useRouter(); 

   
const handleCancelBooking = async () =>{ 
//     const {data:tokenData} = await authClient.token()
//   console.log(tokenData, "tokendata")

try{    
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,{
method: "PATCH",
headers:{
    "content-type" : "application/json"},
//  authorization: `Bearer ${tokenData?.token}`
});

const data = await res.json();
console.log(data);
// window.location.reload();
if (res.ok)  {
 toast.success('Booking cancelled');
                // duration: 2000,
                // position: 'top-center'})

       router.refresh();           

}else{
   toast.error(data.message || 'problem in cancel');  
     }
    } catch (error) {
      toast.error('try later');
    }
}

if(status === "cancelled"){
     return <Button variant="danger" isDisabled>Cancelled</Button>; 
}

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
                            <AlertDialog.Icon status="danger" />
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