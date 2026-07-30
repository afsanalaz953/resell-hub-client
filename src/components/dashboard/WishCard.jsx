import { Button, Chip } from "@heroui/react";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WishlistDeleteButton from "@/components/dashboard/WishlistDeleteButton";

const WishCard = ({ product }) => {
  // যদি product না আসে তাহলে কিছু রেন্ডার করব না
  if (!product) return null;

  // পুরো ডকুমেন্টটি product অবজেক্টে আছে
  // উপরের MongoDB ডকুমেন্ট অনুযায়ী:
  // product._id -> টপ-লেভেল আইডি
  // product.productData -> বাকি সব তথ্য
  const { productData } = product;
  console.log(product, "wishproducts")

  // productData থাকতে পারে, নাও থাকতে পারে – তাই ডিফল্ট অবজেক্ট দিন
const {
    _id,                  // ← এই _id ব্যবহার করবেন লিংকে
    title,
    category,
    condition,
    price,
    stock,
    status,
    description,
    image
  } = productData || {};

  return (
    <div>
      <div className="group flex flex-col bg-white rounded-4xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* ইমেজ কন্টেইনার */}
        <div className="container mx-auto overflow-hidden aspect-[12/10]">
          <Image
            alt="Product Image"
            className="mt-6 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            src={image || "/placeholder-image.jpg"}
            width={300}
            height={100}
          />
        </div>

        {/* কন্টেন্ট */}
        <div className="p-2 m-4 flex flex-col grow space-y-2">
          {/* স্ট্যাটাস চিপ */}
          <div>
            <Chip
              color="primary"
              variant="solid"
              className="bg-linear-to-r from-orange-500 to-yellow-600 items-center font-bold shadow-lg shadow-blue-800/20"
            >
              {status}   {/* ← allProducts.status → status */}
            </Chip>
          </div>

          <div className="space-y-2">
            <Link href={`/products/${_id}`}>   {/* ← টপ-লেভেল _id ব্যবহার */}
              <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                {title}
              </h3>
            </Link>
            <Button className="mt-2 p-2 bg-linear-to-r from-yellow-500 to-orange-600 text-sm font-medium flex items-center gap-1">
              Category : <span className="text-slate-900">{category}</span>
            </Button>
          </div>

          <span>
            <p className="text-xs text-slate-500 font-bold">Condition: {condition}</p>
            <p className="text-xs text-slate-500 font-bold">In stock: {stock}</p>
          </span>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1">
              <p>Description: {description}</p>
            </span>
          </div>

          <div className="pt-6 mt-auto border-t border-slate-100 flex justify-between items-center">
            <span className="text-2xl font-black text-orange-600">${price}</span>
            <span>
              {/* <WishlistDeleteButton productData={product._id} />  ← productData-এ পুরো প্রোডাক্ট পাঠানো হচ্ছে */}
             <WishlistDeleteButton key={product._id} id={product._id} />
            </span>
          </div>

          <Button className="bg-linear-to-r from-yellow-300 to-orange-400 font-bold text-black text-xl rounded-xl px-6 w-full">
            <Link href={`/products/${_id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishCard;











// import { Button, Chip } from "@heroui/react";
// import { BookOpen, Clock } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import WishlistButton from "@/components/shared/WishlistButton";



// const WishCard = async({product}) => {




//  if (!product) {
//         return null;
//     }
// //     //  productData: {
// //     _id: '6a4c72d4b41f7b7d5d339e72',
// //     title: 'Used LG Washing Machine 7kg',
// //     category: 'Home Appliances',
// //     condition: 'Good',
// //     price: 18000,
// //     image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600',
// //     description: 'LG 7kg fully automatic washing machine, front load. Used for 1.5 years, works perfectly. Includes inlet hose.',
// //     sellerInfo: {
// //       userId: 'user011',
// //       name: 'Shahidul Haque',
// //       email: 'shahidul.haque@hotmail.com',
// //       phone: '+8801512345679'
// //     },
// //     status: 'Approved',
// //     stock: 10
// //   }

//     const { _id, title, category, productData.condition, productData.price,
//          productData.stock, productData.status, productdata.description, productData.image} = product;
//     return (
//         <div >
//  <div
//             className="group flex flex-col bg-white rounded-4xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//         >
//             <div className="container  mx-auto overflow-hidden aspect-12/10"> 
//                 <Image
//                     alt="Product Image"
//                     className="mt-6 cover w-fit object-cover group-hover:scale-110 transition-transform duration-700"
//                     src={image|| "/placeholder-image.jpg"}
//                     width={300}
//                     height={100}
                 
//                 />
//                 {/* <div className="absolute top-4 right-4"> */}
                   
//                 {/* </div> */}
//             </div> 
            
//             <div className="p-2 m-4 flex flex-col grow space-y-2">
//                  <div>
//                     <Chip
//                         color="primary"
//                         variant="solid"
//                         className=" bg-linear-to-r from-orange-500 to-yellow-600 items-center font-bold shadow-lg shadow-blue-800/20"
//                     >
//                         {allProducts.status}
//                     </Chip>
//                  </div>
//                 <div className="space-y-2">
//                     <Link href={`/products/${_id}`}>
//                         <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
//                             {title}
//                         </h3>
//                     </Link>
//                     <Button
//                         className=" mt-2 p-2 bg-linear-to-r from-yellow-500 to-orange-600 text-sm font-medium flex items-center gap-1">
//                     Category : <span className="text-slate-900">{category}</span>
//                     </Button>
                    
//                 </div>

//                  <span>
//                         <p className=" text-xs text-slate-500 font-bold"> Condition: {condition} </p>
//                           <p className="text-xs text-slate-500 font-bold"> Instock: {stock} </p>
//                     </span>
//                 <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
//                   <span className="flex items-center gap-1">
//                         {/* <BookOpen className="w-3.5 h-3.5" /> 24 Lessons */}
//                         <p>Description: {description}</p>
//                     </span>
                   
//                 </div>    

//                 <div className="pt-6 mt-auto border-t border-slate-100 flex justify-between items-center">
//                     <span className="text-2xl font-black text-orange-600">${price}</span>
//                     <span>  <WishlistButton productData={allProducts} />  </span>
//                 </div>
//                  <Button
                        
//                         className=" bg-linear-to-r from-yellow-300 to-orange-400 font-bold text-black text-xl rounded-xl px-6 w-full"
//                     >
//                        <Link href ={`/products/${_id}`}> Details </Link> 
                       
//                     </Button>
//             </div>
//         </div>






//         </div>

       
//     );
// };

// export default ProductCard;
