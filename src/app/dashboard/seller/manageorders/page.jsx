import React from 'react';
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import Image from "next/image";
import { Table } from '@heroui/react';
 import CancelledButton from "@/components/shared/CancelledButton";


const ManageOrderPage = () => {
    return (
        <div>
           ManageOrderPage 
           <h1 className='font-bold text-3xl m-10'> My Bookings List</h1>
        {/* ✅ Empty state check – put it here */}
      {!bookings || bookings.length === 0 ? (
        <div className="text-center m-6 p-10 bg-gray-100 rounded-lg shadow">
          <p className="text-gray-600 text-lg"> No bookings available yet.</p>
          <p className="text-gray-500">Click “Book Tutors” to get started.</p>
        </div>
      ) : 

       ( <div className='shadow-lg'>

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
         {bookings && bookings.map((bookedData) => ( 
      
          <Table.Row key={bookedData?._id}>
            <Table.Cell>
              <Image
                src={bookedData.tutorImage}
                alt={bookedData.tutorName}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </Table.Cell>
            <Table.Cell>{bookedData.tutorName}</Table.Cell>
            <Table.Cell>{bookedData.userName}</Table.Cell>
            {/* <Table.Cell>{bookedData._id}</Table.Cell> */}
            <Table.Cell>{bookedData.userEmail}</Table.Cell>
            <Table.Cell className="" > {bookedData.tutorStatus}</Table.Cell> 
            {/* <Table.Cell className="" > {Success || Cancelled}</Table.Cell> */}
            {/* <Table.Cell> <Button bookingId = {bookedData._id} /> </Table.Cell> */}
            <Table.Cell> <CancelledButton bookingId = {bookedData._id} status={bookedData.tutorStatus}  /> </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>
 
 </div>)
} 
        </div>
    );
};

export default ManageOrderPage;