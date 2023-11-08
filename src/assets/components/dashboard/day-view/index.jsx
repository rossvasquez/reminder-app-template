
import { useState, useEffect, useContext } from "react"
import { DashboardContext } from "../dashboardContext"

import { fetchReminders } from "../../../../supabase/calendar/fetch-reminders"

import DayHeader from "./day-header"
import Reminders from "./reminders"
import ReminderForm from "./reminder-form"

export default function DayView() {

    const { SelectedDate, Gregorian } = useContext(DashboardContext)

    const [MonthName]  = useState(Gregorian[SelectedDate.month].monthName)

    const [FormattedDate] = useState(`${(SelectedDate.month)+1}/${SelectedDate.day}/${SelectedDate.year}`)

    const [RemindersList, setRemindersList] = useState([])

    const [AddReminder, setAddReminder] = useState(false)

    const [EmptyReminder, setEmptyReminder] = useState(true)

    const updateReminders = () => {
        const fetchThem = async () => {
            const reminderReturn = await fetchReminders(FormattedDate)
            if (reminderReturn.test) {
                if (reminderReturn.data.length === 0) {
                    setEmptyReminder(true)
                } else {
                    setEmptyReminder(false)
                    setRemindersList(reminderReturn.data[0].reminders)
                }
            } else {
                window.alert(`Unable to get reminders for ${FormattedDate}, please reload. If the issue persists, contact support.`)
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
    <div onClick={() => setAddReminder(true)} className="mt-4 w-full h-16 rounded-sm border-2 border-cyan-400 hover:bg-cyan-400 transition-all duration-300 mx-auto flex justify-center items-center text-white text-2xl pb-1 font-semibold hover:cursor-pointer hover:bg-cyan-400">+</div>

    return(
        <>
        <DayHeader MonthName={MonthName} />
        {RemindersList.length === 0 ? <NoReminders /> : <Reminders UpdateReminders={updateReminders} EmptyReminder={EmptyReminder} RemindersList={RemindersList} FormattedDate={FormattedDate} />}
        {AddReminder ? <ReminderForm UpdateReminders={updateReminders} SetAddReminder={setAddReminder} RemindersList={RemindersList} EmptyReminder={EmptyReminder} FormattedDate={FormattedDate} /> : <AddReminderBtn />}
        </>
    )
}