import { useMemo } from 'react'

import getSupabaseBrowserClient from '@/lib/supabase/client'

const useSupabaseBrowserClient = () => {
	return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabaseBrowserClient
