"use client"

import React from 'react';
import Image from "next/image"
import { Button, Card, Chip} from "@heroui/react";
import { motion } from "framer-motion";
import { ShoppingCart, Store, TrendingUp, Truck, ShieldCheck, Star, Eye, Plus, ArrowRight } from "lucide-react";

const Banner = () => {
    return (
      
<main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#161E32]">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" relative overflow-hidden text-center py-12 grid grid-cols-2"
        >
 <motion.div>
     <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-800 leading-tight"
          >
            Bangladesh Trusted<br />
            <span className="bg-linear-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">Marketplace</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-lg sm:text-xl text-white max-w-2xl mx-auto"
          >
            Buy & sell pre-owned products safely. 
            <br />Join thousands of buyers and sellers on
            <br /> Bangladesh fastest growing second-hand marketplace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              color="primary"
              className="bg-linear-to-r from-yellow-500 to-orange-600 font-semibold shadow-lg shadow-emerald-500/30 px-8"
              startContent={<ShoppingCart size={20} />}
            >
              Browse Products
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-2 text-white border-slate-200 font-semibold px-8"
              startContent={<Plus size={20} />}
            >
              Start Selling
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
          >
            <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-orange-500" /> Safe & Secure</span>
            <span className="flex items-center gap-2"><Truck className="w-5 h-5 text-orange-500" /> Fast Delivery</span>
            <span className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-orange-500" /> Growing Community</span>
            <span className="flex items-center gap-2"><Star className="w-5 h-5 text-orange-500" /> Trusted Sellers</span>
          </motion.div>

        </motion.div>

          {/* 1 image */}
        <motion.div className='container relative h-[400px] overflow-hidden rounded-[2rem]'>
              <Image
                src="https://static.vecteezy.com/system/resources/thumbnails/011/871/820/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
                alt="Learning"
               width={500}
               height={500}
               
                className=" w-full h-full object-cover rounded-[2rem] transform transition duration-700 group-hover:scale-105"
             /> 

        </motion.div>


        </motion.section>


      </div>
    </main>
  );
}
        
export default Banner;