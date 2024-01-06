"use client";

import React, { useState } from "react";
import {
  ArrowRightIcon,
  CopyIcon,
  Cross2Icon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import CheckBox from "@/components/checkbox";
import { checkPattern } from "@/utils/UrlPattern";
import { FieldErrors, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import classNames from "classnames";
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
  } = useForm();

  const buttonStyles = classNames(
    "cursor-pointer hover:scale-125 transition-all",
    {
      "animate-bounce": isLoading,
    },
  );

  const submitHandler = (form: FieldValues) => {
    setIsLoading(true);

    axios({
      method: "POST",
      url: "/link",
      data: form,
    })
      .then((res) => {
        setResponse(res.data.response.data);
      })
      .catch((err) => setResponse({ error: 1 }))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="flex justify-center items-center mt-32 w-full flex-col gap-10"
      onSubmit={handleSubmit(submitHandler, (err: FieldErrors) =>
        console.error(err),
      )}
    >
      <span className="flex h-16 w-1/3 justify-between items-center py-1 px-3 gap-3 bg-white rounded-md text-3xl">
        <input
          {...register("url", {
            required: true,
            validate: (field) => checkPattern(field),
          })}
          className="h-full w-full outline-0"
        />
        <button className="p-0 outline-0 border-0" type="submit">
          <ArrowRightIcon width={30} height={30} className={buttonStyles} />
        </button>
      </span>
      <div className="flex justify-center items-center w-full">
        <CheckBox register={register} />
      </div>
      <AnimatePresence>
        {!!errors.url && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center gap-2 text-bold text-red-500 text-2xl transition-opacity ease-in duration-700"
          >
            <Cross2Icon width={30} height={30} />
            Please give a proper url!
          </motion.span>
        )}
        {(response as Res)?.hashed_url?.length && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center text-bold bg-slate-100 rounded p-4 px-6 gap-4 text-2xl transition-opacity ease-in duration-700"
          >
            <input
              value={`short.gokyalc.in/${(response as Res).hashed_url}`}
              readOnly={true}
              className={"bg-slate-100 border-r-2 pr-2 border-r-slate-300"}
            />
            <CopyIcon />
          </motion.span>
        )}
        {response.error && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center text-bold rounded p-4 px-6 gap-4 text-2xl text-red-500 transition-opacity ease-in duration-700"
          >
            <CrossCircledIcon height={30} width={30} />
            An error occured.
          </motion.span>
        )}
      </AnimatePresence>
    </form>
  );
};

export default Inputs;
