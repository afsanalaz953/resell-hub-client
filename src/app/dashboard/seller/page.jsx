import React from 'react';
import Image from "next/image"
import { HiUsers } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Table } from '@heroui/react';

const SellerDashboardHomepage = () => {
    return (
    <div className='container mx-auto w-full bg-[#EFF6FF]'>
        Seller
          <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-4 mt-4 px-20 py-10'> 
           {/* card1 */}
{/* <div className="card bg-slate-100 w-70 h-70 shadow-md border-0 rounded-2xl justify-start items-left" /> */}
                       
<div className="card bg-white w-40 h-40 shadow-md border-0 rounded-2xl justify-start items-left "> 
  
  <figure className="">
    <HiUsers className='w-10 h-10' />
  </figure>
 
 
  <div className="card-body items-center text-center">
    <h2 className="card-title ">Total Products </h2>
    <p className='line-clamp-3'>All tutors </p>
   </div>
 
  
</div>
          {/* card2 */}
        <div className="card text-left bg-white  w-40 h-40  shadow-md border-0 rounded-2xl">
<figure className="px-10 pt-10">
 <SlCalender className='w-10 h-10'  />
   </figure>  
   <div className="card-body items-center text-center">
     <h2 className="card-title">Total Sales</h2>
     <p>Book sessions</p>
   </div>
 </div>
           {/* card3 */}
 <div className="card bg-white w-40 h-40 shadow-md border-0 rounded-2xl items-center text-center">
  <figure className="px-10 pt-10  ">
    <FaArrowUpRightFromSquare  className='w-10 h-10'/>
   </figure>
   <div className="card-body items-center text-center">
     <h2 className="card-title">Total Revenue</h2>
    <p>Simple and </p>
   </div>
 </div>
           {/* card4 */}

 </div> 
 <Table className='lg:w-min-700 bg-yellow-200 my-10 md:`w-[760px]` '>
  <Table.ScrollContainer>
    <Table.Content aria-label="Team members" className='p-4'>
      <Table.Header>
        <Table.Column className= "font-bold text-lg">Photo</Table.Column>
        <Table.Column className= "font-bold text-lg"  isRowHeader>Tutor Name</Table.Column>
        <Table.Column className= "font-bold text-lg">Student Name</Table.Column>
        <Table.Column className= "font-bold text-lg">User Email</Table.Column>
        {/* <Table.Column>booking Id</Table.Column> */}
        <Table.Column className= "font-bold text-lg" >Status</Table.Column>
        <Table.Column className= "font-bold text-lg" >Action</Table.Column>
      </Table.Header>
      <Table.Body>
         {/* {bookings && bookings.map((bookedData) => (  */}
      
          <Table.Row >
            <Table.Cell>
              {/* <Image
                src={bookedData.tutorImage}
                alt={bookedData.tutorName}
                width={50}
                height={50}
                className="rounded-full object-cover"
              /> */}
            </Table.Cell>
            <Table.Cell>name</Table.Cell>
            <Table.Cell>user</Table.Cell>
            {/* <Table.Cell>{bookedData._id}</Table.Cell> */}
            <Table.Cell>useremail</Table.Cell>
            <Table.Cell className="" > status</Table.Cell> 
            {/* <Table.Cell className="" > {Success || Cancelled}</Table.Cell> */}
            {/* <Table.Cell> <Button bookingId = {bookedData._id} /> </Table.Cell> */}
            {/* <Table.Cell> <CancelledButton bookingId = {bookedData._id} status={bookedData.tutorStatus}  /> </Table.Cell> */}
            <Table.Cell>   </Table.Cell>
          </Table.Row>
        {/* ))} */}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>

 </div>
        
    );
};

export default SellerDashboardHomepage;