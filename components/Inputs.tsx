"use client";

import React, { useState } from "react";

import { FieldErrors, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import axios from "axios";
import classNames from "classnames";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

import CheckBox from "@/components/checkbox";
import ResultSection from "@/components/ResultSection";

import { checkPattern } from "@/utils/UrlPattern";
import { Res } from "@/types";

const Inputs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Res | { error: number }>({
    hashed_url: "",
    is_expirable: false,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const buttonStyles = classNames(
    "cursor-pointer active:translate-y-0.5 transition-all",
    {
      "animate-bounce pointer-events-none": isLoading,
    },
  );

  const submitHandler = (form: FieldValues) => {
    setIsLoading(true);
    setResponse({
      hashed_url: "",
      is_expirable: false,
    });

    axios({
      method: "POST",
      url: "/link",
      data: form,
    })
      .then((res) => {
        setResponse(res.data.response.data);
      })
      .catch(() => setResponse({ error: 1 }))
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  };

  return (
    <form
      className="flex justify-center items-center lg:mt-32 sm:mt-16 w-full flex-col lg:gap-10 sm:gap-8"
      onSubmit={handleSubmit(submitHandler, (err: FieldErrors) =>
        console.error(err),
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: -1 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-16 lg:w-1/3 justify-between items-center py-1 px-3 gap-3 bg-white rounded-md lg:text-3xl sm:w-[90%] sm:text-xl"
      >
        <input
          {...register("url", {
            required: true,
            validate: (field) => {
              const res = checkPattern(field);
              return res;
            },
          })}
          className="h-full w-full outline-0 text-slate-900"
        />
        <button className="p-0 outline-0 border-0" type="submit">
          <ArrowRightIcon
            width={30}
            height={30}
            className={buttonStyles}
            color={"#04090B"}
          />
        </button>
      </motion.span>
      <motion.div
        initial={{ opacity: 0, y: -3 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center w-full"
      >
        <CheckBox register={register} />
      </motion.div>
      <ResultSection response={response} errors={errors} />
    </form>
  );
};

export default Inputs;
