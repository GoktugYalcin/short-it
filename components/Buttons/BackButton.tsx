"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className="absolute left-0 bg-gray-300 px-3 py-2 flex items-center justify-center rounded-tr-md rounded-br-md select-none cursor-pointer lg:fixed sm:top-5 lg:top-10"
      onClick={() => router.back()}
    >
      Back
    </div>
  );
};

export default BackButton;
