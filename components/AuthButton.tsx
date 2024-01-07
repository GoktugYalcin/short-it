import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GoogleLogo from "@/components/GoogleLogo";
import React from "react";

export default async function AuthButton() {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4 ">
      <span className="text-[#878787]">
        Hey,{" "}
        <Link href="/profile" className="rounded-md no-underline">
          <span className="transition-colors hover:text-slate-300 cursor-pointer">
            {user.email}
          </span>
          !
        </Link>
      </span>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href={"/login"}
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover items-center justify-center"
    >
      Login
    </Link>
  );
}
