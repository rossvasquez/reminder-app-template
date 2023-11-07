import { supabase } from "../initialize"

export const signUserIn = async (credentials) => {
    const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })
    if (error) {
        return {
            didError: true,
            data: error
        }
    } else {
        return {
            didError: false,
            data: null
        }
    }
}