// copied from faisal

// import { subscription } from '@/lib/action/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'



export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
console.log(session_id, "success payment")
  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  // const {
  //   status,
  //   session,
  //   metadata,
  //   customer_details: { email: customerEmail }
  // } = await stripe.checkout.sessions.retrieve(session_id, {
  //   expand: ['line_items', 'payment_intent']
  // })
   const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  // এবার সেখান থেকে প্রপার্টিগুলো বের করুন
const status = checkoutSession.status
const metadata = checkoutSession.metadata
const customerEmail = checkoutSession.customer_details?.email

// 🎯 এটিই আপনার মূল Transaction ID (Payment Intent ID)
const transactionId = checkoutSession.payment_intent?.id

const dbDate = "2026-07-05T18:41:18.305Z";
const onlyDate = dbDate.split('T')[0];
const paymentData = {
  sessionId: session_id,
  paymentStatus: checkoutSession.payment_status, 
  amount: metadata?.amount,                     
  quantity: metadata?.quantity,
  transactionId: transactionId,                  
  customerEmail,
  metadata,
  // createdAt: new Date().toISOString(),
   createdAt: onlyDate,
};
console.log(paymentData, "payment")
  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    // api call
    // amount: session?.metadata?.amount, evetId: session?.metadata?.eventId, eventTitle: session?.metadata?.eventTitle,
    //  quantity: session?.metadata?.quantity, email: session?.metadata?.email, paymentType: "booking", 
    // transactionId: session?.payment_intent?.id, paymentStatus: session?.payment_status 
// const paymentData = {
//       sessionId: session_id,
//       // status,
//       paymentStatus: session?.payment_status,
//       amount: session?.metadata?.amount,
//       quantity: session?.metadata?.quantity,
//       transactionId: session?.payment_intent?.id,
//       customerEmail,
//       // amountTotal: amount_total,
//       // currency,
//       metadata,
//     //  paymentIntentId: payment_intent?.id,
//     // lineItems: line_items?.data || [],
//       createdAt: new Date().toISOString(),
//     };

    try {
      // 🌐 Express.js সার্ভারে POST রিকোয়েস্ট পাঠাই
      // const API_URL = process.env.EXPRESS_API_URL || 'http://localhost:5000';
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

// booking collection a data pathano
const bookingData = {
  sessionId: session_id,
  customerEmail,
  userId:paymentData.metadata?.userId,
  productId:paymentData. metadata?.productId,
  title: paymentData.metadata?.title,
  price: paymentData.metadata?.price,
  buyerName: paymentData.name,
  status,
  createdAt: new Date().toISOString(),
};

      const resdata = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
        method: "POST",
         headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
    })
     const resData = await resdata.json();
     console.log(resData,"bookingdata");

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to save payment: ${res.status}`);
      }

      const savedData = await res.json();
      console.log('✅ Payment saved to MongoDB:', savedData);
    } catch (error) {
      console.error('❌ Error sending to API:', error.message);
      // এখানে error handle করতে পারেন (যেমন: লগ ফাইল বা অল্টারনেটিভ স্টোরেজ)
    }

// const res = await ('api/payments',{
//   method:"POST",
//   headers:{
//     "Content Type": "application/json"
//   },
//   body:JSON.stringify({})
// })
// const paymentData = await res.json();
console.log(paymentData, 'paymentData');

    return (
      <section id="success">
        <p className='text-center m-10'>
          We appreciate your business! 
         
          <br />
          A confirmation email will be sent to{' '}
          {customerEmail}.
          <br />
           If you have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }
}