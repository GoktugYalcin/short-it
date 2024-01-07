import React from "react";
import GoogleLogo from "@/components/GoogleLogo";
import { createClient } from "@/utils/supabase/client";

async function LoginButton() {
  const supabase = createClient();

  return (
    <span className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover items-center justify-center">
      Login with <GoogleLogo />
      oogle
    </span>
  );
}

export default LoginButton;
