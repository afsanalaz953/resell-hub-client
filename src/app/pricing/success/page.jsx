// copied from faisal

// import { subscription } from '@/lib/action/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { Button, Card, Divider } from "@heroui/react";


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
  sellerId: metadata?.sellerId,              
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
   buyerId: paymentData.metadata?.userId,      // মেটাডেটা থেকে
  sellerId: paymentData.metadata?.sellerId,
  // userId:paymentData.metadata?.userId,
  productId:paymentData. metadata?.productId,
  title: paymentData.metadata?.title,
  price: paymentData.metadata?.price,
  buyerName: paymentData.name,
  status,
  createdAt: new Date().toISOString(),
  sellerId: paymentData.metadata?.sellerId,
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
 <Card className="max-w-2xl w-full shadow-lg border border-gray-100">
        <Card.Header className="flex flex-col items-center pb-0 pt-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-500 mt-1 text-center">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </Card.Header>

        <Card.Body className="px-6 py-6">
          <Divider className="my-2" />

          {/* Order Summary */}
          <div className="space-y-4 mt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order Number</span>
              <span className="font-medium text-gray-900">
                {orderDetails.orderId}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-900">
                {orderDetails.date}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-medium text-gray-900">
                {orderDetails.total}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Confirmation Sent To</span>
              <span className="font-medium text-gray-900">
                {orderDetails.email}
              </span>
            </div>
          </div>

          <Divider className="my-4" />

          {/* Items List */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Order Items</h3>
            {orderDetails.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm py-1"
              >
                <span className="text-gray-600">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <Divider className="my-4" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              as={Link}
              href="/"
              color="primary"
              className="flex-1 font-medium"
              size="lg"
            >
              Continue Shopping
            </Button>
            <Button
              as={Link}
              href={`/orders/${orderDetails.orderId}`}
              variant="bordered"
              className="flex-1 font-medium"
              size="lg"
            >
              View Order
            </Button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            A confirmation email has been sent to your registered email address.
          </p>
        </Card.Body>
      </Card>
        
      </section>
    )
  }
}