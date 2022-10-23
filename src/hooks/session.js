import { useEffect } from 'react';
import { useSupabaseClient, useUser, useSessionContext } from '@supabase/auth-helpers-react';
export * from '@supabase/auth-helpers-react';

export function useIsSessionLoading() {
  const context = useSessionContext()
  return context.isLoading
}

export function useSignout ({ navigate }) {
  const user = useUser()
  const supabase = useSupabaseClient()

  useEffect(()=> {
    async function signout() {
      if (user) {
        await supabase.auth.signOut()
      }
      navigate('/')
    }
    signout()
  }, [user])
}