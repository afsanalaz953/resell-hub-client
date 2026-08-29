"use client";

import { Card,  Avatar, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import {
    FaStar,
    FaQuoteLeft,
    FaStore,
    FaChartLine,
    FaShieldAlt,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";

const testimonials = [
    {
        id: 1,
        name: "Md. Shakib",
        role: "Seller",
        quote: "Found a perfect laptop at half the market price! The seller was trustworthy and the product was exactly as described. ReSell Hub is amazing!",
        rating: 5,
        initials: "MS",
        color: "from-blue-500 to-cyan-400",
        stat: "4.9★ Avg. Rating",
    },
    {
        id: 2,
        name: "Nusrat Jahan",
        role: "Seller",
        quote: "I sold 14 products within 2 months! The platform makes it super easy to list and manage products. My old items are now earning me money.",
        rating: 5,
        initials: "NJ",
        color: "from-purple-500 to-pink-400",
        stat: "14 Products Sold",
    },
    {
        id: 3,
        name: "Karim Ahmed",
        role: "Seller",
        quote: "As a seller, the dashboard analytics help me understand my sales trends. The order management is seamless and buyers trust the platform.",
        rating: 5,
        initials: "KA",
        color: "from-orange-500 to-amber-400",
        stat: "Sales Analytics",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.6,
        },
    },
};

const quoteVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: 0.1,
        },
    },
};

const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 15,
            delay: 0.2 + i * 0.08,
        },
    }),
};

export default function SuccessStory() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/30 py-16 px-4 sm:py-24">
           
     <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className=" rounded-2xl bg-orange-500 p-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
                >
                    {[
                        { icon: FaStore, label: "Active Sellers", value: "2.5K+" },
                        { icon: FaStore, label: "Active Buyers", value: "3.5K+" },
                        { icon: BsGraphUp, label: "Products Sold", value: "12K+" },
                        { icon: FaShieldAlt, label: "Trust Score", value: "4.9★" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="flex items-center  gap-3 px-20 py-20 rounded-2xl  shadow-sm"
                        >
                            <item.icon className="text-white text-lg" />
                            <div>
                                <div className="font-bold text-3xl text-white">
                                    {item.value}
                                </div>
                                <div className="text-[10px] text-3xl text-white uppercase tracking-wider">
                                    {item.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>         
           
            <div className="max-w-7xl mt-16 mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            delay: 0.1,
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/30 backdrop-blur-sm mb-4"
                    >
                        <FaStore className="text-blue-500 text-sm" />
                        <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">
                            Community Voices
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold"
                    >
                        <span className="bg-linear-to-r from-yellow-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                            Testimonials
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2"
                    >
                        Success Stories
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-gray-500 max-w-2xl mx-auto mt-3 text-sm sm:text-base"
                    >
                        Real experiences from our community of buyers and sellers
                    </motion.p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.01,
                                transition: { type: "spring", stiffness: 400, damping: 20 },
                            }}
                            className="h-full"
                        >
                             <Card
            className="h-full border border-gray-200/60 shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-shadow duration-300 bg-white/80 backdrop-blur-sm"
            radius="xl"
        >
            {/* ----- HEADER (optional, you can omit if not needed) ----- */}
            <Card.Header className="p-0">
                {/* If you need a title/description, add them here; otherwise leave empty */}
            </Card.Header>

            {/* ----- CONTENT (main body) ----- */}
            <Card.Content className="p-6 md:p-7 flex flex-col">
                {/* Quote Icon */}
                <motion.div
                    variants={quoteVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-4 text-blue-400/60"
                >
                    <FaQuoteLeft size={28} />
                </motion.div>

                {/* Quote Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1"
                >
                    "{t.quote}"
                </motion.p>

                {/* Rating Stars */}
                <motion.div
                    className="flex items-center gap-1 mt-4"
                    initial="hidden"
                    animate="visible"
                    custom={index}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.span key={i} custom={i} variants={starVariants}>
                            <FaStar
                                className={`text-sm ${
                                    i < t.rating
                                        ? "text-yellow-400 drop-shadow-sm"
                                        : "text-gray-300"
                                }`}
                            />
                        </motion.span>
                    ))}
                    <span className="ml-2 text-xs font-medium text-gray-400">
                        {t.rating}.0
                    </span>
                </motion.div>

                {/* Divider – stays inside Content */}
                <div className="my-4 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
            </Card.Content>

            {/* ----- FOOTER (user info) ----- */}
            <Card.Footer className="px-6 pb-6 md:px-7 md:pb-7 pt-0 flex items-center gap-4">
                <motion.div
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                    <Avatar
                        name={t.initials}
                        className={`w-12 h-12 text-white font-bold bg-linear-to-br ${t.color} shadow-md shadow-blue-500/20`}
                        radius="full"
                        size="md"
                    />
                </motion.div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-800 text-sm">
                            {t.name}
                        </span>
                        <MdVerified className="text-blue-500 text-sm shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium text-blue-600">{t.role}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <Chip
                            size="sm"
                            variant="flat"
                            className="h-5 px-2 text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100/50"
                        >
                            {t.stat}
                        </Chip>
                    </div>
                </div>
            </Card.Footer>
        </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA / Stats */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-16 rounded-2xl bg-orange-500 p-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
                >
                    {[
                        { icon: FaStore, label: "Active Sellers", value: "2.5K+" },
                        { icon: BsGraphUp, label: "Products Sold", value: "12K+" },
                        { icon: FaShieldAlt, label: "Trust Score", value: "4.9★" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="flex items-center  gap-3 px-20 py-20 rounded-2xl  shadow-sm"
                        >
                            <item.icon className="text-white text-lg" />
                            <div>
                                <div className="font-bold text-3xl text-white">
                                    {item.value}
                                </div>
                                <div className="text-[10px] text-3xl text-white uppercase tracking-wider">
                                    {item.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div> */}

            </div>
        </div>
    );
}