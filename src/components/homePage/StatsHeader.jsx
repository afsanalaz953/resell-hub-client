"use client";

import { Card, CardBody, Divider, Spacer } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";



function StatsHeader({ isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20"
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        Platform Growth
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        Trusted by
        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"> Thousands</span>
      </h2>
      <p className="mt-4 text-base-content/60 text-sm md:text-base max-w-2xl mx-auto">
        Our marketplace is growing every day. Here is what we have achieved together with our amazing community.
      </p>
      <Divider className="mt-6 max-w-xs mx-auto opacity-30" />
    </motion.div>
  );
}