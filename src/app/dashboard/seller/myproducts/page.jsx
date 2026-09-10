
import React from 'react';
import { Table } from '@heroui/react';
import SellerProductDeleteButton from "@/components/shared/SellerDeleteButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import UpdateModal from "@/components/shared/UpdateModal";
import Link from "next/link";
import SellerProductSearch from "@/components/dashboard/SellerProductSearch";

// ✅ ফিক্স ১: ডাইনামিক রেন্ডার ফোর্স (যাতে searchParams কাজ করে)
export const dynamic = 'force-dynamic';

const SellerMyproductPage = async ({ searchParams }) => {
  const sParams = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  const sellerId = session?.user?.id;
  const search = sParams?.search || '';

  // const tokenObj = await auth.api.getToken({
  //      headers: await headers()
  //    })
  //     console.log(tokenObj, "sellerproductToken")

  // ✅ ফিক্স ২: সঠিক API এন্ডপয়েন্ট ব্যবহার (আপনার পুরানো /productlist)
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/productlist`);
  url.searchParams.set('sellerId', sellerId);
  if (search) url.searchParams.set('search', search);

  let productList = [];
  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      next: { revalidate: 0 }, // ক্যাশ বন্ধ
  //     headers:{
  //     authorization: `Bearer ${tokenObj.token}`
  //  }
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    productList = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Fetch error:', error);
    productList = [];
  }

  return (
    <div>
      <h1 className='font-bold m-6 text-left lg:text-3xl'>My Products List</h1>
      <div className='m-10'>
        <SellerProductSearch />
      </div>

      {productList.length === 0 ? (
        <div className="text-center bg-gray-100 rounded-lg shadow p-8">
          <p className="text-gray-600 text-lg">No products available yet.</p>
          <p className="text-gray-500">Click “Add Products” to get started.</p>
        </div>
      ) : (
        <div className='lg:w-full md:w-[760px] shadow-lg'>
          <Table layout="fixed" className="bg-gray-200">
            <Table.ScrollContainer>
              <Table.Content aria-label="Team members">
                <Table.Header className="rounded">
                  <Table.Column className="text-lg font-bold">Photo</Table.Column>
                  <Table.Column isRowHeader className="text-lg font-bold">Product Name</Table.Column>
                  <Table.Column className="text-lg font-bold">Category</Table.Column>
                  <Table.Column className="text-lg font-bold">Stock</Table.Column>
                  <Table.Column className="text-lg font-bold">Price</Table.Column>
                  <Table.Column className="text-lg font-bold">Condition</Table.Column>
                  <Table.Column className="text-lg font-bold">Status</Table.Column>
                  <Table.Column className="text-lg font-bold text-center">Action</Table.Column>
                </Table.Header>
                <Table.Body>
                  {productList.map((product) => (
                    <Table.Row key={product._id}>
                      <Table.Cell>
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={50}
                          height={50}
                          unoptimized={true}
                          className="rounded-full object-cover"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Link href={`/products/${product._id}`} className='hover:text-blue-800 hover:underline'>
                          {product.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{product.category}</Table.Cell>
                      <Table.Cell>{product.stock}</Table.Cell>
                      <Table.Cell>$ {product.price}</Table.Cell>
                      <Table.Cell>{product.condition}</Table.Cell>
                      <Table.Cell className={product.status === 'Approved' ? 'text-green-700 font-bold' : 'text-orange-700 font-bold'}>
                        {product.status === 'Approved' ? product.status : 'Pending'}
                      </Table.Cell>
                      <Table.Cell className="relative z-10">
                        <div className="flex gap-2 bg-white p-2 rounded">
                          <UpdateModal product={product} />
                          <SellerProductDeleteButton productId={product._id} />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SellerMyproductPage;



// code new
// import React from 'react';
// import { Table } from '@heroui/react';
// import {Button} from "@heroui/react"
//  import SellerProductDeleteButton from "@/components/shared/SellerDeleteButton";
// import { auth } from "@/lib/auth"; // path to your Better Auth server instance
// import { headers } from "next/headers";
// import Image from "next/image";
//  import UpdateModal from "@/components/shared/UpdateModal";
//  import Link from "next/link"
// import { color } from 'framer-motion';
// import {SellerProductSearch} from "@/components/dashboard/SellerProductSearch"

// const SellerMyproductPage = async({searchParams}) => {
//   const session = await auth.api.getSession({
//     headers: await headers() // you need to pass the headers object.
//  });
//  const user = session?.user;
// // const userId = user.id;
//  const sellerId = session?.user?.id;
// // const sellerEmail = user?.email;

//  console.log(session, sellerId, "formproducts")
//     // const formProduct = { title, stock, category, price,condition, description, image, userId }
// // const res = await fetch('/api/seller/products', {
// //   method: 'GET',
// // });

//   let productList = [];
//   // const {data} = productList
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/productlist?sellerId=${sellerId}`, {
//       cache: 'no-store',
//     });
//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error(`API error ${res.status}: ${errorText}`);
//       // productList already empty
//     } else {
//       productList = await res.json();
//       // যদি রেসপন্স null হয়, তাহলে অ্যারে সেট করুন
//       if (!productList) productList = [];
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//     // productList খালি থাকবে
//   }








// // const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/products/${userId}`,{
// //   cache: 'no-store',
// // // //    headers:{
// // // //      authorization: `Bearer ${tokenObj.token}`
      
// // //  }
// // });
// //  if (!res.ok) {
// //     const errorText = await res.text();
// //     console.error(`API error ${res.status}: ${errorText}`);
// //     return <div>Failed to load products</div>;
// //   }


// // const productList = await res.json()
// // console.log(productList, "sellermyproductslist")




//     return (
//         <div>
          
//                      <h1 className='font-bold m-6 text-left lg:text-3xl'>My Products List</h1>
// <div className='m-10'> <SellerProductSearch />  </div>

//    {/* ✅ Empty state check – put it here */}
//      {!productList || productList.length === 0 ? (
//         <div className="text-center   bg-gray-100 rounded-lg shadow">
//           <p className="text-gray-600 text-lg"> No products available yet.</p>
//           <p className="text-gray-500">Click “Add Products” to get started.</p>
//         </div>
//       ) :( <div className=' lg:w-full md:`w-[760px]` shadow-lg'> 
        
//               {/* <Table className=' w-min-700  bg-green-200'> */}
//               <Table    layout="fixed"  className=" bg-gray-200">
//                 <Table.ScrollContainer>
//                   <Table.Content aria-label="Team members" className=''>
//                     <Table.Header className= "rounded ">
//                       {/* 1 */}
//                       <Table.Column className="text-lg font-bold">Photo</Table.Column>
//                       {/* 2 */}
//                       <Table.Column   isRowHeader className="text-lg font-bold">Product Name</Table.Column>
                  
//                      {/* 3 */}
//                       <Table.Column className="text-lg font-bold" >Category</Table.Column>
//                       {/* 4 */}
//                       <Table.Column className="text-lg font-bold" >Stock</Table.Column>
//                       {/* 5 */}
//                       <Table.Column className="text-lg font-bold" >Price</Table.Column>
//                       {/* 6 */}
//                       <Table.Column  className="text-lg font-bold">Condition</Table.Column>
//                       {/* 7 */}
//                        <Table.Column  className="text-lg font-bold">Status</Table.Column>
                      
                     
//                       {/* 8 */}
//                       <Table.Column className="text-lg font-bold text-center w-0.5"> Action</Table.Column>
//                     </Table.Header>
//                     <Table.Body>
//                    {productList && productList.map((formProduct) => ( 
//                         // console.log('Tutor ID:', formTutors.tutorId)
                        
//                           <Table.Row key={formProduct?._id} >
//                             {/* 1 */}
//                             <Table.Cell >
// <Image
//  src={formProduct.image}
//                 alt={formProduct.title}
//                 width={50}
//                 height={50}
//                 className="rounded-full object-cover"
// />
//                             </Table.Cell>
                       
               
//                           {/* 2 */}
//                           <Table.Cell>
//                             <Link href={`/products/${formProduct._id}`}
//                             className='hover:text-blue-800 hover:underline'>
//                             {formProduct.title}
//                             </Link>
//                             </Table.Cell>
//                           {/* 3 */}
//                           <Table.Cell>{formProduct.category}</Table.Cell>
//                             {/* 4 */}
//                           <Table.Cell>{formProduct.stock}</Table.Cell>   
//                           {/* 5 */}
//                           <Table.Cell>$ {formProduct.price}</Table.Cell>
//                           {/* 6 */}
//                            <Table.Cell>{formProduct.condition}</Table.Cell>
//                            {/* 7 */}
//                            {/* dynamic status */}
                           
//                           {formProduct.status !== 'Approved' && <Table.Cell className= "text-orange-700 font-bold">Pending</Table.Cell>}
//                            {formProduct.status === 'Approved' && <Table.Cell className="text-green-700 font-bold">{formProduct.status}</Table.Cell>} 
                            
//                           {/* 8 */}
//                          <Table.Cell className="flex gap-2 bg-white p-2">
//                           <UpdateModal product = {formProduct} />
//                         <SellerProductDeleteButton  productId = {formProduct._id} />
                           
//                        </Table.Cell>
//                         </Table.Row>
                        
//                        ))} 
//                     </Table.Body>
//                   </Table.Content>
//                 </Table.ScrollContainer>
//               </Table>

         
//  {/**/}
//  {/* <Table.Column>product Id</Table.Column>    */}
//             </div> ) 
// }
//         </div>
//     );
// };

// export default SellerMyproductPage;