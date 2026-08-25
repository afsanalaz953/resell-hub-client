
import { redirect } from 'next/navigation'
import Link from 'next/link'
// import { CheckCircle, ArrowRight, Leaf } from "lucide-react";
import { stripe } from '@/lib/stripe'
import { motion } from "framer-motion";
import SuccessTable from '@/components/dashboard/SuccessTable'

export default async function buyersuccess({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

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
      headers: { 'Content-Type':'application/json' },
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