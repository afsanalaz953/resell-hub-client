// components/WishlistButton.jsx
"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

const WishlistButton = ({ productData, productId, buyerId }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    // যদি ইতিমধ্যে লোডিং চলে, তাহলে আরেকটি কল ব্লক করুন
    if (loading) return;

    // মনে রাখবেন আগের অবস্থা (API ফেল করলে ফিরিয়ে দিতে)
    const previousState = isWishlisted;
    // UI তে তাৎক্ষণিক ফিডব্যাক দিতে টগল করুন
    setIsWishlisted(!previousState);
    setLoading(true);

    try {
      // সেশন ও buyerId সংগ্রহ (আপনার কোড অনুযায়ী)
      // const session = await auth.api.getSession({
      //   headers: await headers(),
      // });
      // const user = session?.user;
      // const buyerId = user?.id;

      if (!buyerId) {
        toast.error("দয়া করে লগইন করুন!"); // যদি ইউজার লগইন না থাকে
        setIsWishlisted(previousState); // ফিরিয়ে দিন
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productData: productData,
            productId: productData._id,
            buyerId,
          }),
        }
      );

      const data = await response.json();
console.log(data, 'buyerIdWishlist')
      if (response.ok) {
        // সফল হলে টোস্ট দেখান
        toast.success(
          previousState
            ? "Removed from wishlist 🗑️"
            : "Product added to Wishlist ❤️"
        );
        // isWishlisted ইতিমধ্যে true/false করা আছে, আর কোনো পরিবর্তন দরকার নেই
        console.log("success:", data.message);
      } else {
        // সার্ভার থেকে ত্রুটি এলে
        toast.error(data.message || "Server Error!");
        setIsWishlisted(previousState); // আগের অবস্থায় ফিরিয়ে দিন
      }
    } catch (error) {
      // নেটওয়ার্ক বা অন্য কোনো ত্রুটি
      toast.error("Try again, Network isuue");
      console.error("Network Error:", error);
      setIsWishlisted(previousState);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading} // লোডিং হলে ক্লিক ডিজেবল
      className={`p-2 rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-90 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-300 ${
          isWishlisted
            ? "fill-red-500 text-red-500 drop-shadow-md"
            : "text-slate-400 hover:text-red-400"
        }`}
      />
    </button>
  );
};

export default WishlistButton;




// // components/WishlistButton.jsx
// "use client";

// import { Heart } from "lucide-react";
// import { useState } from "react";
// // import { auth } from "@/lib/auth";
// // import { headers } from "next/headers";

// const WishlistButton = ({productData, productId}) => {

  


//     const [isWishlisted, setIsWishlisted] = useState(false);
// const [loading, setLoading] = useState(false);
  

//     const toggleWishlist = async(e) => {
//         e.stopPropagation(); // Prevent card click from triggering
//         setIsWishlisted(!isWishlisted);

//          const session = await auth.api.getSession({
//      headers: await headers(), // you need to pass the headers object.
//  });
//  const user = session?.user;
//  const buyerId = user?.id;


//         // 🔔 Optional: Add your API call here
//         // await addToWishlist(productId);
//         console.log(`${isWishlisted ? "Removed from" : "Added to"} wishlist:`, productId);

//         if (loading) return;

//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({productData: productData, productId:productData._id, buyerId  })
//       });

//       const data = await response.json();
//       console.log(data, "wishData")
//       if (response.ok) {
//         setIsWishlisted(true);
//         console.log('success:', data.message);
//       } else {
//         console.error('Error:', data.message);
//       }
//     } catch (error) {
//       console.error('Network Error:', error);
//     } finally {
//       setLoading(false);
//     }



//     };




//     return (
//         <button
//             onClick={toggleWishlist}
//             // className={`p-2 rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-90 ${className}`}
//             aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//         >
//             <Heart
//                 className={`w-5 h-5 transition-all duration-300 ${
//                     isWishlisted
//                         ? "fill-red-500 text-red-500 drop-shadow-md"
//                         : "text-slate-400 hover:text-red-400"
//                 }`}
//             />
//         </button>
//     );
// };

// export default WishlistButton;