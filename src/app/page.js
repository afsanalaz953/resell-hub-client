import Image from "next/image";
// import Navbar from "@/components/shared/Navbar"

import LatestProducts from '@/components/homePage/LatestProducts'
// import Tips from "@/components/homePage/Tips"
 import Banner from "@/components/homePage/Banner"
import Categories from "@/components/homePage/Categories"
import SuccessStory from '@/components/homePage/SuccessStory'



export default function Home() {
  return (
    <div className="">
   
     <Banner />
     <Categories />
     <LatestProducts />
     <SuccessStory />

    {/* //  <FeaturedTutors />
    //  <Tips />
    //  <Stats />  */}
    </div>
  );
}
