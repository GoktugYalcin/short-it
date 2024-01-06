import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { VercelLogoIcon } from "@radix-ui/react-icons";
import Inputs from "@/components/Inputs";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
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
          <span className="font-bold text-xl text-[#a1a1aa] select-none">
            Short-it
          </span>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col w-full justify-center items-center text-4xl">
          <h1 className="bg-clip-text bg-gradient-to-r from-[#78716c] to-[#d6d3d1] text-transparent">
            Shorten your links and add if you want to expiry!
          </h1>
          <h1 className="bg-clip-text bg-gradient-to-r from-[#57534e] to-[#a8a29e] text-transparent">
            Also shortlist of your shortened links is on development!
          </h1>
        </div>
        <Inputs />
      </div>
      <footer className="fixed bottom-3 text-gray-400 w-3/4 pt-4 border-t-gray-700 border-t-2 flex justify-center items-center text-sm gap-2">
        {new Date().getFullYear()} - A. Göktuğ Yalçın{" "}
        <VercelLogoIcon color={"#fafafa"} />
      </footer>
    </div>
  );

  /*return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  )*/
}
