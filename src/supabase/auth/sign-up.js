import { supabase } from '../initialize'

export const signUpUser = async (UserInfo) => {

    const addUserToDB = async () => {
        const { error } = await supabase
            .from('users')
            .insert({ first_name: UserInfo.name, email: UserInfo.email })
        
        if (error) {
            return {
                didError: true,
                data: error,
            }
        } else {
            return {
                didError: false,
                data: null,
            }
        }
    }
    
    const signUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: UserInfo.email,
            password: UserInfo.password,
          })
        
        if (error) {
            return {
                didError: true,
                data: error,
            }
        } else {
            const DB = await addUserToDB()
            return DB
        }
    }

    const startFlow = await signUp()

    return startFlow

}