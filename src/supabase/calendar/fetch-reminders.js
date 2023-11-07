import { supabase } from '../initialize'

export const fetchReminders = async (date) => {
    const { data, error } = await supabase
        .from('reminders')
        .select('reminders')
        .eq('date', date)
    
    if (error) {
        return {
            test: false,
            data: error
        }
    } else {
        return {
            test: true,
            data: data
        }
    }
}