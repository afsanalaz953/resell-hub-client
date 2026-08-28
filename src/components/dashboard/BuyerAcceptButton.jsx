"use client";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { AlertDialog, Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";

const BuyerAcceptButton = ({bookingId, status}) => {
   const router = useRouter(); 
 const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
   
const handleAcceptBooking = async () =>{ 
//     const {data:tokenData} = await authClient.token()
//   console.log(tokenData, "tokendata")
setIsLoading(true);

try{    
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,{
method: "PATCH",
headers:{
    "content-type" : "application/json"},
//  authorization: `Bearer ${tokenData?.token}`
 body: JSON.stringify({ status: "accepted" })
});

const data = await res.json();
console.log(data);
// window.location.reload();
if (res.ok)  {
 toast.success('Booking Accepted');
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



  if (status === "accepted") {
    return <Chip isDisabled className='bg-green-400' variant="flat">Accepted</Chip>;
  }

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
                <Button variant="primary">Accept</Button> 
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
                            onClick = { handleAcceptBooking }
                                slot="close"
                                color="danger"
                                className="font-bold"

                            >
                                Yes, Accept
                            </Button>
                             
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default BuyerAcceptButton;