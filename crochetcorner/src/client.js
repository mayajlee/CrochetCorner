import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cgdraxzfzcjplzgtwgwd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZHJheHpmemNqcGx6Z3R3Z3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MTIxNTcsImV4cCI6MjAyOTQ4ODE1N30.yZG6mkGsvWRKn2dmoNkxciQrd2GYNy9R7jT015es9LM'
export const supabase = createClient(supabaseUrl, supabaseKey)