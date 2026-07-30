"use client";
import { AlertDialog, Button, Chip } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";


const WishlistDeleteButton = ({id}) => {
     const router = useRouter(); 
    console.log(id, "sellerfrejectedorderid")
const handleDeleteButton = async () =>{


const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist/${id}`,{
method: "DELETE",
headers:{
    "content-type" : "application/json"
}
})

const data = await res.json ();
console.log( "delete response", data);

 toast.success('Wishlist deleted ', {
                duration: 4000,
                position: 'top-center',
    }); 


// window.location.reload();
router.refresh(); 
}



    return (
       
<Button onClick= {handleDeleteButton} className="bg-orange-500"
 type= "submit"> <RiDeleteBin6Line />  </Button>

                         
    );
};

export default  WishlistDeleteButton;