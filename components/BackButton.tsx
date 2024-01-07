"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className="absolute top-10 left-0 bg-gray-300 px-3 py-2 flex items-center justify-center rounded-tr-md rounded-br-md select-none cursor-pointer"
      onClick={() => router.back()}
    >
      Back
    </div>
  );
};

export default BackButton;
