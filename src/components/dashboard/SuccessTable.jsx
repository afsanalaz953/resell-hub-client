"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight, Leaf } from "lucide-react";

const SuccessTable = ({ customerEmail, metadata }) => {
  // Provide fallback values to prevent errors
  const title = metadata?.title || 'Product';
  const price = metadata?.price || '—';
  const totalPrice = metadata?.totalPrice || '—';
  const quantity = metadata?.quantity || '—';

  return (
    <div className="py-10 px-4">
      <motion.div
        className="container mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ---------- Confirmation Message ---------- */}
        <div className="mb-8 p-4 bg-green-50/80 backdrop-blur-sm rounded-2xl border border-green-200/50 text-green-800 text-sm md:text-base shadow-sm">
          <p className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>
              We appreciate your business! A confirmation email will be sent to{" "}
              <strong className="text-green-700">{customerEmail}</strong>.
              If you have any questions, please email{" "}
              <a
                href="mailto:orders@example.com"
                className="text-green-700 underline hover:text-green-900 transition"
              >
                orders@example.com
              </a>.
            </span>
          </p>
        </div>

        {/* ---------- Animated Card ---------- */}
        <motion.div
          className="card w-full max-w-md mx-auto bg-linear-to-br from-emerald-400 via-green-500 to-teal-600 shadow-2xl shadow-green-500/30 overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
        >
          {/* Shimmer Overlay */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -skew-x-12"
            initial={{ x: "-200%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "linear",
            }}
          />

          <div className="card-body relative z-10 text-white">
            {/* Decorative Icon */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1"
            >
              <Leaf className="w-6 h-6" />
            </motion.div>

            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              Recently Purchased
            </h1>

            <h2 className="card-title text-2xl font-semibold text-emerald-100 drop-shadow">
              {title}
            </h2>

            <div className="space-y-1 mt-1 text-green-50/95">
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between"
              >
                <span>Price</span>
                <span className="font-mono font-semibold">{price}</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between border-t border-white/10 pt-1"
              >
                <span>Quantity</span>
                <span className="font-mono font-semibold">{quantity}</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between border-t border-white/10 pt-1 text-lg font-bold"
              >
                <span>Total Price</span>
                <span className="text-emerald-200">{totalPrice}</span>
              </motion.p>
            </div>

            {/* Action Button */}
            <div className="card-actions justify-end mt-4">
              <Link href={`/products/${metadata?.productId || '#'}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-white/20 hover:bg-white/30 border-none text-white rounded-full px-6 gap-2 backdrop-blur-sm shadow-lg"
                >
                  View Details
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Decorative Blobs */}
          <motion.div
            className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-emerald-300/20 blur-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-teal-300/20 blur-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessTable;






