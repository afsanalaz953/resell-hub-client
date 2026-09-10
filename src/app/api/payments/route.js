import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";



export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

     const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized,fm route – Please login' },
        { status: 401 }
      );
    }

    const formData = await request.formData();

     const price = formData.get('price')
      const title = formData.get('title')
      // const orderId = formData.get('orderId')
      const productId = formData.get('productId')
      const sellerId = formData.get('sellerId')
      const sellerName = formData.get('sellerName')
      const sellerEmail = formData.get('sellerEmail')
       const quantity = formData.get('quantity')
      //  const totalPrice= parseFloat((price * quantity).toFixed(2))
       const totalPrice= formData.get('totalPrice')
      

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
     line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
                name: title,
            }
          },
          quantity: Number(quantity),
        },
      ],
      metadata: {
        
        price: Number(price),
        totalPrice: Number(totalPrice),
        buyerId: user?.id,
        buyerName: user?.name,
        buyerEmail: user?.email,
        title,
        productId,
        sellerId,
        sellerName,
        sellerEmail,
         quantity: quantity,
        //  orderId,
      },
      mode: 'payment',
      // success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
       success_url: `${origin}/dashboard/buyer/buyersuccess?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message || 'Payment initiation failed' },
      { status: err.statusCode || 500 }
    )
  }
}






// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { stripe } from "@/lib/stripe";
// import { auth } from "@/lib/auth";

// export async function POST(request) {
//   try {
//     const headersList = await headers();
//     const origin = headersList.get("origin");

//     const userSession = await auth.api.getSession({
//       headers: await headers(),
//     });

//     const user = userSession?.user;
//     const formData = await request.formData();
//     const price = formData.get('price')
//     // const totalPrice = formData.get('totalPrice')
//     const title = formData.get('title')
//     const productId = formData.get('productId')
//     const buyerId = user?.id
   

    
//     const session = await stripe.checkout.sessions.create({
//       customer_email: user?.email,
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             unit_amount: Number(price) * 100,
//             product_data: {
//                 name: title,
//             }
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         price: Number(price),
//         // totalPrice,
//         buyerId: user?.id,
//         buyerEmail: user?.email,
//         title,
//         productId,
       
//       },
//       mode: "payment",
//       // success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
//       success_url: `${origin}/dashboard/buyer/buyersuccess?session_id={CHECKOUT_SESSION_ID}`,// 
//     });
//     console.log(session, "billsession")
//     return NextResponse.redirect(session.url, 303);
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 },
//     );
//   }
// }







// // api create for stripe in fontend

// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'
// import { auth } from '@/lib/auth';

// import { stripe } from '../../../lib/stripe'

// export async function POST(request) {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin');
//     const formData = await request.formData();

//     const userSession = await auth.api.getSession({
//       headers:await headers(),
//     });

//     //  totalAmount: totalPrice

//     const user = userSession?.user;
//      const buyerEmail = user?.email
//    const userId = user?.id
     
  
     
    
  
//     // const totalPrice = Number(formData.get('totalPrice'));
//     const price = formData.get ('price')
//     // const totalPrice = formData.get ('totalPrice')
//     const title = formData.get ('title')
//     // const productId = formData.get ('productId')
//     // const sellerId = formData.get('sellerId')
//     // const sellerName = formData.get('sellerName')
//     // const sellerEmail = formData.get('sellerEmail')
//     const quantity = formData.get('quantity')
//   //  const customerEmail = user?.email
  
    
//   // const totalPrice = Number(price) * Number(quantity);
   
// // console.log(title, sellerId,sellerName, sellerEmail,price, totalPrice, buyerEmail, "modalformdata")

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       customer_email:user?.email,
//       // buyer_email:user.email,
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price_data: {
//             currency:"usd",
//             unit_amount:Number(price) * 100,
//             product_data:{
//               name:title
//             }
//            },
//              quantity: 1,
//           // quantity:  Number(quantity) || 1,
//         },
//       ],
//       metadata:{
//     //     // totalPrice: Number (totalPrice),
//         price: Number (price),
//     //     // userId: user.id,
//     //     //  userEmail: user.email,
//     //      buyerId: user.id,
//         buyerEmail: user?.email,
//     //     buyerName : user?.name,
//         title,
//     //     productId:productId,
//     //     sellerId: sellerId, 
//     //     sellerName,
//     //     sellerEmail,
//     //      totalPrice: Number(totalPrice),
//     quantity: Number(quantity),
        
//       },
//       mode: 'payment',
//       success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     console.log(session, "billsession")
//      return NextResponse.redirect(session.url, 303)
//     // return NextResponse.json({url:session.url});
  
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }



//  export async function GET(){
//    return NextResponse.json({message: "hello from resell hub"})
// }

//  // paymentIntentId: payment_intent?.id,
//       // lineItems: line_items?.data || [],