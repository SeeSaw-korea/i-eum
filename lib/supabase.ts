import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://atzyvbifvrlhwploqmpr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0enl2YmlmdnJsaHdwbG9xbXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjQzNTEsImV4cCI6MjA5MzgwMDM1MX0.6ap0rxCQXVsShJXTFb5UIKN4ykog32BLL1sBZN6vEMo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
