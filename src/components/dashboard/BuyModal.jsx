"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function BuyModal({singleProduct, action, method }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // ← মডাল ওপেন/ক্লোজ কন্ট্রোল
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
   
  });

  const handleBuying = async (e) => {
    // e.preventDefault();
    if (isLoading){
      e.preventDefault();
      return;
    } 
 
    // if (allTutor.availableSlots <= 0) {
    //   toast.error("No available slots left.", { position: "top-center" });
    //   return;
    // }
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    // const startDate = new Date(allTutor.sessionStartDate);
    // startDate.setHours(0, 0, 0, 0);
    // if (today < startDate) {
    //   toast.error(`Booking opens on ${allTutor.sessionStartDate}.`, { position: "top-center" });
    //   return;
    // }

    setIsLoading(true);
    const buyingData = {
      
      buyerName: formData?.name,
      buyerEmail: formData?.email,
      productId: singleProduct._id,
      productName: singleProduct.title,
      productImage: singleProduct.image,
      productStatus: singleProduct.status,
      price : singleProduct.price,
        status: 'PENDING',
         buyerId: user?.id,   
      sellerId: singleProduct.userId, 
    };

  
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(buyingData),
      });
      const data = await res.json();
      console.log(data, "buyingData");
//       if (!res.ok) throw new Error(data.message || "Booking failed");

//       toast.success(' booking successful!', { duration: 2000, position: 'top-center' });
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
  };
//  const defaultName = user?.name || '';
//   const defaultEmail = user?.email || '';
 const { title} = singleProduct;
 const { price} = singleProduct;

  return (
    <div>
      {/* ট্রিগার বাটন – এটাতেই ক্লিক করলে মডাল খুলবে */}
       <Button className="w-full" onPress={() => setIsOpen(true)}>
        Buy Product
      </Button>
     
{/* new modal */}
 <Modal isOpen={isOpen} onOpenChange={setIsOpen} >
  
      {/* <Button variant="secondary"> Update</Button> */}
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
           
              </Modal.Icon>
              <Modal.Heading>Buy Product</Modal.Heading>
               <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and we get back to you. The modal adapts automatically
                 when the keyboard appears on mobile.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6"> 
              <Surface variant="default">
                 {/* <form onSubmit={handleBuying} className="flex flex-col gap-4" > */}
                  <form action={action} method={method} onSubmit={handleBuying}  className="flex flex-col gap-4">
                       <input type="hidden" name="sellerId" value={singleProduct.userId} />
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                             {/* Destination Name */}
                             {/* <div className="md:col-span-2">  */}
                               <TextField className="w-full" name="name" isRequired>
                                 <Label>Buyer name</Label>
                                 <Input   placeholder="Enter your name" className="rounded-2xl" />
                                
                               </TextField>
                           
               
                             {/* Country */}
                             <TextField  className="w-full"  name="email" type="email" isRequired>
                               <Label>Customer Email</Label>
                               <Input 
                          
                               placeholder="Email" 
                               />
                               
                             </TextField>
               <TextField className="w-full" name="phone" type="tel">
                 <Label> Buyer Phone</Label>
                   <Input placeholder="Enter your phone number" />
                </TextField>
              <TextField   defaultValue={title}  className="w-full" name="title">
                  <Label>product </Label>
                 <Input 
                  placeholder="product" />
          </TextField> 
          <TextField   defaultValue={price}  className="w-full" name="price">
                  <Label>Price </Label>
                 <Input 
                  placeholder="product" />
          </TextField>    
              <div className='flex gap-12'>
              <Button slot="close" variant="secondary">
                Cancel
             </Button>

            {/* <Button onSubmit={onSubmit} type="submit" slot="close"> <Link href={'/my-tutors'}></Link> Book session
               </Button>  */}
 {/* <Link href={'/my-sessions'}>  */}
  <Button  type="submit" slot="close">Buy</Button>
  {/* </Link>  */}
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


 
 </div>

  
  );
}


export default BuyModal;


    