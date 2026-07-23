import React from 'react';
import { Table,Chip } from '@heroui/react';
import Image from "next/image";
//  import UpdateModal from "@/components/shared/UpdateModal";
 import Link from "next/link";
 import AdminStatusUpdate  from "@/components/dashboard/AdminStatusUpdate";
 import AdminRejected from "@/components/dashboard/RejectedProduct"


const ProductManagePage = async() => {

// const AllProducts = async() => {
const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/products/all`,
 { cache: 'no-store' }
)
const adminProductsData = await res.json();

console.log(adminProductsData, "adminproducts");



    return (
        <div>
            <h1 className='text-orange-600 text-3xl font-bold'> Managed Products </h1> 
            <div className='my-10 rounded  lg:w-full md:`w-[760px]` shadow-lg'>
                 <Table  layout="fixed"  className=" bg-gray-200">
                                <Table.ScrollContainer>
                                  <Table.Content aria-label="Team members" className=''>
                                    <Table.Header className= "rounded ">
                                      {/* 1 */}
                                      <Table.Column className="text-lg font-bold">Photo</Table.Column>
                                      {/* 2 */}
                                      <Table.Column   isRowHeader className="text-lg font-bold">Product Name</Table.Column>
                                  
                                     {/* 3 */}
                                      <Table.Column className="text-lg font-bold" >Category</Table.Column>
                                      {/* 4 */}
                                      <Table.Column className="text-lg font-bold" >Stock</Table.Column>
                                      {/* 5 */}
                                      <Table.Column className="text-lg font-bold" >Price</Table.Column>
                                      {/* 6 */}
                                      <Table.Column  className="text-lg font-bold">Seller Name</Table.Column>
                                      <Table.Column  className="text-lg font-bold">Seller Email</Table.Column>
                                      {/* 7 */}
                                       {/* <Table.Column  className="text-lg font-bold">Status</Table.Column> */}
                                      
                                     
                                      {/* 8 */}
                                      <Table.Column className="text-lg font-bold text-center w-0.5"> Action</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                   {adminProductsData && adminProductsData.map((adminProducts) => ( 
                                        // console.log('Tutor ID:', formTutors.tutorId)
                                        
                                          <Table.Row key={adminProducts?._id} >
                                            {/* 1 */}
                                          <Table.Cell>
                                            <Image
                                              src={adminProducts.image|| ""}
                                              alt={adminProducts.title}
                                              width={70}
                                              height={70}
                                              className="rounded-full object-cover"
                                              unoptimized={true} 
                                            />
                                          </Table.Cell>
                                          {/* 2 */}
                                          <Table.Cell>
                                            <Link href={`/products/${adminProducts._id}`}
                                            className='hover:text-blue-800 hover:underline'>
                                            {adminProducts.title}
                                            </Link>
                                            </Table.Cell>
                                          {/* 3 */}
                                          <Table.Cell>{adminProducts.category}</Table.Cell>
                                            {/* 4 */}
                                          <Table.Cell>{adminProducts.stock}</Table.Cell>   
                                          {/* 5 */}
                                          <Table.Cell className='text-orange-600 font-bold'>$ {adminProducts.price}</Table.Cell>
                                          {/* 6 */}
                                           <Table.Cell>{adminProducts.sellerName}</Table.Cell>
                                           <Table.Cell>{adminProducts.sellerEmail}</Table.Cell>
                                           {/* 7 */}
                       {/* 8 */}
                                         <Table.Cell className="flex gap-2 bg-white p-2">
                                          {/* <UpdateModal product = {formProduct} /> */}
                                        <AdminStatusUpdate adminproductid = {adminProducts._id} 
                                        status={adminProducts.status} />
                                        {/* {adminProducts.status} */}
                                         <AdminRejected rejectedproductid = {adminProducts._id} />
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

export default ProductManagePage;