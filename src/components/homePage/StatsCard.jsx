"use client";

import { Card, CardBody, Divider, Spacer } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedCounter from '@/components/homePage/AnimatedCounter'

import React from 'react';

function StatsCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 260, damping: 20, delay: index * 0.12 + 0.3 },
    },
  };

  return (
    <motion.div ref={ref} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="h-full">
      <Card
        isHoverable
        className="relative h-full overflow-hidden border border-base-200/60 bg-base-100/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 dark:border-base-800/60 dark:bg-base-900/80"
        radius="lg"
      >
        <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-linear-to-br  opacity-[0.06] blur-3xl transition-opacity duration-700 group-hover:opacity-[0.12]`} />
        <CardBody className="relative z-10 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`inline-flex rounded-2xl bg-linear-to-br ${stat.color} p-3 text-white shadow-lg shadow-${stat.color.split(' ')[1]}/20`}
            >
              {stat.icon}
            </motion.div>
            <div className="hidden sm:block h-12 w-15 rounded-full bg-linear-to-b from-transparent via-base-300 to-transparent" />
          </div>
          <Spacer y={4} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.12 + 0.15 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            <span className={`bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000} delay={index * 120} />
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.12 + 0.25 }}
            className="text-sm sm:text-base font-medium text-base-content/70"
          >
            {stat.label}
          </motion.p>
          <div
            className={`absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r ${stat.color} transition-all duration-1000 ease-out ${isInView ? "w-full" : ""}`}
            style={{ transitionDelay: `${index * 120 + 400}ms` }}
          />
        </CardBody>
      </Card>
    </motion.div>
  );
}




