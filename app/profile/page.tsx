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
      <div className="flex w-1/2 flex-col justify-start items-center min-h-[90vh] p-20 pt-12 mt-[5vh] bg-[#292929] rounded-xl">
        <div className="text-3xl flex w-full text-slate-300 pb-12">
          <span>{user.email}</span>
        </div>
        {links?.length ? (
          <div className="w-full">
            <div className="w-full flex justify-between items-center font-bold text-xl text-[#bcbcbc]">
              <span className="w-[40%]">URL</span>
              <span className="w-[30%]">Created at</span>
              <span className="w-[30%] flex justify-center items-center">
                One-day Expire
              </span>
            </div>
            {links.map((link) => {
              return (
                <div
                  key={link.link_id}
                  className="w-full flex justify-between items-center mt-2 text-[#797979] hover:text-slate-300 transition-colors"
                >
                  <Link
                    href={link.normal_url}
                    target="_blank"
                    className="w-[40%]"
                  >
                    {link.normal_url}
                  </Link>
                  <span className="w-[30%]">
                    {new Date(link.created_at).toDateString()}
                  </span>
                  <span className="w-[30%] flex justify-center items-center">
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
