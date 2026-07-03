// copied from faisal

// import { subscription } from '@/lib/action/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'



export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
console.log(session_id)
  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    // api call
const paymentData = {
      sessionId: session_id,
      status,
      customerEmail,
      // amountTotal: amount_total,
      // currency,
      metadata,
      // paymentIntentId: payment_intent?.id,
      // lineItems: line_items?.data || [],
      createdAt: new Date().toISOString(),
    };

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
// console.log(paymentData, 'paymentData');

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