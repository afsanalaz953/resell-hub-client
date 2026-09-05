import React from 'react';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card } from "@heroui/react";

const OverviewWishData = async () => {
  const tokenObj = await auth.api.getToken({
       headers: await headers()
     })
      console.log(tokenObj)
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const buyerId = user?.id;

  let wishlistData = [];
  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist?buyerId=${buyerId}`,
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`,
      {
        cache: 'no-store',
        headers:{
      authorization: `Bearer ${tokenObj?.token}`
   }
      }
    );
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    wishlistData = await res.json();
    console.log(wishlistData, "wishData")
  } catch (error) {
    console.error('Wishlist fetch error:', error);
  }

  return (
    <div>
      <div className="card-body items-start text-start mt-2">
        <h2 className="card-title text-3xl text-black">Wishlist</h2>
        {/* <p className="text-2xl font-bold text-orange-700">
          {wishlistData.length || 0}
        </p> */}

        <div className="grid grid-cols-3 gap-2 w-full">
          {wishlistData.length === 0 ? (
            <p className="text-blue-500">No items in wishlist</p>
          ) : (
            wishlistData.map((wishItem, index) => (
                // <div>
                     <Card key={index} className="border-2 w-full shadow-md mt-2">
                <Card.Header className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    {wishItem.productData.title}
                  </span>
                  {/* If you have a status (e.g., 'in stock'), adapt accordingly */}
                  <span className="rounded text-sm bg-blue-100 text-blue-700 px-2 py-1">
                    {wishItem.productData.condition}
                  </span>
                </Card.Header>
                <Card.Content>
                  <p className="text-gray-600">
                    Price: ${wishItem.productData.price }
                  </p>
                   <p className="text-gray-600">
                    Category: {wishItem.productData.category }
                  </p>
                  <p className="text-gray-500 text-sm">
                    Added on:{' '}
                    {wishItem.addedAt
                      ? new Date(wishItem.addedAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </Card.Content>
                <Card.Footer className="text-sm text-black flex-col justify-start items-start">
                  <div>Seller: {wishItem.productData.sellerName || 'Unknown'}</div>
                  <div>Seller Email: {wishItem.productData.sellerEmail || 'N/A'}</div>
                </Card.Footer>
              </Card>
               
             
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewWishData;