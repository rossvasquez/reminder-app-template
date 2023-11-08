
import { useContext } from "react"
import { DashboardContext } from "../dashboardContext"

import { useState } from "react"

import { addReminder } from "../../../../supabase/calendar/add-reminder"

export default function ReminderForm({ UpdateReminders, SetAddReminder, RemindersList, EmptyReminder, FormattedDate }) {
    
    const [ReminderToAdd, setReminderToAdd] = useState({
        reminder: '',
        comments: '',
        completed: false
    })

    const [ShowError, setShowError] = useState(false)

    const handleChange = (e) => {
        setReminderToAdd({
            ...ReminderToAdd,
            [e.target.name]: e.target.value
        })
    }

    const formHandler = async (e) => {
        e.preventDefault()
        if (ReminderToAdd.reminder == '') {
            setShowError(true)
        } else {
            let newReminderList = [...RemindersList]
            newReminderList.push(ReminderToAdd)
            const insert = await addReminder(newReminderList, FormattedDate, EmptyReminder)
            if (insert.didError) {
                window.alert('An error occured, please try again. If the issue persists, contact support.')
            } else {
                SetAddReminder(false)
                setShowError(false)
                setReminderToAdd({
                    reminder: '',
                    comments: '',
                    completed: false
                })
                UpdateReminders()
            }
        }
    }

    return(
        <form onSubmit={(e) => formHandler(e)} className="flex flex-col max-w-5xl mx-auto mt-8">
            <div className="flex w-full relative items-center">
                <label htmlFor="reminder" className="text-white font-light text-xl">Reminder</label>
                {ShowError ? <p className="text-cyan-400 absolute right-2">Please Fill Out</p> : null}
            </div>
            <input onChange={(e) => handleChange(e)} value={ReminderToAdd.reminder} placeholder="ex. Go to Grocery Store" name="reminder" type="text" className="mt-1 focus:outline-none text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
            <label htmlFor="comments" className="text-white font-light text-xl mt-4">Comments (Optional)</label>
            <textarea onChange={(e) => handleChange(e)} value={ReminderToAdd.comments} placeholder="ex. Get Milk, Eggs, and Bacon" name="comments" className="mt-1 focus:outline-none text-2xl rounded-sm h-40 font-light text-zinc-800 px-3 pt-2 resize-none" />
            <button type="submit" className="w-full rounded-sm mx-auto mt-6 border-2 border-cyan-400 transition-all duration-300 hover:bg-cyan-400 text-white h-16 text-2xl active:text-neutral-300 font-light">Add to Day</button>
        </form>
    )
}