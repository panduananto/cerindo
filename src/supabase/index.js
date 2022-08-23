import { createClient } from '@supabase/supabase-js';

const {
	NODE_ENV,
	REACT_APP_SUPABASE_URL_LOCAL,
	REACT_APP_SUPABASE_URL_PRODUCTION,
	REACT_APP_SUPABASE_PUBLIC_KEY_LOCAL,
	REACT_APP_SUPABASE_PUBLIC_KEY_PRODUCTION,
} = process.env;

const supabaseUrl =
	NODE_ENV === 'development' ? REACT_APP_SUPABASE_URL_LOCAL : REACT_APP_SUPABASE_URL_PRODUCTION;
const supabaseAnonKey =
	NODE_ENV === 'development'
		? REACT_APP_SUPABASE_PUBLIC_KEY_LOCAL
		: REACT_APP_SUPABASE_PUBLIC_KEY_PRODUCTION;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
