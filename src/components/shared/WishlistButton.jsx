// components/WishlistButton.jsx
"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

const WishlistButton = ({productData, productId}) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
const [loading, setLoading] = useState(false);
  

    const toggleWishlist = async(e) => {
        e.stopPropagation(); // Prevent card click from triggering
        setIsWishlisted(!isWishlisted);

//          const session = await auth.api.getSession({
//      headers: await headers(), // you need to pass the headers object.
//  });
//  const user = session?.user;
//  const userId = user?.id;


        // 🔔 Optional: Add your API call here
        // await addToWishlist(productId);
        console.log(`${isWishlisted ? "Removed from" : "Added to"} wishlist:`, productId);

        if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productData: productData, productId:productData._id  })
      });

      const data = await response.json();
      console.log(data, "wishData")
      if (response.ok) {
        setIsWishlisted(true);
        console.log('success:', data.message);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Network Error:', error);
    } finally {
      setLoading(false);
    }



    };




    return (
        <button
            onClick={toggleWishlist}
            // className={`p-2 rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-90 ${className}`}
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