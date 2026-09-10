"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Spinner, Chip } from '@heroui/react';
import { motion } from 'framer-motion';

const Categories = ({ selectedCategory }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`,{
           
        })
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        let catNames = data;
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
          catNames = data.map(item => item.name || item.category || item);
        }
        setCategories(catNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (cat) => {
    // const params = new URLSearchParams(window.location.search);
     const params = new URLSearchParams();
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    // router.push(`?${params.toString()}`);
    router.push(`/products?${params.toString()}`);
    
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className='h-40'>
      <Chip className= "bg-orange-100 block w-fit m-4 text-orange-600 mx-auto  items-center text-center"> Browse by Category</Chip>
    <h2 className='text-3xl text-black text-center font-bold'>Popular Categories</h2>
    <div className="top-4 flex flex-wrap gap-2">
      {/* "All" বাটন */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          color={!selectedCategory ? 'primary' : 'default'}
          variant={!selectedCategory ? 'solid' : 'bordered'}
          onPress={() => handleCategoryClick('')}
          className="capitalize  ml-20"
        >
        {selectedCategory ? 'Clear Filter' : 'All Products'}
        </Button>
      </motion.div>

      {/* বাকি ক্যাটাগরি */}
      {categories.map((cat) => (
        <motion.div
          key={cat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className=''
        
        >
          <Button
            color={selectedCategory === cat ? 'primary' : 'default'}
            variant={selectedCategory === cat ? 'solid' : 'bordered'}
            onPress={() => handleCategoryClick(cat)}
            className="capitalize ml-4 text-center w-full justify-center "
          >
            {cat}
          </Button>
        </motion.div>
      ))}
    </div>
    </div>
  );
};

export default Categories;




// / "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button, Spinner } from '@heroui/react';
// import { motion } from 'framer-motion';

// const Categories = ({ selectedCategory }) => {
//   const router = useRouter();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`);
//         if (!res.ok) throw new Error('Failed to fetch categories');
//         const data = await res.json();
//         // ডেটা ফরম্যাট ঠিক করা
//         let catNames = data;
//         if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
//           catNames = data.map(item => item.name || item.category || item);
//         }
//         setCategories(catNames);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // ক্যাটাগরি ক্লিক করলে URL আপডেট
//   const handleCategoryClick = (cat) => {
//     const params = new URLSearchParams(window.location.search);
//     if (cat) {
//       params.set('category', cat);
//     } else {
//       params.delete('category');
//     }
//     params.set('page', '1'); // নতুন ক্যাটাগরিতে পেজ ১
//     router.push(`?${params.toString()}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <Spinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="sticky top-4 ">
//       {/* "All" বাটন */}
//       <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//         <Button
//           color={!selectedCategory ? 'primary' : 'default'}
//           variant={!selectedCategory ? 'solid' : 'bordered'}
//           onPress={() => handleCategoryClick('')}
//           className="w-full  capitalize "
          
//         >
//           All Products
//         </Button>
//       </motion.div>

//       {/* বাকি ক্যাটাগরি */}
//       {categories.map((cat) => (
//         <motion.div
//           key={cat}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//            className="flex flex-wrap gap-2 mb-8 justify-center"
//         >
//           <Button
//             color={selectedCategory === cat ? 'primary' : 'default'}
//             variant={selectedCategory === cat ? 'solid' : 'bordered'}
//             onPress={() => handleCategoryClick(cat)}
//             className="w-full flex  capitalize"
//           >
//             {cat}
//           </Button>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default Categories;





// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button, Card, Chip, Spinner } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingCategories, setLoadingCategories] = useState(true);

//   // Fetch all categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`);
//         if (!res.ok) throw new Error("Failed to fetch categories");
//         const data = await res.json();
//                let categoryNames = data;
//         if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
//           // ধরে নিচ্ছি প্রতিটি অবজেক্টে `name` বা `category` ফিল্ড আছে
//           categoryNames = data.map(item => item.name || item.category || item);
//         }
//         setCategories(categoryNames);
//         if (categoryNames.length > 0) {
//           setSelectedCategory(categoryNames[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoadingCategories(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch products when selectedCategory changes
//   useEffect(() => {
//     if (!selectedCategory) return;
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?category=${encodeURIComponent(
//             selectedCategory
//           )}`
//         );
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [selectedCategory]);

//   if (loadingCategories) {
//     return (
//       <div className="flex  justify-center items-center h-40">
//         <Spinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Category Tabs */}
//       <div className="flex flex-wrap gap-2 mb-8 justify-center">
//         {categories.map((cat) => (
//           <motion.div
//             key={cat}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Button
//               color={selectedCategory === cat ? "primary" : "default"}
//               variant={selectedCategory === cat ? "solid" : "bordered"}
//               onPress={() => setSelectedCategory(cat)}
//               className="capitalize"
//             >
//               {cat}
//             </Button>
//           </motion.div>
//         ))}
//       </div>

//       {/* Products Grid */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <Spinner size="lg" />
//         </div>
//       ) : products.length === 0 ? (
//         <div className="text-center py-16">
//           <p className="text-xl text-gray-500">No products found in this category.</p>
//         </div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4 }}
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//         >
//           {products.map((product) => (
//             <motion.div
//               key={product._id}
//               whileHover={{ y: -5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Card
//                 isHoverable
//                 className="overflow-hidden shadow-lg h-full flex flex-col"
//               >
//                 <Link href={`/product/${product._id}`} className="block">
//                   <div className="relative w-full h-48 bg-gray-200">
//                     <Image
//                       src={product.image || "/placeholder.png"}
//                       alt={product.title}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
//                     />
//                   </div>
//                   <div className="p-4 flex flex-col grow">
//                     <h3 className="text-lg font-semibold line-clamp-1">
//                       {product.title}
//                     </h3>
//                     <div className="flex flex-wrap gap-1 mt-2">
//                       <Chip size="sm" color="secondary" variant="flat">
//                         {product.condition}
//                       </Chip>
//                       <Chip size="sm" color="success" variant="flat">
//                         {product.status}
//                       </Chip>
//                     </div>
//                     <p className="text-xl font-bold text-blue-600 mt-2">
//                       ${product.price}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Stock: {product.stock}
//                     </p>
//                   </div>
//                 </Link>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Categories;