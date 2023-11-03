import { supabase } from '../initialize'

export const getName = async () => {
    const { data, error } = await supabase
        .from('users')
        .select('first_name')
    
    if (error) {
        window.alert('Error getting User Profile, please try again.')
        console.log(error)
        return 'Unknown Name'
    } else {
        return data[0].first_name
    }
}