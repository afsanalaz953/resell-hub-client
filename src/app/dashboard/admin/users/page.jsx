import React from 'react';
import { Table } from '@heroui/react';
import {Button} from "@heroui/react"
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import Image from "next/image";

const ManageUserPage = async() => {
      

    const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/user`,{
  cache: 'no-store',
// //    headers:{
// //      authorization: `Bearer ${tokenObj.token}`
      
//  }
});
 if (!res.ok) {
    const errorText = await res.text();
    console.error(`API error ${res.status}: ${errorText}`);
    return <div>Failed to load user</div>;
  }


const userList = await res.json()
console.log(userList, "userlist")
// const createdAt = new Date();
// console.log(createdAt)

    return (
        <div>
            <h1 className='m-10 text-3xl font-bold text-orange-700'>All Users </h1>

            {/* ✅ Empty state check – put it here */}
                {!userList || userList.length === 0 ? (
                   <div className="text-center   bg-gray-100 rounded-lg shadow">
                     <p className="text-gray-600 text-lg"> No products available yet.</p>
                     <p className="text-gray-500">Click “Add Products” to get started.</p>
                   </div>
                 ) :( <div className=' lg:w-full md:`w-[760px]` shadow-lg'> 
                   {/* <div className='shadow-lg'> */}
                         {/* <Table className=' w-min-700  bg-green-200'> */}
                         <Table     layout="fixed"  className=" bg-gray-200">
                           <Table.ScrollContainer>
                             <Table.Content aria-label="Team members" className=''>
                               <Table.Header className= "rounded ">
                                 {/* 1 */}
                                 <Table.Column className="text-lg font-bold">Photo</Table.Column>
                                 {/* 2 */}
                                 <Table.Column   isRowHeader className="text-lg font-bold">User</Table.Column>
                             
                                {/* 3 */}
                                 <Table.Column className="text-lg font-bold" >Email</Table.Column>
                                 {/* 4 */}
                                 <Table.Column className="text-lg font-bold" >Role</Table.Column>
                                 {/* 5 */}
                                 <Table.Column className="text-lg font-bold" >Status</Table.Column>
                                 {/* 6 */}
                                 <Table.Column  className="text-lg font-bold">Joined</Table.Column>
                                 {/* 7 */}
                                  {/* <Table.Column  className="text-lg font-bold">Action</Table.Column> */}
                                 
                                
                                 {/* 8 */}
                                 <Table.Column className="text-lg font-bold text-center w-0.5"> Action</Table.Column>
                               </Table.Header>
                               <Table.Body>
                              {userList && userList.map((adUser) => ( 
                                   // console.log('Tutor ID:', formTutors.tutorId)
                                   
                                     <Table.Row key={adUser?._id} >
                                       {/* 1 */}
                                     <Table.Cell>
                                       <Image
                                         src={adUser.image|| ""}
                                         alt={adUser.name}
                                         width={70}
                                         height={70}
                                         className="rounded-full object-cover"
                                         unoptimized={true} 
                                       />
                                     </Table.Cell>
                                     {/* 2 */}
                                     <Table.Cell
                                       
                                       className='hover:text-blue-800 hover:underline'>
                                       {adUser.name}
                                       
                                       </Table.Cell>
                                     {/* 3 */}
                                     <Table.Cell>{adUser.email}</Table.Cell>
                                       {/* 4 */}
                                     <Table.Cell>{adUser.role}</Table.Cell>   
                                     <Table.Cell>Active </Table.Cell>  
                                     {/* 5 */}
                                     <Table.Cell>{new Date(adUser.createdAt).toLocaleDateString()}</Table.Cell>
                                     {/* 6 */}
                                      {/* <Table.Cell>{formProduct.condition}</Table.Cell> */}
                                      {/* 7 */}
                                      {/* dynamic status */}
                                     {/* {formProduct.status !== 'Approved' && <div>Pending</div>}
                                      {formProduct.status === 'Approved' && <Table.Cell>{formProduct.status}</Table.Cell>}  */}
                                     {/* 8 */}
                                    <Table.Cell className="flex gap-2 bg-white p-2">
                                        approved
                                     {/* <UpdateModal product = {adUser} />
                                   <SellerProductDeleteButton  productId = {formProduct._id} /> */}
                                      
                                  </Table.Cell>
                                   </Table.Row>
                                   
                                  ))} 
                               </Table.Body>
                             </Table.Content>
                           </Table.ScrollContainer>
                         </Table>
           
                    
            {/**/}
            {/* <Table.Column>product Id</Table.Column>    */}
                       </div> ) 
           } 
        </div>
    );
};

export default ManageUserPage;