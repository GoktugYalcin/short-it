import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/utils/supabase/server";
import { ResContent, StreamContent } from "@/types";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const postData = await req.json();
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const request = await supabase
    .from("links")
    .insert([
      {
        hashed_url: randomUUID().split("-")[0],
        normal_url:
          postData.url.includes("https://") || postData.url.includes("http://")
            ? postData.url
            : `https://${postData.url}`,
        is_expirable: postData.expire,
        mail: user?.email || "",
      },
    ])
    .select();

  const error = request.error;
  const data: any & StreamContent = request.data ? request.data[0] : {};

  const response: ResContent = {};

  error
    ? (response.error = {
        ...error,
        hashed_url: "",
      })
    : (response.data = {
        is_expirable: data.is_expirable,
        hashed_url: data.hashed_url,
      });

  return NextResponse.json({ status: "ok", response });
}
