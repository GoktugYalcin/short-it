import { createClient } from "@/utils/supabase/client";
import { notFound, redirect } from "next/navigation";
import { StreamContent } from "@/types";

export async function GET(request: Request) {
  const supabase = createClient();
  const hashed = request.url.split("/h/")[1];

  if (!hashed) {
    return notFound();
  }

  let { data: links, error } = await supabase
    .from("links")
    .select("*")
    .eq("hashed_url", hashed);

  if (links?.length) {
    const item = links[0] as StreamContent;
    redirect(`https://${item.normal_url}`);
  } else {
    return notFound();
  }
}
