import React from "react";
import { Res } from "@/types";
import ResultButton from "@/components/Buttons/ResultButton";
import ErrorComponent from "@/components/Sections/ErrorComponent";
import { Cross2Icon, CrossCircledIcon } from "@radix-ui/react-icons";
import { AnimatePresence } from "framer-motion";
import { FieldErrors } from "react-hook-form";

const ResultSection: React.FC<{
  response: Res | { error: number };
  errors: FieldErrors;
}> = ({ response, errors }) => (
  <AnimatePresence>
    {(response as Res)?.hashed_url && <ResultButton data={response as Res} />}
    {!!errors.url && (
      <ErrorComponent
        message={
          <>
            <Cross2Icon width={30} height={30} />
            Please give a proper url!
          </>
        }
      />
    )}
    {response?.error && (
      <ErrorComponent
        message={
          <>
            <CrossCircledIcon height={30} width={30} />
            An error occured.
          </>
        }
      />
    )}
  </AnimatePresence>
);

export default ResultSection;
