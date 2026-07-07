import { Button, Chip } from "@heroui/react";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const ProductCard = ({allProducts}) => {
 if (!allProducts) {
        return null;
    }

    const { _id, title, category, condition, price, stock, status, description, image} = allProducts;
    return (
        <div >
 <div
            className="group flex flex-col bg-white rounded-4xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="container  mx-auto overflow-hidden aspect-12/10"> 
                <Image
                    alt="Product Image"
                    className="mt-6 cover w-fit object-cover group-hover:scale-110 transition-transform duration-700"
                    src={image|| "/placeholder-image.jpg"}
                    width={300}
                    height={100}
                 
                />
                {/* <div className="absolute top-4 right-4"> */}
                   
                {/* </div> */}
            </div> 
            
            <div className="p-2 m-4 flex flex-col grow space-y-2">
                 <div>
                    <Chip
                        color="primary"
                        variant="solid"
                        className=" bg-linear-to-r from-orange-500 to-yellow-600 items-center font-bold shadow-lg shadow-blue-800/20"
                    >
                        {allProducts.status}
                    </Chip>
                 </div>
                <div className="space-y-2">
                    <Link href={`/products/${_id}`}>
                        <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                            {title}
                        </h3>
                    </Link>
                    <Button
                        className=" mt-2 p-2 bg-linear-to-r from-yellow-500 to-orange-600 text-sm font-medium flex items-center gap-1">
                    Category : <span className="text-slate-900">{category}</span>
                    </Button>
                    
                </div>

                 <span>
                        <p className=" text-xs text-slate-500 font-bold"> Condition: {condition} </p>
                          <p className="text-xs text-slate-500 font-bold"> Instock: {stock} </p>
                    </span>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
                  <span className="flex items-center gap-1">
                        {/* <BookOpen className="w-3.5 h-3.5" /> 24 Lessons */}
                        <p>Description: {description}</p>
                    </span>
                   
                </div>    

                <div className="pt-6 mt-auto border-t border-slate-100 flex justify-between items-center">
                    <span className="text-2xl font-black text-orange-600">${price}</span>
                </div>
                 <Button
                        
                        className=" bg-linear-to-r from-yellow-300 to-orange-400 font-bold text-black text-xl rounded-xl px-6 w-full"
                    >
                       <Link href ={`/products/${_id}`}> Details </Link> 
                       
                    </Button>
            </div>
        </div>






        </div>

       
    );
};

export default ProductCard;