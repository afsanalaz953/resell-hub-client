"use client";
import React, { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import EditModal from "@/components/shared/EditModal";
import Link from "next/link";

const BuyerProfilePage = () => {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isPending) return <div>Loading...</div>;

  return (
    <div className='bg-slate-100 shadow-sm m-4 p-20'>
      <div className="card bg-base-100 w-150 h-100 shadow-sm container mx-auto">
        <figure className="px-10 pt-10">
          {/* ইমেজ দেখাতে চাইলে আনকমেন্ট করুন */}
          {/* <Image src={user?.image} alt="author" width={150} height={150} /> */}
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title font-bold text-3xl">{user?.name}</h2>
          <p className='text-lg'>{user?.email}</p>
          <div className="card-actions flex gap-4">
            <Button as={Link} href="/" variant="light">Home</Button>
            <Button 
              color="primary" 
              onPress={() => setIsModalOpen(true)}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>

      {/* মডাল কম্পোনেন্টে refetch পাঠানো হচ্ছে */}
      <EditModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        profile={{ userId: user?.id, userName: user?.name, image: user?.image }}
        refetch={refetch}   // <-- এটা যোগ করুন
      />
    </div>
  );
};

export default BuyerProfilePage;







// "use client";
// import React, { useState } from 'react';
// import { authClient } from "@/lib/auth-client";
// import { Button } from "@heroui/react";
// import EditModal from "@/components/shared/EditModal";
// import Link from "next/link";

// const BuyerProfilePage = () => {
//   const { data: session, isPending, refetch  } = authClient.useSession();
//   const user = session?.user;
//   const [isModalOpen, setIsModalOpen] = useState(false);

// const handleProfileUpdate = async () => {
//     await refetch(); // সেশন রিফ্রেশ
//     // চাইলে router.refresh() ও ব্যবহার করতে পারেন (Next.js App Router)
//   };

//   if (isPending) return <div>Loading...</div>;

//   return (
//     <div className='bg-slate-100 shadow-sm m-4 p-20'>
//       <div className="card bg-base-100 w-150 h-100 shadow-sm container mx-auto">
//         <figure className="px-10 pt-10">
//           {/* ইমেজ দেখাতে চাইলে আনকমেন্ট করুন */}
//           {/* <Image src={user?.image} alt="author" width={150} height={150} /> */}
//         </figure>
//         <div className="card-body items-center text-center">
//           <h2 className="card-title font-bold text-3xl">{user?.name}</h2>
//           <p className='text-lg'>{user?.email}</p>
//           <div className="card-actions flex gap-4">
//             <Button as={Link} href="/" variant="light">Home</Button>
//             <Button 
//               color="primary" 
//               onPress={() => setIsModalOpen(true)}
//             >
//               Update Profile
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* মডাল কম্পোনেন্ট */}
//       <EditModal
//         isOpen={isModalOpen}
//         onOpenChange={setIsModalOpen}
//         profile={{ userId: user?.id, userName: user?.name, image: user?.image }}
//       />
//     </div>
//   );
// };

// export default BuyerProfilePage;









