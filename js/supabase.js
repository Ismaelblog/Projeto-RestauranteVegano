
// Não precisa de importação, já que carregamos a lib no HTML
const SUPABASE_URL = 'https://igwrytownelxrjasfnzv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnd3J5dG93bmVseHJqYXNmbnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNzQ4MTEsImV4cCI6MjA2MTk1MDgxMX0.ROyDwkvk1iB-_NmRO1We4p3LOmwOXq7Ic7fmmy7RLjk';

window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

