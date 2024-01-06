import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { ResContent, StreamContent } from "@/types";

export async function POST(req: NextRequest) {
  const postData = await req.json();
  const supabase = createClient();

  const request = await supabase
    .from("links")
    .insert([
      {
        hashed_url: randomUUID().split("-")[0],
        normal_url: postData.url,
        is_expirable: postData.expire,
      },
    ])
    .select();

  const error = request.error;
  const data: any & StreamContent = request.data ? request.data[0] : {};

  const response: ResContent = {};

  error
    ? (response.error = error)
    : (response.data = {
        is_expirable: data.is_expirable,
        hashed_url: data.hashed_url,
      });

  return NextResponse.json({ status: "ok", response });
}
