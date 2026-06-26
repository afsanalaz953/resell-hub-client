 import { NextResponse } from 'next/server'
 import {auth} from "./lib/auth"
 import {headers} from "next/headers"
 
// // This function can be marked `async` if using `await` inside
 export async function proxy (request) {
    const session = await auth.api.getSession({
        headers:await headers()
   })
if (session?.user?.role == "seller" && session?.user?.plan == "free"){
   return NextResponse.redirect(new URL('/pricing', request.url))  
}
 if(!session){
        return NextResponse.redirect(new URL('/login', request.url))
    }
 const { pathname } = request.nextUrl;


  
//   // Allow access to all other pages
   return NextResponse.next();
 }


//    return NextResponse.redirect(new URL('/login', request.url))
//  }
  


 
 export const config = {
    matcher: [ '/dashboard/seller', '/profile'], 
  }
