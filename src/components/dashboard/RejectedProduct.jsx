"use client";
import { AlertDialog, Button, Chip } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const AdminRejected = ({rejectedproductid}) => {
     const router = useRouter(); 
    console.log(rejectedproductid)
const handleDeleteButton = async () =>{

 toast.success('adding product deleted ', {
                duration: 4000,
                position: 'top-center',
    }); 

const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/${rejectedproductid}`,{
method: "DELETE",
headers:{
    "content-type" : "application/json"
}
})

const data = await res.json ();
console.log( "delete response", data);
// window.location.reload();
router.refresh(); 
}



    return (
        <AlertDialog>
            {/* <Button
                color="danger"
                variant="light"
                size="sm"
            >
                Cancel
            </Button> */}
               <Button className="bg-orange-600" type= "submit">Reject</Button>

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
                               keep Tutor
                            </Button>
                            <Button

                            onClick= {handleDeleteButton}
                                // slot="close"
                                // color="danger"
                                className="font-bold bg-orange-400"

                            >
                            Reject Product
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default  AdminRejected;