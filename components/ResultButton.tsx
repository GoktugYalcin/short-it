import React from "react";
import { Res } from "@/types";
import { CopyIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const ResultButton: React.FC<{ data: Res }> = ({ data }) =>
  data.hashed_url && (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center text-bold bg-slate-100 rounded p-4 px-6 gap-4 text-2xl transition-opacity ease-in duration-700"
    >
      <input
        value={`short.gokyalc.in/h/${(data as Res).hashed_url}`}
        readOnly={true}
        className={
          "bg-slate-100 border-r-2 pr-2 border-r-slate-300 text-slate-900"
        }
      />
      <CopyIcon color={"#04090B"} />
    </motion.span>
  );

export default ResultButton;
