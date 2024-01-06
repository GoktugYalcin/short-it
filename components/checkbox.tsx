"use client";

import React, { ChangeEvent } from "react";
import { UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";

const CheckBox: React.FC<{ register: UseFormRegister<FieldValues> }> = ({
  register,
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="content">
        <label className="checkBox">
          <input {...register("expire")} id="ch1" type="checkbox" />
          <div className="transition"></div>
        </label>
      </div>
      <span className="text-gray-400">Is expirable on day end?</span>
    </div>
  );
};

export default CheckBox;
