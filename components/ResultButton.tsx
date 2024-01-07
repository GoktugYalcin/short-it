"use client";

import React from "react";
import { Res } from "@/types";
import { CopyIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const ResultButton: React.FC<{ data: Res }> = ({ data }) =>
  data?.hashed_url && (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      className="flex justify-between items-center text-bold bg-slate-100 rounded p-4 lg:px-4 sm:px-3 gap-4 text-xl transition-opacity ease-in duration-700 lg:w-2/6 sm:w-10/12"
    >
      <input
        value={`short.gokyalc.in/h/${(data as Res).hashed_url}`}
        readOnly={true}
        className={"bg-slate-100 pr-2 text-slate-900 w-full"}
      />
      <CopyIcon
        color={"#04090B"}
        height={25}
        width={25}
        onClick={() =>
          navigator.clipboard.writeText(
            `https://short.gokyalc.in/h/${data?.hashed_url}`,
          )
        }
        className="active:translate-y-0.5 active:text-gray-300 cursor-pointer transition-all"
      />
    </motion.span>
  );

export default ResultButton;
