"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserActionButton = ({ userId, isBlocked }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggleBlock = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: !isBlocked }), // টগল করো
      });

      if (!res.ok) throw new Error("Failed to update");

      // পেজ রিফ্রেশ না করেই UI আপডেট করতে Next.js এর router refresh ব্যবহার করুন
      router.refresh(); 
    } catch (error) {
      console.error("Block action failed:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    } 


    
  };
  



  

  return (
    <Button
      // color={isBlocked ? "bg-green" : "danger"} // আনব্লক হলে সবুজ, ব্লক হলে লাল
        className={isBlocked ? "bg-green-500 text-white" : "bg-red-500 text-white"}
      variant="flat"
      size="sm"
      isLoading={loading}
      onPress={handleToggleBlock}
    >
      {isBlocked ? "Unblock" : "Block"}
    </Button>
  );
};

export default  UserActionButton ;