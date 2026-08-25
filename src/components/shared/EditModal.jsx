"use client";
import React, { useState, useRef } from 'react';
import { Button, Input, Card, CardHeader, Avatar } from "@heroui/react";
import { toast } from 'react-toastify';
import { authClient } from "@/lib/auth-client";

const EditModal = ({ isOpen, onOpenChange, profile, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(profile?.image || null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const { userName, image } = profile || {};

  // ইমেজ সিলেক্ট করলে প্রিভিউ দেখানো
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ImgBB-তে আপলোড
  const uploadToImgBB = async (file) => {
    const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!API_KEY) {
      throw new Error('ImgBB API key is missing');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      { method: 'POST', body: formData }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || 'Image upload failed');
    }

    return data.data.url; // ইমেজের URL
  };

  // ফর্ম সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');

    try {
      let imageUrl = imagePreview || image;

      // নতুন ইমেজ থাকলে ImgBB-তে আপলোড
      if (imageFile) {
        setUploadingImage(true);
        imageUrl = await uploadToImgBB(imageFile);
        setUploadingImage(false);
      }

      // Better Auth দিয়ে প্রোফাইল আপডেট
      const { data, error } = await authClient.updateUser({
        name: name,
        image: imageUrl,
      });

      if (data) {
        toast.success('Profile updated successfully!');
        onOpenChange(false);
        await refetch(); // সেশন রিফ্রেশ
      } else {
        toast.error(error?.message || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
      setUploadingImage(false);
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

            {/* প্রোফাইল ইমেজ আপলোড */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="relative cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Avatar
                  src={imagePreview || image || ''}
                  size="lg"
                  className="w-24 h-24 border-2 border-gray-300 group-hover:border-indigo-500 transition-colors"
                  showFallback
                  fallback={<span className="text-3xl">👤</span>}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">Change</span>
                </div>
                {uploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500">Click on avatar to change image</p>
            </div>

            {/* নাম */}
            <Input
              name="name"
              label="Full Name"
              labelPlacement="outside"
              placeholder="John Doe"
              defaultValue={userName || ''}
              className="bg-gray-50 border-gray-300 focus:border-indigo-500"
              isRequired
            />

            {/* বাটন */}
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
                isLoading={loading || uploadingImage}
              >
                {uploadingImage ? 'Uploading Image...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default EditModal;








// "use client";
// import React, { useState } from 'react';
// import { Button, Input, Card, CardHeader } from "@heroui/react";
// import { toast } from 'react-toastify';
// import { authClient } from "@/lib/auth-client";

// const EditModal = ({ isOpen, onOpenChange, profile, refetch }) => {
//   const [loading, setLoading] = useState(false);
//   const { userName, image } = profile || {};

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target);
//     const updatedData = Object.fromEntries(formData.entries());

//     try {
//       // Better Auth এর বিল্ট-ইন মেথড ব্যবহার করুন
//       const { data, error } = await authClient.updateUser({
//         name: updatedData.name,
//         image: updatedData.image,
//       });

//       if (data) {
//         toast.success('Profile updated successfully!');
//         onOpenChange(false);        // মডাল বন্ধ
//         await refetch();            // সেশন রিফ্রেশ → UI আপডেট
//       } else {
//         toast.error(error?.message || 'Update failed');
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
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <Card className="w-full max-w-3xl mx-4 bg-white shadow-2xl rounded-2xl border border-gray-200" radius="lg">
//         <CardHeader className="flex flex-col gap-1 pb-4 border-b border-gray-200">
//           <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
//         </CardHeader>
//         <div className="pt-6 px-6 pb-6">
//           <form onSubmit={handleSubmit} className="space-y-5 w-full">
//             <Input
//               name="name"
//               label="Full Name"
//               labelPlacement="outside"
//               placeholder="John Doe"
//               defaultValue={userName || ''}
//               className="bg-gray-50 border-gray-300 focus:border-indigo-500"
//               isRequired
//             />
//             <Input
//               name="image"
//               label="Avatar URL"
//               labelPlacement="outside"
//               placeholder="https://api.dicebear.com/7.x/adventurer/svg?seed=John"
//               defaultValue={image || ''}
//               className="bg-gray-50 border-gray-300 focus:border-indigo-500"
//             />
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







