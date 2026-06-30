"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {Modal, Button,Surface,TextField,Label,conatiner,Input, ModalHeader, ModalBody} from "@heroui/react";
import { toast } from 'react-toastify';
import { authClient } from "@/lib/auth-client";
import Link from "next/link"

export default function BuyModal({ singleProduct }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // singleProduct থেকে প্রয়োজনীয় ফিল্ড বের করুন
  const { _id, title, image, price, status } = singleProduct || {};

  const handleBooking = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const bookingData = {
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      productId: _id,
      title: title,
      image: image,
      price: price,
      status: status,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Purchase failed");

      toast.success("Purchase successful!", { position: "top-center" });
      setIsOpen(false);
      setTimeout(() => {
        router.push("/my-sessions");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Buy error:", error);
      toast.error(error.message || "Something went wrong.", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };
   const defaultName = user?.name || '';
const defaultEmail = user?.email || '';
//   const { tutorName } = singleProduct;

  return (
    <>
      {/* ট্রিগার বাটন */}
    {/* মডাল */}
      <Modal>
   <Button className="w-full" onPress={() => setIsOpen(true)}>
        Buy Product
      </Button>
      {/* <Button variant="secondary"> Update</Button> */}
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
           
              </Modal.Icon>
              <Modal.Heading>Purchase Product</Modal.Heading>
               <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and we get back to you. The modal adapts automatically
                 when the keyboard appears on mobile.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                 <form onSubmit={handleBooking}
                           className="flex flex-col gap-4"                        
                         >
                       
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                             {/* Destination Name */}
                             {/* <div className="md:col-span-2">  */}
                               <TextField defaultValue = {defaultName} className="w-full" name="name" isRequired>
                                 <Label>Buyer Name</Label>
                                 <Input   placeholder="Enter your name" className="rounded-2xl" />
                                
                               </TextField>
                           
               
                             {/* Country */}
                             <TextField defaultValue = {defaultEmail} className="w-full"  name="email" type="email" isRequired>
                               <Label>Buyer Email</Label>
                               <Input 
                          
                               placeholder="Email" 
                               />
                               
                             </TextField>
               <TextField className="w-full" name="phone" type="tel">
                 <Label>Phone</Label>
                   <Input placeholder="Enter your phone number" />
                </TextField>
                <TextField   defaultValue={title}  className="w-full" name="name">
                  <Label>product </Label>
                 <Input 
                  placeholder="Tutor" />
          </TextField>     
              <div className='flex gap-12'>
              <Button variant="secondary">
                Cancel
             </Button>

            {/* <Button onSubmit={onSubmit} type="submit" slot="close"> <Link href={'/my-tutors'}></Link> Book session
               </Button>  */}
 <Link href={'/my-sessions'}> 
  <Button  type="submit" >Buy</Button>
  </Link> 
                  </div>                   
                </form>
              </Surface>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Send Message</Button>
            </Modal.Footer> */}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal> 
    </>
  );
}





// "use client";

// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
// import { ToastContainer, toast } from 'react-toastify';
// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";

// export function BuyModal({ singleProduct}) {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false); // ← মডাল ওপেন/ক্লোজ কন্ট্রোল
//   const { data: session } = authClient.useSession();
//   const user = session?.user;
//   const [isLoading, setIsLoading] = useState(false);

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     if (isLoading) return;

//     // if (singleProduct.availableSlots <= 0) {
//     //   toast.error("No available slots left.", { position: "top-center" });
//     //   return;
//     // }
//     // const today = new Date();
//     // today.setHours(0, 0, 0, 0);
//     // const startDate = new Date(allTutor.sessionStartDate);
//     // startDate.setHours(0, 0, 0, 0);
//     // if (today < startDate) {
//     //   toast.error(`Booking opens on ${allTutor.sessionStartDate}.`, { position: "top-center" });
//     //   return;
//     // }

//     setIsLoading(true);
//     const bookingData = {
//       userId: user?.id,
//       userName: user?.name,
//       userEmail: user?.email,
//       productId: singleProduct._id,
//       title: singleProduct.title,
//       image: singleProduct.image,
//       status: singleProduct.status,
//     };

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
//         method: "POST",
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify(bookingData),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Booking failed");

//       toast.success('Session booking successful!', { duration: 2000, position: 'top-center' });
//       setIsOpen(false); // মডাল বন্ধ করুন
//       setTimeout(() => {
//         router.push('/my-sessions');
//         router.refresh();
//       }, 1500);
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error(error.message || "Network error.", { position: "top-center" });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//  const defaultName = user?.name || '';
//   const defaultEmail = user?.email || '';
//   const { tutorName } = singleProduct;

//   return (
//     <div>
//       {/* ট্রিগার বাটন – এটাতেই ক্লিক করলে মডাল খুলবে */}
     
// {/* new modal */}
//  <Modal>
//    <Button className="w-full" onPress={() => setIsOpen(true)}>
//         Booked session
//       </Button>
//       {/* <Button variant="secondary"> Update</Button> */}
//       <Modal.Backdrop>
//         <Modal.Container placement="auto">
//           <Modal.Dialog className="sm:max-w-md">
//             <Modal.CloseTrigger />
//             <Modal.Header>
//               <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
           
//               </Modal.Icon>
//               <Modal.Heading>Buy Product</Modal.Heading>
//                <p className="mt-1.5 text-sm leading-5 text-muted">
//                 Fill out the form below and we get back to you. The modal adapts automatically
//                  when the keyboard appears on mobile.
//               </p>
//             </Modal.Header>
//             <Modal.Body className="p-6">
//               <Surface variant="default">
//                  <form onSubmit={handleBooking}
//                            className="flex flex-col gap-4"                        
//                          >
                       
//                             {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
//                              {/* Destination Name */}
//                              {/* <div className="md:col-span-2">  */}
//                                <TextField defaultValue = {defaultName} className="w-full" name="name" isRequired>
//                                  <Label>Student Name</Label>
//                                  <Input   placeholder="Enter your name" className="rounded-2xl" />
                                
//                                </TextField>
                           
               
//                              {/* Country */}
//                              <TextField defaultValue = {defaultEmail} className="w-full"  name="email" type="email" isRequired>
//                                <Label>Buyer Email</Label>
//                                <Input 
                          
//                                placeholder="Email" 
//                                />
                               
//                              </TextField>
//                <TextField className="w-full" name="phone" type="tel">
//                  <Label>Phone</Label>
//                    <Input placeholder="Enter your phone number" />
//                 </TextField>
//                 <TextField   defaultValue={title}  className="w-full" name="name">
//                   <Label>Product </Label>
//                  <Input 
//                   placeholder="Tutor" />
//           </TextField>     
//               <div className='flex gap-12'>
//               <Button slot="close" variant="secondary">
//                 Cancel
//              </Button>

//             {/* <Button onSubmit={onSubmit} type="submit" slot="close"> <Link href={'/my-tutors'}></Link> Book session
//                </Button>  */}
//  <Link href={'/my-sessions'}> 
//   <Button  type="submit" slot="close">Buy </Button>
//   </Link> 
//                   </div>                   
//                 </form>
//               </Surface>
//             </Modal.Body>
//             {/* <Modal.Footer>
//               <Button slot="close" variant="secondary">
//                 Cancel
//               </Button>
//               <Button slot="close">Send Message</Button>
//             </Modal.Footer> */}
//           </Modal.Dialog>
//         </Modal.Container>
//       </Modal.Backdrop>
//     </Modal> 


 
//  </div>

  
//   );
// }


// export default BuyModal;