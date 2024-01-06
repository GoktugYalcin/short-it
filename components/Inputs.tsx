"use client";

import React, { useState } from "react";

import { FieldErrors, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import axios from "axios";
import classNames from "classnames";
import { ArrowRightIcon } from "@radix-ui/react-icons";

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
  } = useForm();

  const buttonStyles = classNames(
    "cursor-pointer active:translate-y-0.5 transition-all",
    {
      "animate-bounce pointer-events-none": isLoading,
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
        reset({
          url: "",
          expire: false,
        });
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
      </span>
      <div className="flex justify-center items-center w-full">
        <CheckBox register={register} />
      </div>
      <ResultSection response={response} errors={errors} />
    </form>
  );
};

export default Inputs;
