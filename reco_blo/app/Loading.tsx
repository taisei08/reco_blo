"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      className="w-20 h-20 bg-blue-500 rounded-xl"
      animate={{
        scale: [1],
        rotate: [0, 0, 360, 360],
        transition: {
          duration: 1,
          repeat: Infinity,
        },
      }}
    />
  );
}
