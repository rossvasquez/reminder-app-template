import { useState } from "react"

import { addReminder } from "../../../../supabase/calendar/add-reminder"

export default function ReminderForm({setAddReminder, updateReminders, Day, Year, MonthNum, RemindersList, EmptyReminder}) {

    const [ReminderToAdd, setReminderToAdd] = useState({
        reminder: '',
        comments: '',
        completed: false
    })

    const [ShowError, setShowError] = useState(false)

    const handleReminder = (e) => {
        let tempObj = {...ReminderToAdd}
        tempObj.reminder = e.target.value
        setReminderToAdd(tempObj)
    }

    const handleComments = (e) => {
        let tempObj = {...ReminderToAdd}
        tempObj.comments = e.target.value
        setReminderToAdd(tempObj)
    }

    const formHandler = async (e) => {
        e.preventDefault()
        const date = `${MonthNum+1}/${Day}/${Year}`
        if (ReminderToAdd.reminder == '') {
            setShowError(true)
        } else {
            let tempArr = [...RemindersList]
            tempArr.push(ReminderToAdd)
            const insert = await addReminder(tempArr, date, EmptyReminder)
            if (insert.didError) {
                window.alert('An error occured, please try again. If the issue persists, contact support.')
                console.log(insert.data)
            } else {
                setAddReminder(false)
                setShowError(false)
                setReminderToAdd({
                    reminder: '',
                    comments: '',
                    completed: false
                })
                updateReminders()
            }
        }
    }

    return(
        <form onSubmit={(e) => formHandler(e)} className="flex flex-col max-w-5xl mx-auto mt-8">
            <div className="flex w-full relative items-center">
                <label htmlFor="Reminder" className="text-white font-light text-xl">Reminder</label>
                {ShowError ? <p className="text-cyan-400 absolute right-2">Please Fill Out</p> : null}
            </div>
            <input onChange={(e) => handleReminder(e)} value={ReminderToAdd.reminder} placeholder="ex. Go to Grocery Store" name="Reminder" type="text" className="mt-1 focus:outline-none text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
            <label htmlFor="Comments" className="text-white font-light text-xl mt-4">Comments (Optional)</label>
            <textarea onChange={(e) => handleComments(e)} value={ReminderToAdd.comments} placeholder="ex. Get Milk, Eggs, and Bacon" name="Comments" className="mt-1 focus:outline-none text-2xl rounded-sm h-40 font-light text-zinc-800 px-3 pt-2 resize-none" />
            <button type="submit" className="w-1/2 rounded-full mx-auto mt-6 bg-cyan-400 text-white hover:text-zinc-800 h-16 text-2xl hover:bg-opacity-[90%] active:text-neutral-300 font-light">Add to Day</button>
        </form>
    )
}