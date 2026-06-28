 "use client"


import React from 'react';
 import {TextField, Label,Input,FieldError, Select,ListBox , Button, TextArea,Card, CardBody, Spinner} from "@heroui/react"
 import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import Image from "next/image";
import {authClient} from "@/lib/auth-client"



 const SellerAddProductsPage = () => {
//     // const [description, setDescription] = useState("");
//   //  const [category, setCategory] = useState("");
//   // const [condition, setCondition] = useState("");
  
     const [imageUrl, setImageUrl] = useState(null);
   const [uploading, setUploading] = useState(false);
   const [uploadError, setUploadError] = useState(null);

   const handleImageChange = async (e) => {
   const file = e.target.files[0];
    if (!file) return;

//         // Validate file type and size
     if (!file.type.startsWith("image/")) {
     setUploadError("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5 MB limit (ImageBB allows 16 MB)
       setUploadError("Image size must be less than 5MB.");
       return;
    }

     setUploading(true);
     setUploadError(null);
     setImageUrl(null); // clear previous preview

     const formData = new FormData();
     formData.append("image", file);

     try {
//       // ⚠️ For production, use a backend proxy (see note below)
       const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // store in .env.local
       const response = await fetch(
         `https://api.imgbb.com/1/upload?key=${API_KEY}`,
         { method: "POST", body: formData }
       );
       const data = await response.json();

       if (data.success) {
         setImageUrl(data.data.url);
      } else {
        setUploadError(data.error?.message || "Image upload failed.");
      }
    } catch (error) {
       console.error("Upload error:", error);
      setUploadError("Network error. Please check your connection.");
     } finally {
       setUploading(false);
     }
   };

const onSubmit = async(e) =>{
     e.preventDefault()
     const formData = new FormData(e.currentTarget)
     // const allTutor = Object.fromEntries(formData.entries())
     const formValues = Object.fromEntries(formData.entries());

     console.log(formValues, "formvalues")

//     // ক্লায়েন্ট সাইডে সেশন থেকে ইউজার আইডি নেওয়া (headers() ছাড়া)
       const { data: session } = await authClient.getSession();
     const userId = session?.user?.id;

//      // ইউজার আইডি পেলোডে যুক্ত করা (কোনো কনফ্লিক্ট নেই)
    const product = {
      ...formValues,
       title: formValues.title,
       stock: Number(formValues.stock) || 0,
       category: formValues.category,
       price: Number(formValues.price) || 0,
       condition: formValues.condition,
       description: formValues.description,
       image: imageUrl,
       status:"available",
       userId: userId,
     };
     console.log("product with userId", product );
   

 const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/products`, {
            method: 'POST',
         headers: {
             'content-type': 'application/json'
            },
            body: JSON.stringify(product)
         })

 const productData = await res.json();
  console.log( 'data after post', productData);
   
  if (res.ok) {
 toast.success('product added, see my-product-list ', {
                 duration: 3000,
                 position: 'top-center',
     }); 
   e.target.reset(); // Reset the form after successful submission
     }
   };




    return (
         <div>
      
             <h1 className='text-2xl font-bold text-blue-800 text-center my-2'>Add Products </h1>
    <div className='formdata  border-0 shadow-lg w-3xl'>
                 <form 
                 onSubmit = {onSubmit}
             className="p-10 space-y-4 w-3xl " 
           >
              <ToastContainer />
             <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
               {/* Destination Name */}
               <div className="md:col-span-2 ">
                 <TextField name="title" isRequired>
                   <Label>Product Title</Label>
                   <Input placeholder="Enter your tutor name" className="rounded-2xl " />
                   <FieldError />
                 </TextField>
               </div>

            


        {/* stock */}
          <TextField name="stock" type="number" isRequired>
             <Label>Stock Quantity</Label>
               <Input 
               type="number"
               placeholder="100" 
               className="rounded-2xl w-full text-center" />
               <FieldError />
             </TextField>
             <br />
             <br />

  {/* Categpry - Updated Select Component */}
               <div> 
                 <Select
                 name="category"
                   isRequired
                   placeholder="Select category"
className="w-full rounded-2xl"
                   >
                   <Label className='p-3'>Category</Label>  
                    <Select.Trigger > 
                      <Select.Value />
                      <Select.Indicator /> 
                  </Select.Trigger> 
                   <Select.Popover>
                     <ListBox>
                       <ListBox.Item id="laptops" textValue="laptops">
                   Laptops
                         <ListBox.ItemIndicator />
                       </ListBox.Item>
                     
                       <ListBox.Item id="mobile phones" textValue="mobile phones">
                      Mobile Phones
                         <ListBox.ItemIndicator />
                       </ListBox.Item>
                    
                       <ListBox.Item id="vehicles" textValue="vehicles">
                      Vehicles
                         <ListBox.ItemIndicator />
                       </ListBox.Item>
                       <ListBox.Item id="home appliances" textValue="home appliances">
                        Home Appliances
                         <ListBox.ItemIndicator />
                       </ListBox.Item>
                       <ListBox.Item id="furniture" textValue="furniture">
                  Furniture
                         <ListBox.ItemIndicator />
                       </ListBox.Item>
                       <ListBox.Item id="sports" textValue="sports">
                Sports
                      <ListBox.ItemIndicator />
                       </ListBox.Item>
                      
                     </ListBox>
                   </Select.Popover>
                 </Select>
               </div>
               <br />
               <br />


 {/* Price */}
              <TextField name="price" type="number" isRequired>
                 <Label>Price(USD)</Label>
                <Input
                   type="number"
                  placeholder="1000"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
              
 <br />
 <br />

        {/* condition */}
               <div>
                  <Select
                   name="condition"
                   isRequired
                   className="rounded-2xl"
                   placeholder="Select condition"
                 >
                   <Label>Condition</Label> 
                   <Select.Trigger className="rounded-2xl flex">
                     <Select.Value />
                     <Select.Indicator /> 
                   </Select.Trigger>
                   <Select.Popover>
                     <ListBox>
                   <ListBox.Item id="used" textValue="used">
                         Used
                         <ListBox.ItemIndicator />
                       </ListBox.Item>
                       <ListBox.Item id="like new" textValue="like new">
                         Like New
                         <ListBox.ItemIndicator />
                       </ListBox.Item>
                       <ListBox.Item id="refurbished" textValue="refurbished">
                         Refurbished
                         <ListBox.ItemIndicator />
                       </ListBox.Item> 
                     </ListBox>
                   </Select.Popover>
                 </Select>
               </div> 
              <br />
              <br />    

               {/* teaching mode */}
          <div>
                   <TextField name="description" isRequired>
                   <Label>Product Description</Label>
                    <TextArea
       placeholder="Enter your product description"
       className="rounded-2xl"
       rows={4}                 // optional: set the visible number of lines
     />
                 
                   <FieldError />
                 </TextField>
                 <br />
                 <br />
                 <br />
          </div>

                       {/* Image URL - Removed preview */}
               <div className="md:col-span-2">
                 {/* <TextField name="image" isRequired>
                   <Label>Upload Product Photo</Label>
                   <Input
                     type="url"
                     placeholder="Enter product photo url"
                     className="rounded-2xl"
                   />
                   <FieldError />
                 </TextField> */}
 <div className="space-y-2">

                   <Label>Upload Product Photo</Label> 
                <Input
                  type="file"
                  accept="image/*"
                 label="Upload Product Photo"
                   onChange={handleImageChange}
                isDisabled={uploading}
                   className={{
                    label: "text-sm font-medium",
                }}
                  isRequired
                />

                 {uploading && (
                 <div className="flex items-center gap-2 text-sm text-default-500">
                    <Spinner size="sm" />
                  Uploading to ImageBB...
                 </div>
                )}

                {uploadError && (
                <p className="text-sm text-danger">{uploadError}</p>
               )}
                <FieldError />
               
             </div>

   {/* Image Preview */}
            {/* {imageUrl && !uploading && (
                <Card className="border-none shadow-sm mt-3">
                <div className="flex flex-col items-start gap-2">
                    <p className="text-sm font-semibold">Uploaded Preview:</p>
                    <Image
                      src={imageUrl}
                      alt="Product preview"
                      width={50}
                      height={20}
                       className="object-cover rounded-lg border"
                     />
                   <p className="text-xs text-default-400 break-all">{imageUrl}</p>
                   </div>
                 </Card>
             )} */}

             </div> 
         <br />
         <br />

 <div>

 </div>
  </div> 

  {/* Buttons */}

            <Button
               type="submit"
               variant="outline"
             
              className=" rounded-2xl w-full bg-cyan-500 text-white font-bold"
            >
          Add Product
                </Button> 
             
          </form>
             </div>
        </div>
    );
};

 export default SellerAddProductsPage;

