
import { addReminder } from "../../../../supabase/calendar/add-reminder"

export default function Reminders({updateReminders, EmptyReminder, RemindersList, MonthNum, Day, Year}) {

    const handleCompleted = async (id, action) => {
        let tempArr = [...RemindersList]
        const date = `${MonthNum+1}/${Day}/${Year}`

        if (action == 'select') {
            tempArr[id].completed = true
        } else if (action == 'deselect') {
            tempArr[id].completed = false
        }

        const insert = await addReminder(tempArr, date, EmptyReminder)
        if (insert.didError) {
            window.alert('An error occured, please try again. If the issue persists, contact support.')
            console.log(insert.data)
        } else {
            updateReminders()
        }  
    }

    const removeReminder = async (id) => {
        const date = `${MonthNum+1}/${Day}/${Year}`
        const tempArr = [...RemindersList]
        const firstHalf = tempArr.slice(0,id)
        const secondHalf = tempArr.slice(id+1)
        const newReminders = [...firstHalf, ...secondHalf]
        const insert = await addReminder(newReminders, date, EmptyReminder)
        if (insert.didError) {
            window.alert('An error occured, please try again. If the issue persists, contact support.')
        } else {
            updateReminders()
        }

    }

    return(
        <div className="px-6 min-h-[20rem] mt-6 text-3xl font-light rounded-lg border-2 text-white border-zinc-800">
            <div className="flex flex-col">
                {RemindersList.map((item, id) =>
                    <div key={id} className="w-full flex gap-4 border-b-[.1rem] border-cyan-400 last:border-b-0 py-6">
                        <div className="w-1/12 flex justify-center items-start pt-1">
                            <div onClick={RemindersList[id].completed ? () => handleCompleted(id, 'deselect') : () => handleCompleted(id, 'select')} className={`h-4 md:h-8 w-4 md:w-8 mt-3 rounded-[100%] hover:cursor-pointer ${RemindersList[id].completed ? 'bg-cyan-400' : 'border-2 border-white hover:bg-white hover:bg-opacity-40'}`} />
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