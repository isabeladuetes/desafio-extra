import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hhdjxdstfgqpftekveha.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZGp4ZHN0ZmdxcGZ0ZWt2ZWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MTExMTcsImV4cCI6MjA5NzA4NzExN30.tJ8WVik1N6MgJUKkDF5qaSx0Q2LjK-H2XnpLd-vNz_c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
