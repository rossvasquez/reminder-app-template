import { supabase } from "../initialize"

export const addReminder = async (reminder, date, truthy) => {

    let returnObj = {
        didError: false,
        data: ''
    }

    if (truthy) {
        const { error } = await supabase
            .from('reminders')
            .insert({ date: date, reminders: reminder })

        if (error) {
            returnObj.didError = true
            returnObj.data = error
        } else {
            returnObj.didError = false
            returnObj.data = 'success'
        }
    } else {
        const { error } = await supabase
            .from('reminders')
            .update({ reminders: reminder })
            .eq('date', date)
        
        if (error) {
            returnObj.didError = true
            returnObj.data = error
        } else {
            returnObj.didError = false
            returnObj.data = 'success'
        }
    }

    return returnObj
}