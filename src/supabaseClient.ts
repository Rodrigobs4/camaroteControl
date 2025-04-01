// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cvagxxiofiuctyxrtstg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2YWd4eGlvZml1Y3R5eHJ0c3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMTI1NjMsImV4cCI6MjA1ODg4ODU2M30.CJLU5adpAAJxsz-eqLR68mV2E4Heim2B8rQ78hzmCAY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
