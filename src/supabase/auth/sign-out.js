import { supabase } from "../initialize"

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
        window.alert('Error signing out, please try again. If error persists contact support.')
        return false
    } else {
        return true
    }
}