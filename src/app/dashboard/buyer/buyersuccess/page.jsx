
import { redirect } from 'next/navigation'
import Link from 'next/link'
// import { CheckCircle, ArrowRight, Leaf } from "lucide-react";
import { stripe } from '@/lib/stripe'
import { motion } from "framer-motion";
import SuccessTable from '@/components/dashboard/SuccessTable'
import { headers } from 'next/headers';
import { auth } from "@/lib/auth";

export default async function buyersuccess({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

 const tokenObj = await auth.api.getToken({
       headers: await headers()
     })
      console.log(tokenObj, 'sucessToken')


  const {
    status,
     metadata,                     // ← add this
  payment_intent,  
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }
  //  price_data: {
      //       currency: "usd",
      //       unit_amount: Number(price) * 100,
      //       product_data: {
      //           name: title,
      //       }
      //     },
      //     quantity: Number(quantity),
      //   },
      // ],
      // metadata: {
      //   price: Number(price),
      //   totalPrice,
      //   buyerId: user?.id,
      //   buyerEmail: user?.email,
      //   title,
      //   productId,
      //    quantity: Number(quantity),
         

  if (status === 'complete') {
 const paymentData = {
    sessionId: session_id,
    buyerEmail: metadata?.buyerEmail,
    buyerId: metadata?.buyerId,
    title : metadata?.title,
    price: Number(metadata?.price || 0),
    totalPrice: Number(metadata?.totalPrice || 0),
    paymentIntentId: payment_intent?.id,
    status: 'paid',
    createdAt: new Date().toISOString(),
    metadata,
  };


  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json',
        authorization: `Bearer ${tokenObj.token}`
      },
      body: JSON.stringify(paymentData),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Payment API error:', errorText);
    } else {
      const saved = await res.json();
      console.log('✅ PaymentData saved for client:', saved);
    }
  } catch (error) {
    console.error('❌ Fetch error:', error.message);
  }

  // orderData by stock updating
  if (status === 'complete') {
  // স্ট্রাইপ থেকে মেটাডেটা ও পেমেন্ট ইনটেন্ট নিন
  const { metadata, payment_intent } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['payment_intent']
  });

  // কনসোলে লগ করে দেখুন ডেটা আসছে কিনা
  console.log('✅ Metadata from Stripe:', metadata);
  console.log('Product ID:', metadata?.productId);
  console.log('Quantity:', metadata?.quantity);

  // ১. স্টক আপডেট
   let orderExists = false;
   try {
    const checkRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?sessionId=${session_id}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenObj.token}`
      },
      cache: 'no-store' // যাতে ক্যাশ থেকে পুরোনো ডেটা না আসে
    });

     if (checkRes.ok) {
      const existingOrders = await checkRes.json();
      // আপনার ব্যাকএন্ড API রেসপন্স ফরম্যাট অনুযায়ী নিচের লাইনটি চেক করুন
      // যদি অ্যারে রিটার্ন করে: existingOrders.length > 0
      // যদি অবজেক্ট রিটার্ন করে: existingOrders.sessionId === session_id
      if (existingOrders && (Array.isArray(existingOrders) ? existingOrders.length > 0 : existingOrders.sessionId === session_id)) {
        orderExists = true;
        console.log('⚠️ Order already exists for this sessionId. Skipping creation.');
      }
    }
  } catch (error) {
    console.error('❌ Error checking existing order:', error.message);
  }
// Stock update
if (!orderExists) {
  try {
    const stockRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${metadata.productId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
        //      authorization: `Bearer ${tokenObj.token}`,
         },
        body: JSON.stringify({ quantity: Number(metadata.quantity) }),
      }
    );

    if (!stockRes.ok) {
      const errorText = await stockRes.text();
      throw new Error(`Stock update failed: ${errorText}`);
    }
    console.log('✅ Stock updated successfully');
  } catch (error) {
    console.error('❌ Stock update error:', error.message);
    // চাইলে এখানে রিটার্ন করে দিতে পারেন, যাতে অর্ডার না হয়
    // return redirect('/error?message=stock-update-failed');
  }

  // ২. অর্ডার তৈরি (সরাসরি metadata ব্যবহার করুন)
  try {
    const sellerOrderData = {
      sessionId: session_id,
      customerEmail,
      buyerId: metadata?.buyerId,
      buyerName: metadata?.buyerName,
      sellerId: metadata?.sellerId,
     sellerName:metadata?.sellerName,
      sellerEmail: metadata?.sellerEmail,
      productId: metadata?.productId,
      title: metadata?.title,
      price: metadata?.price,
      quantity: metadata?.quantity,
      totalPrice: metadata?.totalPrice,
      orderStatus: 'pending',
      status: 'paid',
      metadata,
      createdAt: new Date(), 
    };

    console.log('📦 buyerOrder payload:', sellerOrderData);

    const resData = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
         authorization: `Bearer ${tokenObj.token}`
       },
     
      body: JSON.stringify(sellerOrderData),
    });

    if (!resData.ok) {
      const errorText = await resData.text();
      throw new Error(`Order save failed: ${errorText}`);
    }
    const saved = await resData.json();
    console.log('✅ Order saved:', saved);
  } catch (error) {
    console.error('❌ Order save error:', error.message);
  }
 } else {
      console.log('⏩ Order already exists. Skipping stock update and order creation.');
  }
 

//    try {
//     const stockRes = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${metadata.productId}`,
//       {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ quantity: Number(metadata.quantity) }),
//       }
//     );
//     if (!stockRes.ok) console.error('Stock update failed');
//   } catch (error) {
//     console.error('Stock update error:', error);
//   }
// }

