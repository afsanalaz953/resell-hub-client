
"use client";

import { Card, CardBody, Divider, Spacer } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import StatsHeader from '@/components/homePage/StatsHeader'
import StatsCard from '@/components/homePage/StatsCard'


export default function Stats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StatsHeader isVisible={isInView} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {statsData.map((stat, index) => (
            <StatsCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-xs text-base-content/40 mt-8 md:mt-12"
        >
          Updated in real-time · Data as of {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </motion.p>
      </div>
    </section>
  );
}
