import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { VercelLogoIcon } from "@radix-ui/react-icons";
import Inputs from "@/components/Inputs";
import Headliners from "@/components/Headliners";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  if (!isSupabaseConnected) {
    return <span>loading</span>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 bg-[#27272a] h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <span className="font-bold text-xl text-transparent bg-gradient-to-br from-teal-500 to-blue-500 bg-clip-text select-none">
            Short-it
          </span>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center w-full">
        <Headliners />
        <Inputs />
      </div>
      <footer className="fixed bottom-3 text-gray-400 w-3/4 pt-4 border-t-gray-700 border-t-2 flex justify-center items-center text-sm gap-2">
        {new Date().getFullYear()} - A. Göktuğ Yalçın{" "}
        <VercelLogoIcon color={"#fafafa"} />
      </footer>
    </div>
  );
}
