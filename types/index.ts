import { PostgrestError } from "@supabase/supabase-js";

export type Res = {
  hashed_url: string;
  is_expirable: boolean;
  error?: number;
};

export type ResContent = {
  error?: PostgrestError & { hashed_url: string };
  data?: Res;
};

export type StreamContent = {
  created_at: string;
  hashed_url: string;
  is_expirable: boolean;
  link_id: string;
  normal_url: string;
};
