import React from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const ErrorComponent: React.FC<{
  message: React.ReactElement;
  color: string;
}> = ({ message, color }) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 100 }}
    exit={{ opacity: 0 }}
    className={`flex justify-center items-center text-bold rounded p-4 px-6 gap-4 text-2xl text-${color}-500 transition-opacity ease-in duration-700`}
  >
    {message}
  </motion.span>
);

export default ErrorComponent;