//   // payment data end sellerorder data start
//   //  if (paymentData.status ===  'paid') {
//  const sellerOrderData = {
// sessionId: session_id,
//   customerEmail,
//    buyerId: metadata?.buyerId,      // মেটাডেটা থেকে
//   sellerId: metadata?.sellerId,
//   // userId:paymentData.metadata?.userId,
//   productId:metadata?.productId,
//   title: metadata?.title,
//   price: metadata?.price,
//   buyerName: metadata?.buyerName,
//   status:'paid',
//   // Date: paymentData.createdAt,
// metaData: metadata,
//   quantity: metadata?.quantity,
//   totalPrice: metadata?.totalPrice,
//   orderStatus: 'pending',
//   metadata,

// //     sessionId: session_id,
// //     buyerEmail: metadata?.buyerEmail,
// //     buyerId: metadata?.buyerId,
// //     sellerId : 
// //     sellerName : 
// //     sellerEmail : 
// //     title : metadata?.title,
// //     price: Number(metadata?.price || 0),
// //     totalPrice: Number(metadata?.totalPrice || 0),
// //     paymentIntentId: payment_intent?.id,
// //     status: 'paid',
// //     createdAt: new Date().toISOString(),
// //     metadata,
//   };

// console.log (sellerOrderData, "sellerOrderData")
//   try {
//     const resData = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/buyer/orders`, {
//       method: 'POST',
//       headers: { 'Content-Type':'application/json',
//         // authorization: `Bearer ${tokenObj.token}`

//        },
//       body: JSON.stringify(sellerOrderData),
//     });
//     if (!resData.ok) {
//       const errorText = await res.text();
//       console.error('❌ Payment API error:', errorText);
//     } else {
//       const saved = await resData.json();
//       console.log('✅ Seller OrderData saved for client:', saved);
//     }
//   } catch (error) {
//     console.error('❌ Fetch error:', error.message);
//   }



    return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{' '}
//           {customerEmail}. If you have any questions, please email{' '}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
       
//          <div className=" container mx-auto my-10 card bg-primary text-primary-content w-96">
//   <div className="card-body">
//     <h1 className='text-3xl text-white'>Recently Purchased</h1>
//     <h2 className="card-title text-black">{metadata.title}</h2>
//     <p>Price : {metadata.price}  </p>
//     <p>Total Price : {metadata.totalPrice}  </p>
//     <p>Quantity : {metadata.quantity}  </p>
//     <div className="card-actions justify-end">
//       <Link href="/details"   >
//        <button className="btn">View Details</button>
//       </Link>
     
//     </div>
//   </div>
// </div> 

      
    
   
        
//       </section>


    <section id="success" className="py-10 px-4">
      
      <SuccessTable
       customerEmail={customerEmail} 
    metadata={metadata} 
      />
    </section>
  




    )
  }
}
}