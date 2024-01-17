import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { StreamContent } from "@/types";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  const hashed = request.url.split("/h/")[1];

  if (!hashed) {
    return notFound();
  }

  let { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("hashed_url", hashed);

  if (links?.length) {
    const item = links[0] as StreamContent;
    // Check if the URL starts with http:// or https://, if not, prepend https://\n    const urlWithSchema = /^https?:\/\/i.test(item.normal_url) ? item.normal_url : `https://${item.normal_url}`;\n    redirect(urlWithSchema);
  } else {
    return notFound();
  }
}
