"use client";

import React, { useState, useRef } from 'react';
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';

const BuyFormClient = ({ singleProduct, action, method }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [orderId, setOrderId] = useState(''); // ← অর্ডার আইডি সংরক্ষণের জন্য স্টেট

  const stock = Number(singleProduct.stock) || 0;
  const price = Number(singleProduct.price )|| 0;
  const totalPrice = Number((price * quantity).toFixed(2));
 
  const defaultName = user?.name || '';
  const defaultEmail = user?.email || '';
  const { title } = singleProduct;

  // ফর্ম রেফারেন্স – পরে সাবমিট করার জন্য
  // const formRef = useRef(null);

  // const handleBuying = async (e) => {
  //   e.preventDefault(); // ডিফল্ট সাবমিট বন্ধ

  //     const form = e.target;
  //   const formData = new FormData(form);
    
    // setIsLoading(true);
  

    // অর্ডার ডেটা তৈরি
    // const orderData = {
    //   //  orderId: result.insertedId,
    //   productId: singleProduct._id,
    //   sellerId: singleProduct?.sellerId,
    //   sellerName: singleProduct?.sellerName,
    //   sellerEmail: singleProduct?.sellerEmail,
    //   buyerName: formData.get('name') || user?.name || '',
    //   buyerEmail: formData.get('email') || user?.email || '',
    //   buyerPhone: formData.get('phone') || '',
    //   quantity: quantity,
    //   price: price,
    //   title: singleProduct.title,
    //   totalPrice: totalPrice,
    //   status: 'pending',
    //   buyerId: user?.id,
    // };
//  router.push('/checkout', { state: { orderData } });
    // try {
    //   // ১. অর্ডার তৈরি করি
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(orderData),
    //   });

    //   const data = await res.json();
    //   console.log(data, "buyingData");

    //   if (!res.ok) throw new Error(data.message || "Booking failed");

      // const { orderId: newOrderId } = data; // সার্ভার থেকে পাওয়া orderId
      // setOrderId(newOrderId); // স্টেট আপডেট

      // toast.success('Booking successful!', { duration: 2000, position: 'top-center' });

      // ২. অর্ডার আইডি সেট হওয়ার পর ফর্মটি সাবমিট করি (পেমেন্টের জন্য)
      // ফর্মের hidden input-এ value সেট করতে স্টেট ব্যবহার করব, তাই এক্ষেত্রে
      // আমরা ফর্মটি আবার সাবমিট করব। তবে hidden input-এ value={orderId} দেওয়া আছে,
      // কিন্তু setState অ্যাসিঙ্ক, তাই সরাসরি সাবমিট করলে পুরনো মান যেতে পারে।
      // তাই আমরা ফর্ম ডেটা ম্যানুয়ালি আপডেট করে সাবমিট করব অথবা useEffect ব্যবহার করব।
      // সহজ পদ্ধতি: ফর্মের hidden input এর value পরিবর্তন করে DOM-এ সেট করে সাবমিট করা।
      // const orderIdInput = form.querySelector('input[name="orderId"]');
      // if (orderIdInput) {
      //   orderIdInput.value = newOrderId;
      // }
      // এখন ফর্ম সাবমিট করি
    //   form.submit(); // সরাসরি submit করলে onSubmit আবার কল হবে না, তাই ঠিক আছে
      // formRef.current?.submit();
      // formRef.current?.requestSubmit();

  //   } catch (error) {
  //     console.error("Booking error:", error);
  //     toast.error(error.message || "Network error.", { position: "top-center" });
  //     setIsLoading(false);
  //   } finally {
  //     // isLoading false হবে না কারণ ফর্ম সাবমিটের পর পেজ রিলোড/রিডাইরেক্ট হতে পারে
  //     // তাই এখানে setIsLoading(false) না করাই ভালো, কারণ সাবমিটের পর কম্পোনেন্ট আনমাউন্ট হতে পারে।
  //     // তবে যদি কোনো কারণে সাবমিট না হয়, তাহলে error-এ isLoading false করব।
  //   }

// const defaultName = user?.name || '';
//   const defaultEmail = user?.email || '';
//   const { title } = singleProduct;




  
  return (
    <div>
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        Buy Product
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Buy Product</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Fill out the form below and proceed to payment.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  {/* ফর্মে action ও method প্রপস পাস করুন, এবং onSubmit হ্যান্ডলার দিন */}
                  <form
                    
                    action={action}
                    method={method}
                    // onSubmit={handleBuying}
                    className="flex flex-col gap-4"
                  >
                    {/* অর্ডার আইডি হিডেন ফিল্ড – value স্টেট বা DOM দিয়ে সেট হবে */}
                    <input   label="Buyer Name" type="hidden" name="buyerName" value={defaultName} />
                    <input   label="Buyer Email" type="hidden" name="buyerEmail" value={defaultEmail} />
                    {/* <input type="hidden" name="orderId" value={orderId} /> */}
                    <input type="hidden" name="productId" value={singleProduct._id} />
  <input   label="price" type="hidden" name="price" value={price} />
  <input   label="totalPrice" type="hidden" name="totalPrice" value={totalPrice} />
  <input   label="quantity" type="hidden" name="quantity" value={quantity} />
  <input   label="title" type="hidden" name="title" value={singleProduct.title} />
  <input   label="sellerName" type="hidden" name="sellerName" value={singleProduct.sellerName} />
  <input   label="sellerId" type="hidden" name="sellerId" value={singleProduct.sellerId} />
  <input   label="sellerEmail" type="hidden" name="sellerEmail" value={singleProduct.sellerEmail} />
                    <TextField   label="Buyer Name"  defaultValue={defaultName} className="w-full" name="name" isRequired>
                      <Label>Buyer Name</Label>
                      <Input placeholder="Enter your name" className="rounded-2xl" />
                    </TextField>

                    <TextField   label="Buyer Email" defaultValue={defaultEmail} className="w-full" name="email" type="email" isRequired>
                      <Label>Buyer Email</Label>
                      <Input placeholder="Email" />
                    </TextField>

                    <TextField   label="Buyer Phone" className="w-full" name="phone" type="tel">
                      <Label>Buyer Phone</Label>
                      <Input placeholder="Enter your phone number" />
                    </TextField>

                    <TextField   label="Product Name" defaultValue={title} className="w-full" name="title">
                      <Label>Product Name</Label>
                      <Input placeholder="product" />
                    </TextField>

                    <div className="flex items-center gap-4">
                      <TextField  className="w-32" label="Quantity">
                        <Input
                          type="number"
                            name="quantity"
                          min={1}
                          max={stock}
                          value={quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            setQuantity(Math.min(Math.max(val, 1), stock));
                          }}
                        />
                        {/* <TextField
  className="w-32"
  label="Quantity"          // এই লেবেলটি এখন ইনপুটের সাথে যুক্ত হবে
  type="number"
  name="quantity"
  inputProps={{ min: 1, max: stock }}   // min/max এভাবে দিন
  value={quantity}
  onChange={(e) => {
    const val = parseInt(e.target.value) || 1;
    setQuantity(Math.min(Math.max(val, 1), stock));
  }}
/> */}
                      </TextField>
                    </div>

                    <p className="text-lg font-bold text-blue-600">
                      Total Amount: {totalPrice} $
                    </p>

                    <div className="flex gap-12">
                      <Button slot="close" variant="secondary">
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        slot="close"
                        // isDisabled={isLoading}
                        // isLoading={isLoading}
                      >
                        Buy Product
                        {/* {isLoading ? 'Creating Order...' : 'Buy Product'} */}
                      </Button>
                    </div>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default BuyFormClient;






// "use client";

// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
// import { ToastContainer, toast } from 'react-toastify';
// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";

// export function BuyModal({singleProduct, action, method }) {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false); // ← মডাল ওপেন/ক্লোজ কন্ট্রোল
//   const { data: session } = authClient.useSession();
//   const user = session?.user;
//   const [isLoading, setIsLoading] = useState(false);

//   const [quantity, setQuantity] = useState(1);
//   const stock = singleProduct.stock || 0;
//   const price = singleProduct.price || 0;
//   const totalPrice = (price * quantity).toFixed(2);

//    const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
   
//   });

//   const handleBuying = async (e) => {
//     e.preventDefault();
//      setIsLoading(true);
//     // if (isLoading){
//     //   e.preventDefault();
//     //   return;
// //  if (isLoading || stock === 0 || quantity > stock) return;


   
 
//     // if (allTutor.availableSlots <= 0) {
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

  
//     // 
//   const form = e.target;
//   const formDataObj = new FormData(form);
//     const buyerOrderData = {
//       buyerName: formDataObj.get('name'),
//        buyerEmail: formDataObj.get('email'),  // ← এখানেও তাই
//     buyerPhone: formDataObj.get('phone'),
//       // buyerName: formData?.name,
//       // buyerEmail: formData?.email,
//       // buyerPhone : formData?.phone,
//       productId: singleProduct._id,
//       productName: singleProduct.title,
//       productImage: singleProduct.image,
//       productStatus: singleProduct.status,
//       price : singleProduct.price,
//        quantity: quantity,
//   // totalPrice: parseFloat((price * quantity).toFixed(2)),
//         status: 'pending',
//          buyerId: user?.id,   
//       sellerId: singleProduct?.sellerId, 
//       sellerName: singleProduct?.sellerName,
//       sellerEmail: singleProduct?.sellerEmail,
//     };

// console.log(buyerOrderData , "data for buyerpaymentpage")
// try{
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
//         method: "POST",
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify(buyerOrderData),
//       });
    //   const data = await res.json();
//        const { orderId } = await orderRes.json();
//       // console.log(data, "buyingData");
//       console.log(orderId, "buyingData");
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
//   };
//  const defaultName = user?.name || '';
//   const defaultEmail = user?.email || '';
//  const { title} = singleProduct;
// //  const { price} = singleProduct;

//   return (
//     <div>
//       {/* ট্রিগার বাটন – এটাতেই ক্লিক করলে মডাল খুলবে */}
//        <Button className="w-full" onClick={() => setIsOpen(true)}>
//         Buy Product
//       </Button>
     
// {/* new modal */}
//  <Modal isOpen={isOpen} onOpenChange={setIsOpen} >
  
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
//                  {/* <form onClick={handleBuying} className="flex flex-col gap-4" > */}
//                   <form action={action} method={method} onClick={handleBuying} className="flex flex-col gap-4">
//                   {/* <form  onSubmit={handleBuying}  className="flex flex-col gap-4"> */}
//                        <input type="hidden" name="sellerId" value={singleProduct?.sellerId} />
//                        <input type="hidden" name="productId" value={singleProduct._id} />
//                        <input type="hidden" name="sellerName" value={singleProduct?.sellerName} />
//                        <input type="hidden" name="sellerEmail" value={singleProduct?.sellerEmail} />
//                        <input type="hidden" name="quantity" value={quantity} />
//                        <input type="hidden" name="totalPrice" value={totalPrice} />
//                     <input type="hidden" name="price" value={price} />
//                             {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
//                              {/* Destination Name */}
//                              {/* <div className="md:col-span-2">  */}
//                                <TextField defaultValue = {defaultName} className="w-full" name="name" isRequired>
//                                  <Label>Buyer name</Label>
//                                  <Input   placeholder="Enter your name" className="rounded-2xl" />
                                
//                                </TextField>
                           
               
//                              {/* Country */}
//                              <TextField defaultValue = {defaultEmail}  className="w-full"  name="email" type="email" isRequired>
//                                <Label>Buyer Email</Label>
//                                <Input 
                          
//                                placeholder="Email" 
//                                />
                               
//                              </TextField>
//                <TextField className="w-full" name="phone" type="tel">
//                  <Label> Buyer Phone</Label>
//                    <Input placeholder="Enter your phone number" />
//                 </TextField>
//               <TextField   defaultValue={title}  className="w-full" name="title">
//                   <Label>Product Name </Label>
//                  <Input 
//                   placeholder="product" />
//           </TextField> 
//           {/* quantity */}
// <div className="flex items-center gap-4">
//  <TextField className="w-32" label="Quantity">
//   <Input
//     type="number"
//     min={1}
//     max={stock}
//     value={quantity}
//     onChange={(e) => {
//       const val = parseInt(e.target.value) || 1;
//       setQuantity(Math.min(Math.max(val, 1), stock));
//     }}
//   />
// </TextField>
// <span className="text-sm text-gray-500">
//   Stock: {stock}
// </span>
// </div>
//                   <p className="text-lg font-bold text-blue-600">
//                     Total Amount: {totalPrice} $
//                   </p>

//           {/* <TextField   defaultValue={price}  className="w-full" name="price">
//                   <Label>Price </Label>
//                  <Input 
//                   placeholder="product" />
//           </TextField>     */}
//               <div className='flex gap-12'>
//               <Button slot="close" variant="secondary">
//                 Cancel
//              </Button>

//             {/* <Button onSubmit={onSubmit} type="submit" slot="close"> <Link href={'/my-tutors'}></Link> Book session
//                </Button>  */}
//  {/* <Link href={'/my-sessions'}>  */}
//   {/* <Button  type="submit" slot="close"
//     isDisabled={stock === 0 || quantity > stock || isLoading}
//                       isLoading={isLoading}
//                     >
//                       {isLoading ? 'Processing...' : 'Buy Product'}
  
//  </Button> */}
//  <Button  type="submit" slot="close"
//     // isDisabled={stock === 0 || quantity > stock || isLoading}
//     //                   isLoading={isLoading}
//                     >
//                      Buy old product
  
//  </Button>
//   {/* </Link>  */}
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


    