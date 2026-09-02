"use client";
import { AlertDialog, Button } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useState } from "react";

const SellerOrderRejectButton = ({ id, orderStatus }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelOrder = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`,
        { method: "PATCH",
             headers: { "content-type": "application/json" },
             body: JSON.stringify({ orderStatus: "cancelled" })
            }
      );
      
      if (!res.ok) throw new Error("Failed to cancel");
      
      // const data = await res.json();
      // console.log("Cancelled:", data);

      toast.success("Order Cancelled ✅");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if(orderStatus === "cancelled"){
       return <Button variant="danger" isDisabled>Cancelled</Button>; 
  }
 // Approve হয়ে গেলে Reject বাটন দেখাবেন না (কারণ আর Reject করা যায় না)
  if (orderStatus === "approved") {
    return null;  // অথবা <span className="text-sm">Cannot reject approved order</span>
  }
  
  return (
    <>
      <ToastContainer />
       {/* <Button className="bg-orange-600" onPress={() => setIsOpen(true)}>
          Cancel
        </Button>
      <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
         <Button variant="danger">Cancel</Button> 
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Confirm Cancellation</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>Are you sure you want to cancel this order?</p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">Keep Order</Button>
                <Button
                  onClick={handleCancelOrder}
                  slot="close"
                  isDisabled={isLoading}
                  className="font-bold bg-orange-400"
                >
                  {isLoading ? "Cancelling..." : "Cancel Order"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog> */}
        <AlertDialog>
            
             <AlertDialog.Trigger>
                <Button variant="danger"  isDisabled={orderStatus === "cancelled"} >{orderStatus === "cancelled" ? "Cancelled" : "Cancel"}   </Button> 
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
                            onClick = {handleCancelOrder}
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
    </>
  );
};

export default SellerOrderRejectButton;





// "use client";
// import { AlertDialog, Button, Chip } from "@heroui/react";
// import { ToastContainer, toast } from 'react-toastify';
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const SellerOrderRejectButton = ({id}) => {
//      const router = useRouter();
    
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
     

//     console.log(id, "sellerfrejectedorderid")
// const handleDeleteButton = async () =>{


// const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`,{
// method: "PATCH",
// headers:{
//     "content-type" : "application/json"
// }
// })

// const data = await res.json ();
// console.log( "delete response", data);

//  toast.success('Order Cancelled ', {
//                 duration: 4000,
//                 position: 'top-center',
//     }); 


// // // window.location.reload();
// router.refresh(); 
// }



//     return (


//         <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}  >
//             {/* <Button
//                 color="danger"
//                 variant="light"
//                 size="sm"
//             >
//                 Cancel
//             </Button> */}
//                <Button  className="bg-orange-600" className="bg-orange-600" onPress={() => setIsOpen(true)}>Cancel</Button>

//             <AlertDialog.Backdrop>
//                 <AlertDialog.Container>
//                     <AlertDialog.Dialog className="sm:max-w-100">
//                         <AlertDialog.CloseTrigger />
//                         <AlertDialog.Header>
//                             <AlertDialog.Icon status="danger" />
//                             <AlertDialog.Heading>Confirm Cancellation</AlertDialog.Heading>
//                         </AlertDialog.Header>
//                         <AlertDialog.Body>
//                             <p className="text-slate-600">
//                                 Are you sure you want to cancel this enrollment? This action cannot be undone and you
//                                 will lose access to the course materials.
//                             </p>
//                         </AlertDialog.Body>
//                         <AlertDialog.Footer>
//                             <Button
//                                 slot="close"
//                                 variant="tertiary"
//                             >
//                                keep Order
//                             </Button>
//                             <Button

//                             onClick= {handleDeleteButton}
//                                 slot="close"
//                                 // color="danger"
//                                   isDisabled={isLoading}
//                                 className="font-bold bg-orange-400"

//                             >
//                             Cancel Order
//                             </Button>
//                         </AlertDialog.Footer>
//                     </AlertDialog.Dialog>
//                 </AlertDialog.Container>
//             </AlertDialog.Backdrop>
//         </AlertDialog>
//     );
// };

//  export default  SellerOrderRejectButton;