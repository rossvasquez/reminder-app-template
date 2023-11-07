
import { useState, useEffect } from "react"

import { fetchReminders } from "../../../../supabase/calendar/fetch-reminders"

import DayHeader from "./day-header"
import Reminders from "./reminders"
import ReminderForm from "./reminder-form"

import arrow from '../../../static/arrow.png'

export default function DayView({Month, MonthNum, Day, Year, Back}) {

    const [RemindersList, setRemindersList] = useState([])

    const [AddReminder, setAddReminder] = useState(false)

    const [EmptyReminder, setEmptyReminder] = useState(true)

    const updateReminders = () => {
        const date = `${MonthNum+1}/${Day}/${Year}`
        const fetchThem = async () => {
            const reminderReturn = await fetchReminders(date)
            if (reminderReturn.test) {
                if (reminderReturn.data.length === 0) {
                    setEmptyReminder(true)
                } else {
                    setEmptyReminder(false)
                    setRemindersList(reminderReturn.data[0].reminders)
                }
            } else {
                window.alert(`Unable to get reminders for ${date}, please reload. If the issue persists, contact support.`)
            }
        }
        fetchThem()
    }

    useEffect(() => {
        updateReminders()
    }, [])

    const NoReminders = () =>
    <div className="flex justify-center items-center px-2 min-h-[20rem] mt-6 text-3xl font-light rounded-lg border-2 text-white border-zinc-800">
        There's nothing here 😞
    </div>

    const AddReminderBtn = () =>
    <div onClick={() => setAddReminder(true)} className="mt-4 w-1/2 h-16 rounded-full border-2 border-cyan-400 mx-auto flex justify-center items-center text-white text-2xl pb-1 font-semibold hover:cursor-pointer hover:bg-cyan-400">+</div>

    return(
        <>
        <DayHeader Day={Day} Month={Month} Back={Back} Arrow={arrow} />
        {RemindersList.length === 0 ? <NoReminders /> : <Reminders updateReminders={updateReminders} EmptyReminder={EmptyReminder} RemindersList={RemindersList} MonthNum={MonthNum} Day={Day} Year={Year} />}
        {AddReminder ? <ReminderForm setAddReminder={setAddReminder} updateReminders={updateReminders} Day={Day} Year={Year} MonthNum={MonthNum} RemindersList={RemindersList} EmptyReminder={EmptyReminder} /> : <AddReminderBtn />}
        </>
    )
}