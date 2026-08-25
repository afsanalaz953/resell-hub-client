






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

  const [quantity, setQuantity] = useState(1);
  const stock = singleProduct.stock || 0;
  const price = singleProduct.price || 0;
  const totalPrice = (price * quantity).toFixed(2);

   const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
   
  });

  const handleBuying = async (e) => {
    e.preventDefault();
     setIsLoading(true);
    // if (isLoading){
    //   e.preventDefault();
    //   return;
//  if (isLoading || stock === 0 || quantity > stock) return;


   
 
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

  
    // 
  const form = e.target;
  const formDataObj = new FormData(form);
    const buyingData = {
      buyerName: formDataObj.get('name'),
       buyerEmail: formDataObj.get('email'),  // ← এখানেও তাই
    buyerPhone: formDataObj.get('phone'),
      // buyerName: formData?.name,
      // buyerEmail: formData?.email,
      // buyerPhone : formData?.phone,
      productId: singleProduct._id,
      productName: singleProduct.title,
      productImage: singleProduct.image,
      productStatus: singleProduct.status,
      price : singleProduct.price,
       quantity: quantity,
  totalPrice: parseFloat((price * quantity).toFixed(2)),
        status: 'pending',
         buyerId: user?.id,   
      sellerId: singleProduct?.sellerId, 
      sellerName: singleProduct?.sellerName,
      sellerEmail: singleProduct?.sellerEmail,
    };

console.log(buyingData , "data for buyerpaymentpage")
// try{
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments`, {
//         method: "POST",
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify(buyingData),
//       });
//       const data = await res.json();
//       console.log(data, "buyingData");
//       if (!res.ok) throw new Error(data.message || "Booking failed");

//       toast.success(' booking successful!', { duration: 2000, position: 'top-center' });
//       setIsOpen(false); // মডাল বন্ধ করুন
//       setTimeout(() => {
//         // router.push('/my-sessions');
//         router.refresh();
//       }, 1500);
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error(error.message || "Network error.", { position: "top-center" });
//     } finally {
//       setIsLoading(false);
//     }
  };
 const defaultName = user?.name || '';
  const defaultEmail = user?.email || '';
 const { title} = singleProduct;
//  const { price} = singleProduct;

  return (
    <div>
      {/* ট্রিগার বাটন – এটাতেই ক্লিক করলে মডাল খুলবে */}
       <Button className="w-full" onClick={() => setIsOpen(true)}>
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
                 {/* <form onClick={handleBuying} className="flex flex-col gap-4" > */}
                  <form action={action} method={method} onClick={handleBuying} className="flex flex-col gap-4">
                  {/* <form  onSubmit={handleBuying}  className="flex flex-col gap-4"> */}
                       <input type="hidden" name="sellerId" value={singleProduct?.sellerId} />
                       <input type="hidden" name="productId" value={singleProduct._id} />
                       <input type="hidden" name="sellerName" value={singleProduct?.sellerName} />
                       <input type="hidden" name="sellerEmail" value={singleProduct?.sellerEmail} />
                       <input type="hidden" name="quantity" value={quantity} />
                       <input type="hidden" name="totalPrice" value={totalPrice} />
                    <input type="hidden" name="price" value={price} />
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                             {/* Destination Name */}
                             {/* <div className="md:col-span-2">  */}
                               <TextField defaultValue = {defaultName} className="w-full" name="name" isRequired>
                                 <Label>Buyer name</Label>
                                 <Input   placeholder="Enter your name" className="rounded-2xl" />
                                
                               </TextField>
                           
               
                             {/* Country */}
                             <TextField defaultValue = {defaultEmail}  className="w-full"  name="email" type="email" isRequired>
                               <Label>Buyer Email</Label>
                               <Input 
                          
                               placeholder="Email" 
                               />
                               
                             </TextField>
               <TextField className="w-full" name="phone" type="tel">
                 <Label> Buyer Phone</Label>
                   <Input placeholder="Enter your phone number" />
                </TextField>
              <TextField   defaultValue={title}  className="w-full" name="title">
                  <Label>Product Name </Label>
                 <Input 
                  placeholder="product" />
          </TextField> 
          {/* quantity */}
<div className="flex items-center gap-4">
 <TextField className="w-32" label="Quantity">
  <Input
    type="number"
    min={1}
    max={stock}
    value={quantity}
    onChange={(e) => {
      const val = parseInt(e.target.value) || 1;
      setQuantity(Math.min(Math.max(val, 1), stock));
    }}
  />
</TextField>
<span className="text-sm text-gray-500">
  Stock: {stock}
</span>
</div>
                  <p className="text-lg font-bold text-blue-600">
                    Total Amount: {totalPrice} $
                  </p>

          {/* <TextField   defaultValue={price}  className="w-full" name="price">
                  <Label>Price </Label>
                 <Input 
                  placeholder="product" />
          </TextField>     */}
              <div className='flex gap-12'>
              <Button slot="close" variant="secondary">
                Cancel
             </Button>

            {/* <Button onSubmit={onSubmit} type="submit" slot="close"> <Link href={'/my-tutors'}></Link> Book session
               </Button>  */}
 {/* <Link href={'/my-sessions'}>  */}
  {/* <Button  type="submit" slot="close"
    isDisabled={stock === 0 || quantity > stock || isLoading}
                      isLoading={isLoading}
                    >
                      {isLoading ? 'Processing...' : 'Buy Product'}
  
 </Button> */}
 <Button  type="submit" slot="close"
    // isDisabled={stock === 0 || quantity > stock || isLoading}
    //                   isLoading={isLoading}
                    >
                     Buy old product
  
 </Button>
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


    