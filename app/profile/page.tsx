import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import BackButton from "@/components/BackButton";

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) notFound();

  let { data: links, error } = await supabase
    .from("links")
    .select("*")
    .eq("mail", user?.email);

  return (
    <>
      <BackButton />
      <div className="flex flex-col justify-start items-center bg-[#292929] rounded-xl lg:min-h-[90vh] sm:min-h-[100vh] lg:py-12 lg:mt-[5vh] sm:py-20 sm:mt-0 sm:px-4 lg:w-1/2 sm:w-full">
        <div className="text-3xl flex w-full text-slate-300 pb-12 lg:pl-3">
          <span>{user.email}</span>
        </div>
        {links?.length ? (
          <div className="w-full">
            <div className="w-full flex justify-between items-center font-bold lg:text-xl text-[#bcbcbc] sm:text-[15px]">
              <span className="w-[30%] text-center">URL</span>
              <span className="w-[30%] text-center">Created at</span>
              <span className="w-[30%] text-center">One-day Expire</span>
            </div>
            {links.map((link) => {
              return (
                <div
                  key={link.link_id}
                  className="w-full flex justify-between items-center mt-4 text-[#797979] hover:text-slate-300 transition-colors"
                >
                  <Link
                    href={link.normal_url}
                    target="_blank"
                    className="w-[30%] overflow-ellipsis overflow-hidden text-center"
                  >
                    {link.normal_url}
                  </Link>
                  <span className="w-[30%] overflow-ellipsis overflow-hidden text-center">
                    {new Date(link.created_at).toDateString()}
                  </span>
                  <span className="w-[30%] flex justify-center items-center text-center">
                    {link.is_expirable ? (
                      <CheckIcon color="green" />
                    ) : (
                      <Cross2Icon color="red" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
