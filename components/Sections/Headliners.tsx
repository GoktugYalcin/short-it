"use client";

import React from "react";
import { motion } from "framer-motion";

const Headliners = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center lg:text-4xl sm:text-2xl sm:px-5 sm:gap-2">
      <motion.h1
        initial={{ opacity: 0, y: -1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.07 }}
        className="bg-clip-text bg-gradient-to-r from-[#78716c] to-[#d6d3d1] text-transparent"
      >
        Shorten your links and add if you want to expiry!
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: -1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.01, duration: 0.07 }}
        className="bg-clip-text bg-gradient-to-r from-[#57534e] to-[#a8a29e] text-transparent"
      >
        Also shortlist of your shortened links is on development!
      </motion.h1>
    </div>
  );
};

export default Headliners;
