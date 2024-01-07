import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const { error } = await supabase
    .from("links")
    .delete()
    .lt("created_at", oneDayAgo.toISOString())
    .eq("is_expirable", true);

  const status = error ? 500 : 200;
  const message = error ? "An error has occured" : "Success!";

  return NextResponse.json({ status, message: message });
}
