
import check from '../../../static/check.png'

import { addReminder } from "../../../../supabase/calendar/add-reminder"

export default function Reminders({ UpdateReminders, EmptyReminder, RemindersList, FormattedDate }) {

    const handleCompleted = async (id, action) => {
        let tempRemindersList = [...RemindersList]

        if (action == 'select') {
            tempRemindersList[id].completed = true
        } else if (action == 'deselect') {
            tempRemindersList[id].completed = false
        }

        const insert = await addReminder(tempRemindersList, FormattedDate, EmptyReminder)
        if (insert.didError) {
            window.alert('An error occured, please try again. If the issue persists, contact support.')
        } else {
            UpdateReminders()
        }  
    }

    const removeReminder = async (id) => {
        const tempRemindersList = [...RemindersList]
        const firstHalf = tempRemindersList.slice(0,id)
        const secondHalf = tempRemindersList.slice(id+1)
        const newReminders = [...firstHalf, ...secondHalf]
        const insert = await addReminder(newReminders, FormattedDate, EmptyReminder)
        if (insert.didError) {
            window.alert('An error occured, please try again. If the issue persists, contact support.')
        } else {
            UpdateReminders()
        }

    }

    return(
        <div className="px-6 min-h-[20rem] mt-6 text-3xl font-light rounded-sm border-2 text-white border-zinc-800">
            <div className="flex flex-col">
                {RemindersList.map((item, id) =>
                    <div key={id} className="w-full flex gap-4 border-b-[.1rem] border-cyan-400 last:border-b-0 py-6">
                        <div className="w-12 md:w-16 flex justify-center items-start pt-1">
                            <div onClick={RemindersList[id].completed ? () => handleCompleted(id, 'deselect') : () => handleCompleted(id, 'select')} className={`flex justify-center items-center h-8 w-8 mt-3 rounded-[100%] hover:cursor-pointer ${RemindersList[id].completed ? 'bg-cyan-400' : 'border-2 border-white hover:bg-white hover:bg-opacity-40'}`}>
                                <img src={check} className={`${RemindersList[id].completed ? null : 'hidden'} scale-[60%] mt-[1px]`} />
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <p className="font-semibold">{item.reminder}</p>
                            <p className="text-xl text-neutral-200">{item.comments}</p>
                            <p onClick={() => removeReminder(id)} className="text-lg underline text-neutral-300 hover:cursor-pointer hover:opacity-80 active:text-cyan-400">Remove</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}