import React from 'react';
import { Card } from "@heroui/react";

const LatestOrderCard = ({ order }) => {       // prop নাম 'order' (একক)
  return (
    <Card className="border-2 w-full shadow-md mt-2">
      <Card.Header className="flex justify-between items-center">
        {/* <span className="text-lg font-semibold">Order #{order._id?.slice(-6)}</span> */}
        <span className="text-lg font-semibold">{order.title}</span>
        <span className={`rounded text-sm ${
          order.orderStatus === 'approved' ? 'bg-green-100 text-green-700' :
          order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {order.orderStatus}
        </span>
      </Card.Header>
      <Card.Content className="">
        <p className="text-gray-600">Total: {order.quantity || 0}</p>
        <p className="text-gray-600">Total: ${order.totalPrice || 0}</p>
        <p className="text-gray-500 text-sm">
          {/* {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'} */}
         Purchase Date: {new Date(order.Date).toLocaleDateString()}
        </p>
      </Card.Content>
      <Card.Footer className="text-sm text-gray-400 flex-col justify-start items-start">
       <div>Buyer: {order.metadata?.buyerName} </div> 
     <div> Buyer Email: {order.metadata?.buyerEmail}</div>
      </Card.Footer>
    </Card>
  );
};

export default LatestOrderCard;





// import React from 'react';
// import { Card } from "@heroui/react";

// const LatestOrderCard = ({orders}) => {
//     return (
//         <div>
//             <Card className='border-2 w-full '>
//     <Card.Header className='text-orange text-3xl'> Latest Order
//       <Card.Title>  {orders.title} </Card.Title>
//       <Card.Description />
//     </Card.Header>
//     <Card.Content />
//     <Card.Footer />
//   </Card>
//         </div>
//     );
// };

// export default LatestOrderCard;