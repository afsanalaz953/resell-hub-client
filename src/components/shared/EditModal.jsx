"use client";
import React, { useState } from 'react';
import { Button, Input, Card, CardHeader } from "@heroui/react";
import { toast } from 'react-toastify';
import { authClient } from "@/lib/auth-client";

const EditModal = ({ isOpen, onOpenChange, profile, refetch }) => {
  const [loading, setLoading] = useState(false);
  const { userName, image } = profile || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      // Better Auth এর বিল্ট-ইন মেথড ব্যবহার করুন
      const { data, error } = await authClient.updateUser({
        name: updatedData.name,
        image: updatedData.image,
      });

      if (data) {
        toast.success('Profile updated successfully!');
        onOpenChange(false);        // মডাল বন্ধ
        await refetch();            // সেশন রিফ্রেশ → UI আপডেট
      } else {
        toast.error(error?.message || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Card className="w-full max-w-3xl mx-4 bg-white shadow-2xl rounded-2xl border border-gray-200" radius="lg">
        <CardHeader className="flex flex-col gap-1 pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
        </CardHeader>
        <div className="pt-6 px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <Input
              name="name"
              label="Full Name"
              labelPlacement="outside"
              placeholder="John Doe"
              defaultValue={userName || ''}
              className="bg-gray-50 border-gray-300 focus:border-indigo-500"
              isRequired
            />
            <Input
              name="image"
              label="Avatar URL"
              labelPlacement="outside"
              placeholder="https://api.dicebear.com/7.x/adventurer/svg?seed=John"
              defaultValue={image || ''}
              className="bg-gray-50 border-gray-300 focus:border-indigo-500"
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="light"
                onPress={() => onOpenChange(false)}
                className="text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-11 px-6 shadow-md"
                radius="lg"
                isLoading={loading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default EditModal;







// // components/shared/EditModal.tsx
// // components/shared/EditModal.tsx
// "use client";
// import React, { useState } from 'react';
// import { Button, Input, TextArea, Card, CardHeader } from "@heroui/react";
// import { toast } from 'react-toastify';
// import { authClient } from "@/lib/auth-client";

// const EditModal = ({ isOpen, onOpenChange, profile }) => {
//   const [loading, setLoading] = useState(false);
//   const { userId, userName, image } = profile || {};

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target);
//     const updatedData = Object.fromEntries(formData.entries());

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/buyerprofile/${userId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success('Profile updated successfully!');
//         onOpenChange(false);

//  // Session রিফ্রেশ করুন
//       await authClient.refreshSession(); 
//       // অথবা window.location.reload(); // পুরো পেজ রিলোড
//       window.location.reload(); 

//         // window.location.reload();
//         // router.refresh(); 
//       } else {
//         toast.error(data.message || 'Update failed');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     // Overlay with subtle blur
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <Card className="w-full max-w-3xl mx-4 bg-white shadow-2xl rounded-2xl border border-gray-200" radius="lg">
//         <CardHeader className="flex flex-col gap-1 pb-4 border-b border-gray-200">
//           <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
          
//         </CardHeader>
//         <div className="pt-6 px-6 pb-6">
//           <form onSubmit={handleSubmit} className="space-y-5 w-full">
//             {/* Full Name */}
//             <Input
//               name="name"
//               label="Full Name"
//               labelPlacement="outside"
//               placeholder="John Doe"
//               defaultValue={userName || ''}
//               className="bg-gray-50 border-gray-300 focus:border-indigo-500"
//               isRequired
//             />

//             {/* Avatar URL */}
//             <Input
//               name="image"
//               label="Avatar URL"
//               labelPlacement="outside"
//               placeholder="https://api.dicebear.com/7.x/adventurer/svg?seed=John"
//               defaultValue={image || ''}
//               className="bg-gray-50 border-gray-300 focus:border-indigo-500"
//             />

           

//             {/* Buttons */}
//             <div className="flex justify-end gap-3 pt-2">
//               <Button
//                 type="button"
//                 variant="light"
//                 onPress={() => onOpenChange(false)}
//                 className="text-gray-600 hover:bg-gray-100"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-11 px-6 shadow-md"
//                 radius="lg"
//                 isLoading={loading}
//               >
//                 Save Changes
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default EditModal;

