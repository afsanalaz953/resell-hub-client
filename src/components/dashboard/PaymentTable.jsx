import Link from "next/link";
import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from "@heroui/react";
import { div } from "framer-motion/client";


const PaymentTable = ({payments}) => {
  

  return (
    <div>
{/* ✅ Empty state check – put it here */}
      {!payments || payments.length === 0 ? (
        <div className="text-center m-6 p-10 bg-gray-100 rounded-lg shadow">
          <p className="text-gray-600 text-lg"> No bookings available yet.</p>
          <p className="text-gray-500">Click “Buy Product” to get started.</p>
        </div>
      ) : 

       ( <div className='shadow-lg'>

 <Table className='lg:w-min-700 bg-yellow-200 my-10 md:`w-[760px]` '>
  <Table.ScrollContainer>
    <Table.Content aria-label="Team members" className='p-4'>
      <Table.Header>
        {/* <Table.Column className= "font-bold text-lg">Photo</Table.Column> */}
        <Table.Column className= "font-bold text-lg"  isRowHeader>Transaction ID</Table.Column>
        <Table.Column className= "font-bold text-lg"  isRowHeader>Product Name</Table.Column>
       <Table.Column className= "font-bold text-lg">Price</Table.Column>
        {/* <Table.Column>booking Id</Table.Column> */}
        <Table.Column className= "font-bold text-lg" >Status</Table.Column>
          <Table.Column className= "font-bold text-lg">Buyer Email</Table.Column>
        {/* <Table.Column className= "font-bold text-lg" >Action</Table.Column> */}
      </Table.Header>
      <Table.Body>
         {payments && payments.map((paymentsData) => ( 
      
          <Table.Row key={paymentsData?._id}>
            {/* <Table.Cell>
              <Image
                src={bookedData.tutorImage}
                alt={bookedData.tutorName}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </Table.Cell> */}
            <Table.Cell>{paymentsData.transactionId}</Table.Cell>
            <Table.Cell>{paymentsData.metadata?.title}</Table.Cell>
            {/* <Table.Cell>{bookedData._id}</Table.Cell> */}
            <Table.Cell>{paymentsData.metadata.price}</Table.Cell>
            <Table.Cell className="" > {paymentsData. paymentStatus}</Table.Cell> 
             <Table.Cell>{ paymentsData.createdAt}</Table.Cell>
            {/* <Table.Cell className="" > {Success || Cancelled}</Table.Cell> */}
            {/* <Table.Cell> <Button bookingId = {bookedData._id} /> </Table.Cell> */}
            {/* <Table.Cell> <CancelledButton bookingId = {bookedData._id} status={bookedData.tutorStatus}  /> </Table.Cell> */}
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

export default PaymentTable;
