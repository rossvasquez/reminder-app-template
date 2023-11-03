import { supabase } from "../initialize"

export const signUserIn = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })
    if (error) {
        console.log(error)
        return false
    } else {
        return true
    }
}