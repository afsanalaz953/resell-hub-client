import React from 'react';
import { Table,Chip } from '@heroui/react';
import Image from "next/image";
import Link from "next/link";
 import AdminOrderStatusUpdate  from "@/components/dashboard/AdminOrderStatus";
 import AdminOrderRejected from "@/components/dashboard/AdminOrderRejected"
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import SellerProductSearch from '@/components/dashboard/SellerProductSearch';

const AdminOrderManagePage = async() => {
  const tokenObj = await auth.api.getToken({
       headers: await headers()
     })
      console.log(tokenObj, "adminOrderToken")
       
    const res = await fetch( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/allorders`,
        { cache: 'no-store',
headers:{
      authorization: `Bearer ${tokenObj.token}`
   }
});
const adminorders = await res.json();
        console.log('✅ Fetched adminmanageor:', adminorders);



    return (
        <div>
            <h1 className='text-3xl text-orange-600 m-4 font-bold'>All Orders</h1> 

 <div className='m-10'>
        <SellerProductSearch />
      </div>
             <div className='my-10 rounded  lg:w-full md:`w-[760px]` shadow-lg'>
                             <Table   layout="fixed"  className=" bg-gray-200">
                                            <Table.ScrollContainer>
                                              <Table.Content aria-label="Team members" className=''>
                                                <Table.Header className= "rounded ">
                                                  {/* 1 */}
                                                  <Table.Column className="text-lg font-bold">Ordered Date</Table.Column>
                                                  <Table.Column className="text-lg font-bold ">Product Name</Table.Column>
                                                 
                                                 {/* 3 */}
                                                  <Table.Column  className="text-lg font-bold">Buyer Name</Table.Column>
                                                  
                                                  {/* 4 */}
                                                   <Table.Column  className="text-lg font-bold">Seller Name</Table.Column>
                                                
                                                  {/* 5 */}
                                                  <Table.Column className="text-lg font-bold" >Price</Table.Column>
                                                   {/* 2 */}
                                                  <Table.Column   isRowHeader className="text-lg font-bold">Quantity</Table.Column>
                                                  <Table.Column   isRowHeader className="text-lg font-bold">Total Price</Table.Column>
                                              
                                                  {/* 6 */}
                                                 <Table.Column className="text-lg font-bold" >ProductStatus</Table.Column>
                                                   {/* <Table.Column className="text-lg font-bold" >Date</Table.Column> */}
                                                  {/* 7 */}
                                                 <Table.Column  className="text-lg font-bold">Status</Table.Column>
                                                  {/* 8 */}
                                                  <Table.Column className="text-lg font-bold text-center w-0.5"> Action</Table.Column>
                                                </Table.Header>
                                                <Table.Body>
                                               {adminorders && adminorders.map((adorders) => ( 
                                                    // console.log('Tutor ID:', formTutors.tutorId)
                                                    
                                                      <Table.Row key={adorders?._id} >
                                                        {/* 1 */}
                                                      {/* <Table.Cell>
                                                        <Image
                                                          src={adorders.productImage|| ""}
                                                          alt={adorders.productName}
                                                          width={70}
                                                          height={70}
                                                          className="rounded-full object-cover"
                                                          unoptimized={true} 
                                                        />
                                                      </Table.Cell> */}
                                                      {/* 2 */}
                                                      <Table.Cell>{new Date(adorders.createdAt).toLocaleDateString()}</Table.Cell>
                                                      <Table.Cell>
                                                        <Link href={`/products/${adorders.productId}`}
                                                        className='hover:text-orange-800 hover:underline text-orange-600'>
                                                        {adorders.title}
                                                        </Link>
                                                        </Table.Cell>
                                                      {/* 3 */}
                                                       
                                                       <Table.Cell>{adorders.metadata?.buyerName}</Table.Cell>
                                                       <Table.Cell>{adorders.metadata?.sellerName}</Table.Cell>
                                                     
                                                        {/* 4 */}
                                                        <Table.Cell>$ {adorders.price}</Table.Cell> 
                                                        <Table.Cell>{adorders.quantity}</Table.Cell> 
                                                        <Table.Cell>$ {adorders.totalPrice}</Table.Cell> 
                                                      <Table.Cell>{adorders.orderStatus}</Table.Cell>   
                                                      {/* 5 */}
                                                      {/* <Table.Cell className='text-orange-600 font-bold'>{adorders.createdAt}</Table.Cell> */}
                                                      {/* 6 */}
                                                       <Table.Cell>{adorders.status}</Table.Cell>
                                                       {/* 7 */}
                                   {/* 8 */}
                                                     <Table.Cell className="flex gap-2 bg-white p-2">
                                                      {/* <UpdateModal product = {formProduct} /> */}
                                                    <AdminOrderStatusUpdate adminorderid = {adorders._id} 
                                                    status={adorders.status} />
                                                    {/* {adminProducts.status} */}
                                                     <AdminOrderRejected id = {adorders._id} />
                                                   </Table.Cell>
                                                    </Table.Row>
                                                    
                                                   ))} 
                                                </Table.Body>
                                              </Table.Content>
                                            </Table.ScrollContainer>
                                          </Table>
                            
                        </div>
        </div>
    );
};

export default AdminOrderManagePage;