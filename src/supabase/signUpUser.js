import { supabase } from './initialize'

export const signUpUser = async (UserInfo) => {

    console.log(UserInfo)

    const addUserToDB = async () => {
        const { error } = await supabase
            .from('users')
            .insert({ first_name: UserInfo.name, email: UserInfo.email })
        
        if (error) {
            console.log(error)
            return false
        } else {
            return true
        }
    }
    
    const signUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: UserInfo.email,
            password: UserInfo.password,
          })
        
        if (error) {
            console.log(error)
            return false
        } else {
            const DB = await addUserToDB()
            return DB
        }
    }

    const startFlow = await signUp()

    return startFlow

}