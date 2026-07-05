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


const OrderTable = ({bookings}) => {
  

  return (
    <div>
{/* ✅ Empty state check – put it here */}
      {!bookings || bookings.length === 0 ? (
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
        <Table.Column className= "font-bold text-lg"  isRowHeader>Product Name</Table.Column>
        <Table.Column className= "font-bold text-lg">Buyer Email</Table.Column>
        <Table.Column className= "font-bold text-lg">Price</Table.Column>
        {/* <Table.Column>booking Id</Table.Column> */}
        <Table.Column className= "font-bold text-lg" >Status</Table.Column>
        {/* <Table.Column className= "font-bold text-lg" >Action</Table.Column> */}
      </Table.Header>
      <Table.Body>
         {bookings && bookings.map((bookedData) => ( 
      
          <Table.Row key={bookedData?._id}>
            {/* <Table.Cell>
              <Image
                src={bookedData.tutorImage}
                alt={bookedData.tutorName}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </Table.Cell> */}
            <Table.Cell>{bookedData.title}</Table.Cell>
            <Table.Cell>{bookedData.userEmail}</Table.Cell>
            {/* <Table.Cell>{bookedData._id}</Table.Cell> */}
            <Table.Cell>{bookedData.price}</Table.Cell>
            <Table.Cell className="" > {bookedData.status}</Table.Cell> 
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
  







    // <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
    //   <div className="p-0 overflow-x-auto">
    //     <Table aria-label="My Tickets Table" removeWrapper>
    //       <TableContent>
    //         <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
    //           <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20" isRowHeader>PRODUCT NAME</TableColumn>
    //           <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">DATE</TableColumn>
    //           {/* <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">QUANTITY</TableColumn> */}
    //           <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">TOTAL PAID</TableColumn>
    //           <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">STATUS</TableColumn>
    //         </TableHeader>
    //         <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No ticket passes booked yet. Explore Browse Events!</p>}>
    //           {bookings?.map((bookedData) => (
    //             <TableRow key={bookedData._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
    //               <TableCell className="py-4 px-6 align-middle font-bold text-white">
    //                 <Link href={`/events/${bookedData.productId}`} className="hover:text-pink-500 hover:underline">
    //                   {bookedData.title}
    //                 </Link>
    //               </TableCell>
    //               {/* <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">{new Date(ticket.bookingDate).toLocaleDateString()}</TableCell> */}
    //               <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">{new Date(bookedData.bookingDate).toLocaleDateString()}</TableCell>
    //               <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">${Number(bookedData.price)?.toFixed(2)}</TableCell>
    //               <TableCell className="py-4 px-6 align-middle">
    //                 <Chip
    //                   size="sm"
    //                   variant="flat"
    //                   color={bookedData.status === "failed" ? "danger" : "success"}
    //                   className="font-bold uppercase text-[10px] tracking-wider border border-white/5 px-2"
    //                 >
    //                   {bookedData.status}
    //                 </Chip>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </TableContent>
    //     </Table>
    //   </div>
    // </Card>
  );
};

export default OrderTable;
