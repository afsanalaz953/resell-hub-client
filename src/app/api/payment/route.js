
// api create for stripe in fontend

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth';

import { stripe } from '../../../lib/stripe'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin');

    const userSession = await auth.api.getSession({
      headers:await headers(),
    });

    const user = userSession?.user;
    const formData = await request.formData();
    const price = formData.get ('price')
    const title = formData.get ('title')
    const productId = formData.get ('productId')
    const sellerId = formData.get('sellerId')
   
console.log(price, title, sellerId, "modalformdata")
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email:user.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency:"usd",
            unit_amount:Number(price) * 100,
            product_data:{
              name:title
            }
           },
          quantity: 1,
        },
      ],
      metadata:{
        price: Number (price),
        // userId: user.id,
        //  userEmail: user.email,
         buyerId: user.id,
        buyerEmail: user.email,
        title,
        productId,
        sellerId: sellerId, 
        
      },
      mode: 'payment',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    console.log(session, "billsession")
     return NextResponse.redirect(session.url, 303)
    // return NextResponse.json({url:session.url});
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}



 export async function GET(){
   return NextResponse.json({message: "hello from resell hub"})
}

 // paymentIntentId: payment_intent?.id,
      // lineItems: line_items?.data || [],